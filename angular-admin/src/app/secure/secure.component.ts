import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Emitters } from '../emitters/emitters';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  /**
   * Resolve the current user before rendering the authenticated layout.
   *
   * Both outcomes have to be handled. A response without an id means the API
   * answered but there is no session; a failed request means it rejected the
   * call outright, which is what happens once the token is gone. Handling only
   * the first left the screen blank on an expired session, because the error
   * skipped the success callback entirely and no redirect ever ran.
   */
  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (user: User) => {
        if (user?.id) {
          Emitters.authEmitter.emit(user);
        } else {
          this.returnToLogin();
        }
      },
      error: () => this.returnToLogin()
    });
  }

  /** Clear the authenticated state and send the user to the login screen. */
  private returnToLogin(): void {
    Emitters.authEmitter.emit(undefined);
    this.router.navigate(['/login']);
  }
}
