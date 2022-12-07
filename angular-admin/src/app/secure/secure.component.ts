import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Emitters } from '../emitters/emitters';
import { ShowMenuService } from '../services/show-menu.service';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private showMenuService: ShowMenuService) { }

  ngOnInit(): void {
    this.authService.user().subscribe(
      user => {
        if (user?.id){
          Emitters.authEmitter.emit(user);
        }else{
          Emitters.authEmitter.emit(undefined);
          this.router.navigate(['/login'])
        }
      }
    );
  }

  public get showMenu(): boolean {
    return this.showMenuService.showMenu;
  }

}
