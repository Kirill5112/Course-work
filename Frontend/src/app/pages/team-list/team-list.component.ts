import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TeamService} from "../../services/services/team.service";
import {TeamDto} from "../../services/models/team-dto";

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private teamService: TeamService) {
  }

  teams: TeamDto[] = [];
  private projectId!: number;
  hasError = false;
  errorMessage: string | null = null;
  isEmpty = false;
  hoveredTeam: TeamDto | null = null;

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('projectId')!;
    this.getTeams(this.projectId);
  }

  getTeams(projectId: number) {
    this.teamService.getProjectTeams({
      projectId: projectId
    }).subscribe({
      next: (teams) => {
        this.teams = teams;
        this.hasError = false;
        this.isEmpty = teams.length === 0;
      },
      error: (error) => {
        this.errorMessage = 'Произошла ошибка';
        this.hasError = true;
        this.isEmpty = false;
      }
    })
  }

  newTeam() {
    this.router.navigate(['teams', String(this.projectId), 'new']);
  }
  editTeam(id: number){
    this.router.navigate(['teams',String(this.projectId),String(id)]);
  }

}
