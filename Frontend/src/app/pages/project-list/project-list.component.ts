import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProjectService} from "../../services/services/project.service";
import {ProjectDto} from "../../services/models/project-dto";
import {debounceTime, distinctUntilChanged, forkJoin, Subject} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

export interface ProjectWithTaskCount {
  project: ProjectDto;
  unfinishedTasksCount: number;
}

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  private searchDebounce = new Subject<string>();
  private taskCountsMap: { [key: string]: number } = {};
  projectsWithTaskCounts: ProjectWithTaskCount[] = [];
  form: FormGroup = this.fb.group({
    inputField: ['']
  });
  private search: string = '';

  updateSearch(): void {
    const currentSearch = this.form.controls['inputField'].value;
    this.searchDebounce.next(currentSearch); // Передаём текущее значение
  }

  constructor(private fb: FormBuilder, private router: Router, private projectService: ProjectService) {
    this.setupSearchDebounce();
  }

  ngOnInit(): void {
    this.loadInitialData();
  }

  newProject() {
    this.router.navigate(['/projects/new']);
  }

  private findAllProjects(): void {
    this.projectService.getProjects({search: this.search})
      .pipe()
      .subscribe(projects => {
        this.updateProjectsWithTaskCounts(projects);
      });
  }

  private updateProjectsWithTaskCounts(projects: ProjectDto[]): void {
    this.projectsWithTaskCounts = projects.map(project => ({
      project,
      unfinishedTasksCount: this.taskCountsMap[project.id?.toString() || ''] || 0
    }));
  }

  private loadInitialData(): void {
    forkJoin({
      projects: this.projectService.getProjects({search: ''}),
      taskCounts: this.projectService.getTaskCounts()
    }).subscribe({
      next: ({projects, taskCounts}) => {
        this.taskCountsMap = taskCounts;
        this.updateProjectsWithTaskCounts(projects);
      },
      error: (error) => console.error('Ошибка загрузки данных:', error)
    });
  }

  private setupSearchDebounce(): void {
    this.searchDebounce
      .pipe(
        debounceTime(300),
        distinctUntilChanged((prev, curr) => prev.toLowerCase() === curr.toLowerCase()),
        takeUntilDestroyed()
      )
      .subscribe(currentSearch => {
        this.search = currentSearch;
        this.findAllProjects()
      });
  }

  protected goToProfile(){
    this.router.navigate(['profile']);
  }

}
