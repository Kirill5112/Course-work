package web.labs.work.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import web.labs.work.dto.TaskDto;
import web.labs.work.exeption.ResourceNotFoundException;
import web.labs.work.model.Project;
import web.labs.work.model.Task;
import web.labs.work.model.User;
import web.labs.work.repository.ProjectRepository;
import web.labs.work.repository.TaskRepository;
import web.labs.work.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public TaskDto createTask(Long projectId, TaskDto taskDto) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        if (taskDto.getUserId() == null)
            throw new IllegalArgumentException("no assigny person");
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
        if (taskDto.getUserId() != null) {
            User user = userRepository.findById(taskDto.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("Assigny User not found"));
            task.setUser(user);
        }
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
