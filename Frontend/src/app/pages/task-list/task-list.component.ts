import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../../services/services/task.service";
import {TaskDto} from "../../services/models/task-dto";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  private id!: number;
  tasks: TaskDto[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private taskService: TaskService) {
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('projectId')!;
    this.findAllTasks(this.id)
  }

  findAllTasks(id: number) {
    this.taskService.getProjectTasks({
      projectId: id
    }).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      }
    })
  }

  toProjectsList() {
    this.router.navigate(['projects']);
  }

  handleDelete(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.taskService.deleteTask({
      projectId: this.id,
      taskId: id
    }).subscribe();
  }

  newProject() {
    this.router.navigate(['/tasks', String(this.id), 'new']);
  }

}
