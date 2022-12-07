import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Nota } from '../interfaces/nota';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  endpoint = '';

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.api}/notas`;
  }

  getFull(id: number): Observable<Nota> {
    return this.http.get<Nota>(`${this.endpoint}/full/${id}`);
  }

  all(): Observable<Nota[]> {
    return this.http.get<Nota[]>(`${this.endpoint}`);
  }

  allList(start: string, end: string): Observable<Nota[]> {
    return this.http.get<Nota[]>(`${this.endpoint}/list?start=${start}&end=${end}`);
  }

  relatorio(start: string, end: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/relatorio?start=${start}&end=${end}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }

  create(data: Nota): Observable<Nota> {
    return this.http.post<Nota>(this.endpoint, data);
  }

  update(id: number, data: Nota): Observable<Nota> {
    return this.http.put<Nota>(`${this.endpoint}/${id}`, data);
  }
}
