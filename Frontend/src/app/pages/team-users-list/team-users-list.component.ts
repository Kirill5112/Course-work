import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TeamService} from "../../services/services/team.service";
import {UserDto} from "../../services/models/user-dto";
import {isEmpty} from "rxjs";

@Component({
  selector: 'app-team-users-list',
  templateUrl: './team-users-list.component.html',
  styleUrls: ['./team-users-list.component.scss']
})
export class TeamUsersListComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private teamService: TeamService) {
  }

  isEmpty = true;
  users: UserDto[] = [];
  private id!: number;

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.getUsers(this.id);
  }

  private getUsers(id: number) {
    this.teamService.getTeamUsers({
      teamId: id
    }).subscribe({
      next: users => {
        this.users = users;
        if (users.length != 0)
          this.isEmpty = false;
      }
    })
  }

  protected toStranger(id: number) {
    this.router.navigate(['stranger', String(id)])
  }

}
