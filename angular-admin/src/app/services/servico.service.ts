import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Servico } from '../interfaces/servico';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  endpoint = '';

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.api}/servicos`;
  }

  all(): Observable<Servico[]> {
    return this.http.get<Servico[]>(this.endpoint);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
