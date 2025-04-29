import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Avaliacao } from '../models/avaliacao.model';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  private apiUrl = 'http://localhost:8080/api/avaliacoes';

  constructor(private http: HttpClient) {}

  listAll(): Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>(`${this.apiUrl}/listAll`);
  }

  findById(id: number): Observable<Avaliacao> {
    return this.http.get<Avaliacao>(`${this.apiUrl}/findById/${id}`);
  }

  save(avaliacao: Partial<Avaliacao>): Observable<Avaliacao> {
    return this.http.post<Avaliacao>(`${this.apiUrl}/save`, avaliacao);
  }

  update(id: number, avaliacao: Partial<Avaliacao>): Observable<Avaliacao> {
    return this.http.put<Avaliacao>(`${this.apiUrl}/update/${id}`, avaliacao);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
