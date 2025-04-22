package web.labs.work.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import web.labs.work.dto.TeamDto;
import web.labs.work.dto.UserDto;
import web.labs.work.exeption.ResourceNotFoundException;
import web.labs.work.model.User;
import web.labs.work.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ModelMapper mapper;

    public UserDto getUserById(Long id) {
        User model = userRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("User not found"));
        UserDto userDto = mapper.map(model, UserDto.class);
        userDto.setPassword(null);
        return userDto;
    }

    public UserDto getUserByUsername(String username) {
        User user = userRepository.findByUserName(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        UserDto userDto = mapper.map(user, UserDto.class);
        userDto.setPassword(null);
        return userDto;
    }

    public List<UserDto> searchUsers(String search) {
        if (search == null || search.isEmpty()) {
            throw new IllegalStateException("Search string cannot be null or empty");
        }
        List<User> users = userRepository.searchUsers(search);
        return users.stream().map(user -> {
            user.setPassword(null);
            return mapper.map(user, UserDto.class);
        }).toList();
    }

    public List<UserDto> getUsersByProjectId(Long projectId) {
        List<User> users = userRepository.findUsersByProjectId(projectId);
        return users.stream().map(user -> {
            user.setPassword(null);
            return mapper.map(user, UserDto.class);
        }).toList();
    }

    public UserDto updateUser(Long id, UserDto dto) {
        User model = userRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("User not found"));
        model.setUserName(dto.getUsername());
        model.setEmail(dto.getEmail());
        model = userRepository.save(model);
        UserDto updatedDto = mapper.map(model, UserDto.class);
        updatedDto.setPassword(null);
        return updatedDto;
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public boolean toggleEnabledUser(Long id) {
        User model = userRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("User not found"));
        model.setEnabled(!model.isEnabled());
        userRepository.save(model);
        return model.isEnabled();
    }

    public List<TeamDto> getUserTeams(Long userId) {
        User user = userRepository.findById(userId).
                orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return user.getTeams().stream().map(team -> mapper.map(team, TeamDto.class)).toList();
    }

}
