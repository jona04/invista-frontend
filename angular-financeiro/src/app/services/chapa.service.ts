import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chapa } from '../interfaces/chapa';

@Injectable({
  providedIn: 'root'
})
export class ChapaService {
  endpoint = '';

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.api}/chapas`;
  }

  all(): Observable<Chapa[]> {
    return this.http.get<Chapa[]>(this.endpoint);
  }

  allBackend(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/backend`);
  }
  
}
