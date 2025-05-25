import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';

interface PedidoDTO {
  compradorId: number;
  itens: {
    produtoId: number;
    quantidade: number;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:8080/api/pedidos';

  constructor(private http: HttpClient) {}

  listAll(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/listAll`, {
      withCredentials: true
    });
  }

  findById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/findById/${id}`, {
      withCredentials: true
    });
  }

  save(pedido: PedidoDTO): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.apiUrl}/save`, pedido, {
      withCredentials: true
    });
  }  
  
  update(id: number, pedido: PedidoDTO): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}/update/${id}`, pedido, {
      withCredentials: true
    });
  }  

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, {
      withCredentials: true
    });
  }
}
