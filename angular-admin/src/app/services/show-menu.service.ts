import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chapa } from '../interfaces/chapa';

@Injectable({
  providedIn: 'root'
})
export class ShowMenuService {
  public showMenu: boolean = true;

  constructor() {
  }
}
