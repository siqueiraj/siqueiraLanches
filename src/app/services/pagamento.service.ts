import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagamento } from '../models/pagamento.model';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {
  private apiUrl = 'http://localhost:8080/api/pagamentos';

  constructor(private http: HttpClient) {}

  listAll(): Observable<Pagamento[]> {
    return this.http.get<Pagamento[]>(`${this.apiUrl}/listAll`);
  }

  findById(id: number): Observable<Pagamento> {
    return this.http.get<Pagamento>(`${this.apiUrl}/findById/${id}`);
  }

  save(pagamento: Partial<Pagamento>): Observable<Pagamento> {
    return this.http.post<Pagamento>(`${this.apiUrl}/save`, pagamento);
  }

  update(id: number, pagamento: Partial<Pagamento>): Observable<Pagamento> {
    return this.http.put<Pagamento>(`${this.apiUrl}/update/${id}`, pagamento);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
