import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaskDto} from "../../services/models/task-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  constructor(private router: Router) {
  }

  get task(): TaskDto {
    return this._task;
  }

  @Input()
  set task(value: TaskDto) {
    this._task = value;
  }

  private _task: TaskDto = {};

  @Output() delete = new EventEmitter<number>();

  onDelete() {
    this.delete.emit(this._task.id);
  }

  editTask(projectId: number, id: number) {
    this.router.navigate(['tasks', String(projectId), String(id)]);
  }

  protected toComments(){
    this.router.navigate(['task',String(this._task.id),'comments']);
  }

}
