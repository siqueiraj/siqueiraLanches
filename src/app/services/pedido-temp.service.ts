import { Injectable } from '@angular/core';
import { CarrinhoItem } from '../models/carrinho.item.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoTempService {
  itens: CarrinhoItem[] = [];
}
