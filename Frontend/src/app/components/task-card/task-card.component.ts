import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaskDto} from "../../services/models/task-dto";

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
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
    this.delete.emit(this._task.id); // Эмитим ID проекта при удалении
  }
}
