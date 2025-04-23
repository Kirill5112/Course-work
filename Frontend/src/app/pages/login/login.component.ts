import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserDto} from "../../services/models/user-dto";
import {AuthService} from "../../services/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
  }

  form: FormGroup = this.fb.group({
    userName: [''],
    password: ['']
  });

  register() {
    this.router.navigate(['register']);
  }

  onClick() {
    const data: UserDto = {
      username: this.form.value.userName,
      password: this.form.value.password
    };
    this.authService.login({
      body: data
    }).subscribe({
      next: (response: any) =>{
        const token = response.token;
        localStorage.setItem('token', token);
        localStorage.setItem('init', 'first');
        this.router.navigate(['home'])
      }
    });
  }
}
