import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {ProjectService} from "../../services/services/project.service";
import {ProjectDto} from "../../services/models/project-dto";
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
  providers: [DatePipe]
})
export class EditProjectComponent implements OnInit {
  private id!: number;
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(255)]],
    startDate: ['', [Validators.required]],
    endDate: ['']
  }, {validators: this.validateEndDateAfterStartDate});
  btnText: string = 'Сохранить'
  isTrySubmit: Boolean = false;

  validateEndDateAfterStartDate(formGroup: FormGroup): { [key: string]: any } | null {
    const startDate = formGroup.get('startDate')?.value;
    const endDate = formGroup.get('endDate')?.value;
    if (!startDate || !endDate) {
      return null;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    return start > end ? {endDateBeforeStartDate: true} : null;
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.id !== 0)
      this.getProject(this.id);
    else
      this.btnText = 'Добавить'
  }

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private projectService: ProjectService) {
  }

  getProject(id: number) {
    this.projectService.getProject({
      projectId: id
    }).subscribe({
      next: (project) => {
        this.form.patchValue(project);
      }
    })
  }

  createProject(projectData: ProjectDto) {
    this.projectService.createProject({
      body: projectData
    }).subscribe(() => {
      this.router.navigate(['projects/']);
    })
  }

  updateProject(projectData: ProjectDto) {
    this.projectService.updateProject({
      projectId: this.id,
      body: projectData
    }).subscribe(() => {
      this.router.navigate(['projects/']);
    })
  }

  onClick() {
    this.isTrySubmit = true;
    const projectData: ProjectDto = {
      name: this.form.value.name,
      description: this.form.value.description,
      startDate: this.form.value.startDate,
      endDate: this.form.value.endDate
    };
    if (this.form.valid) {
      if (this.id !== 0)
        this.updateProject(projectData);
      else
        this.createProject(projectData);
    }
  }

  onDelete() {
    if (this.id !== 0)
      this.projectService.deleteProject({
        projectId: this.id
      }).subscribe({
        next: () => {
          this.router.navigate(['projects/']);
        },
        error: err => {
          alert('Ошибка:' + err);
        }
      })
    else
      this.router.navigate(['projects/']);
  }

}
