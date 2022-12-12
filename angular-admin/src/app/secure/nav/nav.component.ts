import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) {
    this.user = {
      id: 0,
      first_name: '',
      last_name: '',
      email: '',
      is_financeiro: false
    }
  }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      user => {
        this.user = user;
      }
    );
  }

  logout(): void {
    this.authService.logout().subscribe(
      res => {
        console.log("Logout - ", res);
      }
    )
  }
}
