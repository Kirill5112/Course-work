import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CommentService} from "../../services/services/comment.service";
import {CommentDto} from "../../services/models/comment-dto";
import {TaskService} from "../../services/services/task.service";
import {TaskDto} from "../../services/models/task-dto";
import {UserDto} from "../../services/models/user-dto";
import {jwtDecode} from "jwt-decode";
import {UserService} from "../../services/services/user.service";

export interface CommentWithUsername {
  comment: CommentDto;
  username: string;
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private router: Router,
              private commentService: CommentService, private taskService: TaskService,
              private userService: UserService) {
  }

  commentForm = this.fb.group({
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ])
  });

  private id!: number;
  protected comments: CommentWithUsername[] = [];
  protected task!: TaskDto;
  protected user: UserDto | undefined;

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.getUser();
    this.loadCommentsAndTask(this.id);
  }

  protected getUser() {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token || '');
    if (decoded.sub !== undefined) {
      this.userService.getUserByName({
        name: decoded.sub
      }).subscribe({
        next: user => {
          this.user = user;
        }
      })
    } else
      alert('no userName')
  }

  protected loadCommentsAndTask(id: number) {
    this.commentService.getTaskComments({
      taskId: id
    }).subscribe({
      next: comments => {
        this.comments = comments.map(comment => ({
          comment,
          username: comment.userId === this.user!.id! ? this.user!.username! : String(comment.userId)
        }))
      }
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
          const comm: CommentWithUsername = {
            comment: comment,
            username: comment.userId === this.user!.id! ? this.user!.username! : String(comment.userId)
          }
          this.comments.push(comm); // Добавляем в начало массива
          this.commentForm.reset();
        },
        error: () => alert("error")
      })
    }
  }

  get sortedComments() {
    return this.comments.sort((a, b) => {
        const dateA = new Date(a.comment.created!).getTime();
        const dateB = new Date(b.comment.created!).getTime();
        return dateA - dateB;
      }
    );
  }

  protected toStranger(id: number) {
    if (id !== this.user!.id)
      this.router.navigate(['stranger', String(id)])
  }

}
