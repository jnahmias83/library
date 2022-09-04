import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  

  constructor(private as: AuthService, private router: Router) {}

  ngOnInit(): void {
     
  }

  logout() {
    this.as
      .logout()
      .then(() => {
        this.as.setSessionData('isLoggedIn','false');
        this.router.navigateByUrl('login');
      })
      .catch((error) => console.log(error));
  }

  checkLogin() {
    return this.as.getSessionData('isLoggedIn') == 'true';
  }

  getUsername () : string {
    return this.as.getSessionData('email');
  }
}
