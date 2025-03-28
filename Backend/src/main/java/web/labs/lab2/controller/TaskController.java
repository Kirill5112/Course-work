package web.labs.lab2.controller;

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
import web.labs.lab2.dto.TaskDto;
import web.labs.lab2.service.TaskService;

import java.util.List;

@RestController
@RequestMapping(value = "/api/projects/{projectId}/tasks", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Tag(name = "Task")
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public List<TaskDto> getProjectTasks(@PathVariable Long projectId) {
        return taskService.getTasksByProjectId(projectId);
    }

    @GetMapping("/{taskId}")
    public TaskDto getProjectTaskByBothID(@PathVariable Long projectId, @PathVariable Long taskId) {
        return taskService.getTaskByBothId(projectId, taskId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TaskDto createTask(@PathVariable Long projectId, @RequestBody TaskDto taskDto) {
        return taskService.createTask(projectId, taskDto);
    }

    @DeleteMapping("/{taskId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTask(@PathVariable Long projectId, @PathVariable Long taskId) {
        taskService.deleteTask(projectId, taskId);
    }

    @PutMapping("/{taskId}")
    public TaskDto updateTask(@PathVariable Long projectId, @PathVariable Long taskId, @RequestBody TaskDto taskDto) {
        return taskService.updateTask(projectId, taskId, taskDto);
    }

    @DeleteMapping("/completed")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCompletedTasks(@PathVariable Long projectId) {
        taskService.deleteCompletedTasks(projectId);
    }
}