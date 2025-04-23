import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TaskService} from "../../services/services/task.service";
import {TaskDto} from "../../services/models/task-dto";
import {UserDto} from "../../services/models/user-dto";
import {jwtDecode} from "jwt-decode";
import {UserService} from "../../services/services/user.service";
import {TeamDto} from "../../services/models/team-dto";

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent implements OnInit {
  constructor(private router: Router,
              private taskService: TaskService, private userService: UserService) {
  }

  tasks: TaskDto[] = [];
  protected user!: UserDto;
  hasError = false;
  errorMessage: string | null = null;
  isEmpty = false;
  hoveredTeam: TeamDto | null = null;

  ngOnInit(): void {
    this.getUserAndTasks()
  }

  protected getUserAndTasks() {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token || '');
    if (decoded.sub !== undefined) {
      this.userService.getUserByName({
        name: decoded.sub
      }).subscribe({
        next: user => {
          this.user = user;
          this.findAllTasks()
          if (this.user.role === "ROLE_ADMIN" && localStorage.getItem('init') === 'first') {
            this.router.navigate(['projects']);
            localStorage.setItem('init', 'notFirst');
          }
        }
      })
    } else
      alert('no userName')
  }

  findAllTasks() {
    this.taskService.getUserTasks({
      userId: this.user.id!
    }).subscribe({
      next: (tasks) => {
        tasks.sort((a, b) => {
          const dateA = new Date(a.endDate!).getTime();
          const dateB = new Date(b.endDate!).getTime();
          return dateA - dateB;
        });
        this.tasks = tasks;
      }
    })
  }

  toComments(id: number) {
    this.router.navigate(['task', String(id), 'comments'])
  }

  protected goToProfile(){
    this.router.navigate(['profile']);
  }

}
