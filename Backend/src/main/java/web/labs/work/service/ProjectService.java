package web.labs.work.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import web.labs.work.dto.ProjectDto;
import web.labs.work.model.ProjectTaskCount;
import web.labs.work.exeption.ResourceNotFoundException;
import web.labs.work.model.Project;
import web.labs.work.repository.ProjectRepository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ModelMapper modelMapper;

    public ProjectDto createProject(ProjectDto projectDto) {
        Project project = modelMapper.map(projectDto, Project.class);
        return modelMapper.map(projectRepository.save(project), ProjectDto.class);
    }

    public ProjectDto getProjectById(Long projectId) {
        Project project = projectRepository.findById(projectId).
                orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        return modelMapper.map(project, ProjectDto.class);
    }

    public List<ProjectDto> searchProjects(String search) {
        List<Project> projects = search == null ?
                projectRepository.findAll() :
                projectRepository.searchProjects(search);
        return projects.stream().map(project -> modelMapper.map(project, ProjectDto.class)).toList();
    }

    public ProjectDto updateProject(Long projectId, ProjectDto projectDto) {
        Project project = projectRepository.findById(projectId).
                orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        project.setName(projectDto.getName());
        project.setDescription(projectDto.getDescription());
        project.setStartDate(projectDto.getStartDate());
        project.setEndDate(projectDto.getEndDate());
        project = projectRepository.save(project);
        return modelMapper.map(project, ProjectDto.class);
    }

    public void deleteProject(Long projectId) {
        projectRepository.deleteById(projectId);
    }

    public Map<Long, Long> getIncompleteTaskCounts() {
        return projectRepository.countIncompleteTasks().stream()
                .collect(Collectors.toMap(
                        ProjectTaskCount::projectId,
                        ProjectTaskCount::count
                ));
    }
}
