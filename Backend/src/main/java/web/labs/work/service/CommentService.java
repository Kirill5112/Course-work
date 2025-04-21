package web.labs.work.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import web.labs.work.dto.CommentDto;
import web.labs.work.exeption.ResourceNotFoundException;
import web.labs.work.model.Comment;
import web.labs.work.model.Task;
import web.labs.work.model.User;
import web.labs.work.repository.CommentRepository;
import web.labs.work.repository.TaskRepository;
import web.labs.work.repository.UserRepository;

import java.sql.Timestamp;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository repo;
    private final TaskRepository taskRepo;
    private final UserRepository userRepo;
    private final ModelMapper mapper;

    public List<CommentDto> getTaskComments(Long taskId) {
        List<Comment> comments = repo.findByTaskId(taskId);
        return comments.stream().map(comment -> mapper.map(comment, CommentDto.class)).toList();
    }

    public CommentDto createComment(Long taskId, CommentDto dto) {
        Task task = taskRepo.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepo.findByUserName(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Comment comment = mapper.map(dto, Comment.class);
        comment.setTask(task);
        comment.setUser(user);
        java.sql.Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());
        comment.setCreated(currentTimestamp);
        comment = repo.save(comment);

        return mapper.map(comment, CommentDto.class);
    }

    public CommentDto getCommentById(Long id) {
        Comment model = repo.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("Comment not found"));
        return mapper.map(model, CommentDto.class);
    }

    public CommentDto updateComment(Long id, CommentDto dto) {
        Comment model = repo.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("Comment not found"));
        model.setContent(dto.getContent());
        model.setUpdated(dto.getUpdated());
        model = repo.save(model);
        return mapper.map(model, CommentDto.class);
    }

    public void deleteComment(Long id) {
        repo.deleteById(id);
    }


}
