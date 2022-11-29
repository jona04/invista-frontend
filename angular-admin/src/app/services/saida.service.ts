import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SaidaChapa } from '../interfaces/saida-chapa';
import { ChapaEstoque } from '../interfaces/estoque';

@Injectable({
  providedIn: 'root'
})
export class SaidaChapaService {
  endpoint = '';

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.api}/chapas-saida`;
  }

  all(): Observable<SaidaChapa[]> {
    return this.http.get<SaidaChapa[]>(this.endpoint);
  }

  get(id: number): Observable<SaidaChapa> {
    return this.http.get<SaidaChapa>(`${this.endpoint}/${id}`);
  }

  create(data: SaidaChapa): Observable<SaidaChapa> {
    return this.http.post<SaidaChapa>(this.endpoint, data);
  }

  update(id: number, data: SaidaChapa): Observable<SaidaChapa> {
    return this.http.put<SaidaChapa>(`${this.endpoint}/${id}`, data);
  }
}
