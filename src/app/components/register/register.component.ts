import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = { email: '', password: '' };
  constructor(private as : AuthService, private router : Router) { }

  ngOnInit(): void {
  }
  submitRegister() {
    this.as
    .register(this.user)
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
}
