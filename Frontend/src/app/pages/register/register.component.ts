import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserDto} from "../../services/models/user-dto";
import {AuthService} from "../../services/services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  isTrySubmit: Boolean = false;

  form: FormGroup = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    email: ['', [Validators.email, Validators.required, Validators.maxLength(255)]],
    password: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(72)]],
    repeatPassword: ['', [Validators.required]]
  }, {validators: this.validateRepeatPassword});

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
  }

  login() {
    this.router.navigate(['login']);
  }

  validateRepeatPassword(formGroup: FormGroup): { [key: string]: any } | null {
    const password = formGroup.get('password')?.value;
    const repeatPassword = formGroup.get('repeatPassword')?.value;
    if (!password || !repeatPassword) {
      return null;
    }

    return password !== repeatPassword ? {PassDontEqual: true} : null;
  }

  onClick() {
    this.isTrySubmit = true;
    const data: UserDto = {
      username: this.form.value.userName,
      password: this.form.value.password,
      email: this.form.value.email
    };
    if (this.form.valid) {
      this.authService.register({
        body: data
      }).subscribe(() =>
        this.login());
    }
  }
}
