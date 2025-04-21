import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../../../services/services/task.service";
import {TaskDto} from "../../../services/models/task-dto";
import {futureDateValidator} from "../../../something/futureDateValidator";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private taskService: TaskService) {
  }

  private projectId!: number;
  private id!: number;
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    description: ['', [Validators.required]],
    endDate: ['', [Validators.required, futureDateValidator]]
  });
  btnText: string = 'Сохранить'
  isTrySubmit: Boolean = false;

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('projectId')!;
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
        this.form.patchValue(task);
      }
    })
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
      endDate: this.form.value.endDate
    };
    if (this.form.valid) {
      if (this.id !== 0)
        this.updateTask(taskData);
      else
        this.createTask(taskData);
    }
  }
}
