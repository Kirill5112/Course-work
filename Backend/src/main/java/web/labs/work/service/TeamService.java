package web.labs.work.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import web.labs.work.dto.TeamDto;
import web.labs.work.dto.UserDto;
import web.labs.work.exeption.ResourceNotFoundException;
import web.labs.work.model.Project;
import web.labs.work.model.Team;
import web.labs.work.model.User;
import web.labs.work.repository.ProjectRepository;
import web.labs.work.repository.TeamRepository;
import web.labs.work.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeamService {
    private final TeamRepository repo;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ModelMapper mapper;

    public TeamDto createTeam(Long projectId, TeamDto teamDto) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        Team team = mapper.map(teamDto, Team.class);
        team.setProject(project);
        team = repo.save(team);

        return mapper.map(team, TeamDto.class);
    }

    public TeamDto updateTeam(Long projectId, Integer id, TeamDto dto) {
        Team model = repo.findByIdAndProjectId(id, projectId).
                orElseThrow(() -> new ResourceNotFoundException("Team not found"));
        model.setName(dto.getName());
        model.setDescription(dto.getDescription());
        model = repo.save(model);
        return mapper.map(model, TeamDto.class);
    }

    public void deleteTeam(Integer teamId) {
        repo.delete(repo.findById(
                teamId).orElseThrow(() -> new ResourceNotFoundException("Team not found")));
    }

    public List<TeamDto> getTeamsByProjectId(Long projectId) {
        List<Team> teams = repo.findByProjectId(projectId);
        return teams.stream().map(team -> mapper.map(team, TeamDto.class)).toList();
    }

    public TeamDto getTeamByBothId(Long projectId, Integer teamId) {
        Team team = repo.findByIdAndProjectId(teamId, projectId).
                orElseThrow(() -> new ResourceNotFoundException("Team not found"));
        return mapper.map(team, TeamDto.class);
    }

    public List<UserDto> getTeamUsers(Integer teamId) {
        Team team = repo.findTeamWithUsers(teamId).orElseThrow(() ->
                new ResourceNotFoundException("Team not found"));
        return team.getUsers().stream().map(user -> {
            user.setPassword(null);
            return mapper.map(user, UserDto.class);
        }).toList();
    }

    public TeamDto addUserToTeam(Integer teamId, Long userId) {
        Team team = repo.findTeamWithUsers(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (!team.getUsers().contains(user))
            team.getUsers().add(user);
        else
            throw new IllegalArgumentException("Пользователь уже добавлен");
        Team savedTeam = repo.save(team);
        return mapper.map(savedTeam, TeamDto.class);
    }

    public void deleteUserFromTeam(Integer teamId, Long userId) {
        Team team = repo.findTeamWithUsers(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        team.getUsers().remove(user);
        repo.save(team);
    }
}
