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

  create(data: Chapa): Observable<Chapa> {
    return this.http.post<Chapa>(`${this.endpoint}`, data);
  }

  get(id: number): Observable<Chapa> {
    return this.http.get<Chapa>(`${this.endpoint}/${id}`);
  }

  update(id: number, data: Chapa): Observable<Chapa> {
    return this.http.put<Chapa>(`${this.endpoint}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
