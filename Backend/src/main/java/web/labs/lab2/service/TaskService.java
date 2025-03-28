package web.labs.lab2.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import web.labs.lab2.dto.TaskDto;
import web.labs.lab2.exeption.ResourceNotFoundException;
import web.labs.lab2.model.Project;
import web.labs.lab2.model.Task;
import web.labs.lab2.repository.ProjectRepository;
import web.labs.lab2.repository.TaskRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final ModelMapper modelMapper;

    public TaskDto createTask(Long projectId, TaskDto taskDto) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        Task task = modelMapper.map(taskDto, Task.class);
        task.setProject(project);
        task = taskRepository.save(task);

        return modelMapper.map(task, TaskDto.class);
    }

    public List<TaskDto> getTasksByProjectId(Long projectId) {
        List<Task> tasks = taskRepository.findByProjectId(projectId);
        return tasks.stream().map(task -> modelMapper.map(task, TaskDto.class)).toList();
    }

    public TaskDto getTaskByBothId(Long projectId, Long taskId) {
        Task task = taskRepository.findByIdAndProjectId(taskId, projectId).
                orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        return modelMapper.map(task, TaskDto.class);
    }

    public TaskDto updateTask(Long projectId, Long taskId, TaskDto taskDto) {
        Task task = taskRepository.findByIdAndProjectId(taskId, projectId).
                orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        task.setName(taskDto.getName());
        task.setDescription(taskDto.getDescription());
        task.setEndDate(taskDto.getEndDate());
        task.setCompleted(taskDto.isCompleted());
        task = taskRepository.save(task);
        return modelMapper.map(task, TaskDto.class);
    }

    public void deleteCompletedTasks(Long projectId) {
        taskRepository.deleteCompletedTasks(projectId);
    }

    public void deleteTask(Long projectId, Long taskId) {
        taskRepository.delete(taskRepository.findByIdAndProjectId(
                taskId, projectId).orElseThrow(() -> new ResourceNotFoundException("Task not found")));
    }
}
