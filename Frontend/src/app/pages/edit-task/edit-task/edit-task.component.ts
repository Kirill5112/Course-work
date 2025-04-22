import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../../../services/services/task.service";
import {TaskDto} from "../../../services/models/task-dto";
import {futureDateValidator} from "../../../something/futureDateValidator";
import {UserDto} from "../../../services/models/user-dto";
import {UserService} from "../../../services/services/user.service";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
              private taskService: TaskService, private userService: UserService) {
  }

  private projectId!: number;
  private id!: number;
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    description: ['', [Validators.required]],
    endDate: ['', [Validators.required, futureDateValidator]],
    responsibleUser: ['', Validators.required]
  });
  btnText: string = 'Сохранить'
  isTrySubmit: Boolean = false;
  users: UserDto[] = [];

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('projectId')!;
    this.loadUsers(this.projectId);
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.id !== 0)
      this.getTask(this.projectId, this.id);
    else
      this.btnText = 'Добавить'
  }

  private getTask(projectId: number, id: number) {
    this.taskService.getProjectTaskByBothId({
      projectId: projectId,
      taskId: id
    }).subscribe({
      next: (task) => {
        this.form.patchValue({
          name: task.name,
          description: task.description,
          endDate: task.endDate,
          responsibleUser: task.userId
        })
      }
    })
  }

  protected loadUsers(id: number) {
    this.userService.findByProjectId({
      projectId: id
    }).subscribe({
      next: users => this.users = users
      }
    )
  }

  createTask(taskData: TaskDto) {
    this.taskService.createTask({
      projectId: this.projectId,
      body: taskData
    }).subscribe(() => {
      this.router.navigate(['tasks', this.projectId])
    })
  }

  updateTask(taskData: TaskDto) {
    this.taskService.updateTask({
      projectId: this.projectId,
      taskId: this.id,
      body: taskData
    }).subscribe(() => {
      this.router.navigate(['tasks', this.projectId])
    })
  }

  onClick() {
    this.isTrySubmit = true;
    const taskData: TaskDto = {
      name: this.form.value.name,
      description: this.form.value.description,
      endDate: this.form.value.endDate,
      userId: this.form.value.responsibleUser
    };
    if (this.form.valid) {
      if (this.id !== 0)
        this.updateTask(taskData);
      else
        this.createTask(taskData);
    }
  }
}
