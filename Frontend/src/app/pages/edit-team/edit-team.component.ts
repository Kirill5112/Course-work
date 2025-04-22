import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TeamService} from "../../services/services/team.service";
import {TeamDto} from "../../services/models/team-dto";

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss']
})
export class EditTeamComponent implements OnInit {
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private router: Router, private teamService: TeamService) {
  }

  private projectId!: number;
  private id!: number;

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    description: ['', [Validators.required]]
  });
  btnText: string = 'Сохранить'
  isTrySubmit: Boolean = false;

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('projectId')!;
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.id !== 0)
      this.getTeam(this.projectId, this.id);
    else
      this.btnText = 'Добавить'
  }

  private getTeam(projectId: number, id: number) {
    this.teamService.getTeam({
      projectId: projectId,
      teamId: id
    }).subscribe({
      next: (team) => {
        this.form.patchValue(team);
      }
    })
  }

  createTeam(teamData: TeamDto) {
    this.teamService.createTeam({
      projectId: this.projectId,
      body: teamData
    }).subscribe(() => {
      this.router.navigate(['teams', this.projectId])
    })
  }

  updateTeam(teamData: TeamDto) {
    this.teamService.updateTeam({
      projectId: this.projectId,
      id: this.id,
      body: teamData
    }).subscribe(() => {
      this.router.navigate(['teams', this.projectId])
    })
  }

  onClick() {
    this.isTrySubmit = true;
    const team: TeamDto = {
      name: this.form.value.name,
      description: this.form.value.description
    };
    if (this.form.valid) {
      if (this.id !== 0)
        this.updateTeam(team);
      else
        this.createTeam(team);
    }
  }

  onDelete() {
    if (this.id !== 0)
      this.teamService.deleteTeam({
        id: this.id
      }).subscribe({
        next: () => {
          this.router.navigate(['teams', String(this.projectId)]);
        },
        error: err => {
          alert('Ошибка:' + err);
        }
      })
    else
      this.router.navigate(['teams', String(this.projectId)]);
  }

}
