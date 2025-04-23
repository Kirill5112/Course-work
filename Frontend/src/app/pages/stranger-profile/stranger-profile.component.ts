import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/services/user.service";
import {UserDto} from "../../services/models/user-dto";

@Component({
  selector: 'app-stranger-profile',
  templateUrl: './stranger-profile.component.html',
  styleUrls: ['./stranger-profile.component.scss']
})
export class StrangerProfileComponent implements OnInit {
  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  id!: number;
  stranger!: UserDto;

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.getStranger(this.id);
  }

  protected getStranger(id: number) {
    this.userService.getUser({
      userId: id
    }).subscribe({
      next: user => {
        this.stranger = user;
      },
      error: (error) => {
        alert('Произошла ошибка' + error);
      }
    })
  }

}
