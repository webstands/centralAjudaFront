import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChamadoService {
  constructor(private http: HttpClient) {}

  adicionarChamado(data: any): Observable<any> {
    return this.http.post(`${environment.api}/cars`, data);
  }

  getListaChamado(): Observable<any> {
    return this.http.get(`${environment.api}/cars`);
  }

  atualizarChamado(id: number, data: any): Observable<any> {
    return this.http.put(`${environment.api}/cars/${id}`, data);
  }

  
  deletarChamado(id: number): Observable<any> {
    return this.http.delete(`${environment.api}/cars/${id}`);
  }
}
