import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EntradaChapa } from '../interfaces/entrada-chapa';
import { ChapaEstoque } from '../interfaces/estoque';

@Injectable({
  providedIn: 'root'
})
export class EntradaChapaService {
  endpoint = '';

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.api}/chapas-entrada`;
  }

  all(): Observable<EntradaChapa[]> {
    return this.http.get<EntradaChapa[]>(this.endpoint);
  }

  allList(): Observable<EntradaChapa[]> {
    return this.http.get<EntradaChapa[]>(`${this.endpoint}/list`);
  }

  get(id: number): Observable<EntradaChapa> {
    return this.http.get<EntradaChapa>(`${this.endpoint}/${id}`);
  }

  create(data: EntradaChapa): Observable<EntradaChapa> {
    return this.http.post<EntradaChapa>(this.endpoint, data);
  }

  update(id: number, data: EntradaChapa): Observable<EntradaChapa> {
    return this.http.put<EntradaChapa>(`${this.endpoint}/${id}`, data);
  }
}
