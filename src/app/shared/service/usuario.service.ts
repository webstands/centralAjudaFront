import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  adicionarUsuario(data: any): Observable<any> {
    return this.http.post(`${environment.api}/users`, data);
  }

  getListaUsuario(): Observable<any> {
    return this.http.get(`${environment.api}/users`);
  }

  deletarUsuario(id: string): Observable<any> {
    return this.http.delete(`${environment.api}/users/${id}`);
  }

  atualizarUsuario(id: string, data: any): Observable<any> {
    return this.http.put(`${environment.api}/users/${id}`, data);
  }
}
