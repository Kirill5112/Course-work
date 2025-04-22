import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TeamService} from "../../services/services/team.service";
import {UserDto} from "../../services/models/user-dto";
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {UserService} from "../../services/services/user.service";

@Component({
  selector: 'app-team-users-list',
  templateUrl: './team-users-list.component.html',
  styleUrls: ['./team-users-list.component.scss']
})
export class TeamUsersListComponent implements OnInit {
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router
    , private teamService: TeamService, private userService: UserService) {
    this.setupSearchDebounce();
  }

  form: FormGroup = this.fb.group({
    inputField: ['']
  });
  private search: string = '';
  searchUsers: UserDto[] = [];
  private searchDebounce = new Subject<string>();
  isEmpty = true;
  isHide = true;
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

  private setupSearchDebounce(): void {
    this.searchDebounce
      .pipe(
        debounceTime(300),
        distinctUntilChanged((prev, curr) => prev.toLowerCase() === curr.toLowerCase()),
        takeUntilDestroyed()
      )
      .subscribe(currentSearch => {
        this.search = currentSearch;
        this.findUsers();
      });
  }

  updateSearch(): void {
    const currentSearch = this.form.controls['inputField'].value;
    this.searchDebounce.next(currentSearch);
  }

  findUsers() {
    if (this.search !== '') {
      this.userService.findBySearch({
        search: this.search
      }).subscribe({
        next: users => {
          this.searchUsers = users.filter(user => {
            for (const user1 of this.users) {
              if (user.id === user1.id)
                return false;
            }
            return true;
          })
        }
      })
    } else
      this.searchUsers = [];
  }

  protected addUserToTeam(id: number) {
    this.teamService.addTeamUser({
      teamId: this.id,
      userId: id
    }).subscribe({
      next: () => {
        this.getUsers(this.id)
        for (let i = 0; i < this.searchUsers.length; i++) {
          if (this.searchUsers[i].id === id) {
            this.searchUsers.splice(i, 1)
            break
          }
        }
      },
      error: err => alert(err)
    })
  }

  protected deleteUserFromTeam(id: number) {
    this.teamService.deleteTeamUser({
      teamId: this.id,
      userId: id
    }).subscribe({
      next: () => {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].id === id) {
            this.users.splice(i, 1)
            break
          }
        }
      }
    })
  }

  protected toStranger(id: number) {
    this.router.navigate(['stranger', String(id)])
  }

}
