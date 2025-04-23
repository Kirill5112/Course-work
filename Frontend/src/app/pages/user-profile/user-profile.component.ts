import {Component, OnInit} from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import {UserService} from "../../services/services/user.service";
import {UserDto} from "../../services/models/user-dto";
import {Router} from "@angular/router";
import {LogoutService} from "../../something/logout.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private logoutService: LogoutService) {
  }

  protected user: UserDto | undefined;

  ngOnInit(): void {
    this.getUser()
  }

  protected getUser() {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token || '');
    if (decoded.sub !== undefined) {
      this.userService.getUserByName({
        name: decoded.sub
      }).subscribe({
        next: user => {
          this.user = user;
        }
      })
    } else
      alert('no userName')
  }

  protected toHome() {
    this.router.navigate(['home']);
  }

  protected toProjects(){
    this.router.navigate(['projects']);
  }

  protected logout() {
    localStorage.setItem('token', '');
    this.logoutService.logout().subscribe()
    this.router.navigate(['login'])
  }

}
