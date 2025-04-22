import {Component, OnInit} from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import {Router} from "@angular/router";
import {UserService} from "../../services/services/user.service";
import {UserDto} from "../../services/models/user-dto";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

    constructor(private userService: UserService) {
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
        }
        else
            alert('no userName')
    }

}
