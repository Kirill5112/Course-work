import {Component, Input} from '@angular/core';
import {ProjectDto} from "../../services/models/project-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  private _project: ProjectDto = {};
  private _countIncompleteTasks: number = 0;

  get project(): ProjectDto {
    return this._project;
  }

  @Input()
  set project(value: ProjectDto) {
    this._project = value;
  }

  get countIncompleteTasks(): number {
    return this._countIncompleteTasks;
  }

  @Input()
  set countIncompleteTasks(value: number) {
    this._countIncompleteTasks = value;
  }

  editProject(id: number) {
    this.router.navigate(['/projects', id]);
  }

  constructor(private router: Router) {
  }

  toTasksList(id: number) {
    this.router.navigate(['tasks', id])
  }
}
