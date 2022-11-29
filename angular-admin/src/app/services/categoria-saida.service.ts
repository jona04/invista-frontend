import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoriaEstoque } from '../interfaces/categoria-estoque';

@Injectable({
  providedIn: 'root'
})
export class CategoriaSaidaService {
  endpoint = '';

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.api}/categoria-saida`;
  }

  all(): Observable<CategoriaEstoque[]> {
    return this.http.get<CategoriaEstoque[]>(this.endpoint);
  }
}
