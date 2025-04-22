import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {CommentService} from "../../services/services/comment.service";
import {CommentDto} from "../../services/models/comment-dto";
import {TaskService} from "../../services/services/task.service";
import {TaskDto} from "../../services/models/task-dto";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private commentService: CommentService, private taskService: TaskService) {
  }

  commentForm = this.fb.group({
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ])
  });

  private id!: number;
  protected comments: CommentDto[] = [];
  protected task!: TaskDto;

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.loadCommentsAndTask(this.id);
  }

  protected loadCommentsAndTask(id: number) {
    this.commentService.getTaskComments({
      taskId: id
    }).subscribe({
      next: comments => this.comments = comments
    })
    this.taskService.getProjectTaskByBothId({
      projectId: 0,
      taskId: id
    }).subscribe({
      next: task => this.task = task
    })
  }

  addComment() {
    if (this.commentForm.valid) {
      const newComment: CommentDto = {
        content: this.commentForm.value.text!
      };
      this.commentService.createComment({
        taskId: this.id,
        body: newComment
      }).subscribe({
        next: comment => {
          this.comments.push(comment); // Добавляем в начало массива
          this.commentForm.reset();
        },
        error: () => alert("error")
      })
    }
  }

  get sortedComments() {
    return this.comments.sort((a, b) => {
        const dateA = new Date(a.created!).getTime();
        const dateB = new Date(b.created!).getTime();
        return dateA - dateB;
      }
    );
  }

}
