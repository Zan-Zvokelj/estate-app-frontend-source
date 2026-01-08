import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  providers: [AuthService],
  imports: [ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.authService
      .login(this.f['username'].value, this.f['password'].value)
      .pipe(first())
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(['/']);
        this.authService.checkLoginStatus();
      });
  }
}
