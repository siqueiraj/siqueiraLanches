import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endereco } from '../models/endereco.model';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  private apiUrl = 'http://localhost:8080/api/enderecos';

  constructor(private http: HttpClient) {}

  listAll(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(`${this.apiUrl}/listAll`);
  }

  findById(id: number): Observable<Endereco> {
    return this.http.get<Endereco>(`${this.apiUrl}/findById/${id}`);
  }

  save(endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(`${this.apiUrl}/save`, endereco);
  }

  update(id: number, endereco: Endereco): Observable<Endereco> {
    return this.http.put<Endereco>(`${this.apiUrl}/update/${id}`, endereco);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
