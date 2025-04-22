package web.labs.work.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import web.labs.work.dto.TeamDto;
import web.labs.work.dto.UserDto;
import web.labs.work.service.UserService;

import java.util.List;

@RestController
@RequestMapping(value = "/api/users", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Tag(name = "User")
public class UserController {
    private final UserService userService;

    @GetMapping("/{userId}")
    public UserDto getUser(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    @GetMapping
    public UserDto getUserByName(@RequestParam String name) {
        return userService.getUserByUsername(name);
    }

    @GetMapping("/find")
    public List<UserDto> findBySearch(@RequestParam String search) {
        return userService.searchUsers(search);
    }

    @GetMapping("find/{projectId}")
    public List<UserDto> findByProjectId(@PathVariable Long projectId) {
        return userService.getUsersByProjectId(projectId);
    }

    @GetMapping("/{userId}/teams")
    public List<TeamDto> getUserTeams(@PathVariable Long userId) {
        return userService.getUserTeams(userId);
    }

    @PutMapping("/{userId}")
    public UserDto updateUser(@PathVariable Long userId, @RequestBody UserDto userDto) {
        return userService.updateUser(userId, userDto);
    }

    @PutMapping("/{userId}/toggleEnabled")
    public String toggleEnabled(@PathVariable Long userId) {
        if(userService.toggleEnabledUser(userId))
            return "User unblocked";
        else
            return "User blocked";
    }

    @DeleteMapping("/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
    }

}
