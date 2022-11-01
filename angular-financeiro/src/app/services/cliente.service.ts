import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  endpoint = '';

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.api}/clientes`;
  }

  all(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.endpoint);
  }

  create(data: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.endpoint}`, data);
  }

  get(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.endpoint}/${id}`);
  }

  update(id: number, data: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.endpoint}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
