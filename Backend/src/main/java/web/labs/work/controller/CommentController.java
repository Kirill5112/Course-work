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
import web.labs.work.dto.CommentDto;
import web.labs.work.service.CommentService;

import java.util.List;

@RestController
@RequestMapping(value = "/api/tasks/{taskId}/comments", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Tag(name = "Comment")
public class CommentController {
    private final CommentService service;

    @GetMapping
    public List<CommentDto> getTaskComments(@PathVariable Long taskId) {
        return service.getTaskComments(taskId);
    }

    @GetMapping("/{id}")
    public CommentDto getComment(@PathVariable Long id) {
        return service.getCommentById(id);
    }

    @PostMapping
    public CommentDto createComment(@PathVariable Long taskId, @RequestBody CommentDto dto) {
        return service.createComment(taskId, dto);
    }

    @PutMapping("/{id}")
    public CommentDto updateComment(@PathVariable Long id, @RequestBody CommentDto dto) {
        return service.updateComment(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComment(@PathVariable Long id) {
        service.deleteComment(id);
    }
}
