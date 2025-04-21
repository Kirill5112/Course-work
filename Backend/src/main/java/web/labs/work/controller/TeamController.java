package web.labs.work.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import web.labs.work.dto.TeamDto;
import web.labs.work.service.TeamService;

import java.util.List;

@RestController
@RequestMapping(value = "/api/projects/{projectId}/teams", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Tag(name = "Team")
public class TeamController {
    private final TeamService service;
    private final TeamService teamService;

    @GetMapping
    public List<TeamDto> getProjectTeams(@PathVariable Long projectId) {
        return teamService.getTeamsByProjectId(projectId);
    }

    @GetMapping("/{teamId}")
    public TeamDto getTeam(@PathVariable Long projectId, @PathVariable Integer teamId) {
        return service.getTeamByBothId(projectId, teamId);
    }

    @PostMapping
    public TeamDto createTeam(@PathVariable Long projectId, @RequestBody TeamDto dto) {
        return service.createTeam(projectId, dto);
    }

    @PutMapping("/{id}")
    public TeamDto updateTeam(@PathVariable Long projectId, @PathVariable Integer id, @RequestBody TeamDto dto) {
        return service.updateTeam(projectId, id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTeam(@PathVariable Long projectId, @PathVariable Integer id) {
        service.deleteTeam(projectId, id);
    }
}
