import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = { email: '', password: '' };
  constructor(private as: AuthService, private router: Router) {}

  ngOnInit(): void {}

  submitLogin(): void {
    this.as
      .login(this.user)
      .then((data) => {
        console.log(data.user.email);
        this.as.setSessionData('isLoggedIn', 'true');
        this.as.setSessionData('email', data.user.email as string);
        this.router.navigateByUrl('home');
      })
      .catch((error) => {
        alert('Wrong email or password');
        console.log(error);
        this.user = { email: '', password: '' };
      });
  }

  submitLoginWithGoogle(): void {
    this.as
      .loginWithGoogle()
      .then((data) => {
        console.log(data.user.displayName);
        this.as.setSessionData('isLoggedIn', 'true');
        this.as.setSessionData('email', data.user.email as string);
        this.router.navigateByUrl('home');
      })
      .catch((error) => {
        alert('Wrong google account');
        console.log(error);
        this.user = { email: '', password: '' };
      });
  }
}
