import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoriaEstoque } from '../interfaces/categoria-estoque';

@Injectable({
  providedIn: 'root'
})
export class CategoriaEntradaService {
  endpoint = '';

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.api}/categoria-entrada`;
  }

  all(): Observable<CategoriaEstoque[]> {
    return this.http.get<CategoriaEstoque[]>(this.endpoint);
  }

  create(data: CategoriaEstoque): Observable<CategoriaEstoque> {
    return this.http.post<CategoriaEstoque>(this.endpoint, data);
  }
}
