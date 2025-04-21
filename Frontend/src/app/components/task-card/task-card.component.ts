import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaskDto} from "../../services/models/task-dto";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../something/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  constructor(private router: Router, private dialog: MatDialog) {
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Действительно удалить элемент?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.delete.emit(this._task.id);
      }
    });
  }

  editTask(projectId: number, id: number) {
    this.router.navigate(['tasks', String(projectId), String(id)]);
  }
}
