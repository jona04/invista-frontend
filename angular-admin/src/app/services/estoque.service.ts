import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChapaEstoque } from '../interfaces/estoque';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {
  endpoint = '';

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.api}/estoque`;
  }

  all(start: string, end: string): Observable<ChapaEstoque[]> {
    return this.http.get<ChapaEstoque[]>(`${this.endpoint}?start=${start}&end=${end}`);
  }
}
