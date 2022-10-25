import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endpoint = '';

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.api}/financeiros`;
  }

  all(): Observable<User[]> {
    return this.http.get<User[]>(this.endpoint);
  }
}
