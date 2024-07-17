import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChamadoService {
  private apiUrl = `${environment.api}/calls`;

  constructor(private http: HttpClient) {}

  adicionarChamado(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getListaChamado(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  atualizarChamado(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, data);
  }

  deletarChamado(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  closeCall(id: number, closedBy: string, rating: number): Observable<any> {
    const params = new HttpParams().set('rating', rating.toString());
    return this.http.post(`${this.apiUrl}/close/${id}`, { closedBy }, { params });
  }

  rateCall(id: number, rating: number): Observable<any> {
    const params = new HttpParams().set('rating', rating.toString());
    return this.http.post(`${this.apiUrl}/rate/${id}`, {}, { params });
  }

  searchCalls(query: string): Observable<any> {
    const params = new HttpParams().set('query', query);
    return this.http.get(`${this.apiUrl}/search`, { params });
  }
}
