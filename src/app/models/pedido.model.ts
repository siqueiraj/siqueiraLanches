import { Usuario } from './usuario.model';
import { Produto } from './produto.model';

export interface ItemPedido {
  id?: number;
  produto: Produto;
  quantidade: number;
}

export interface Pedido {
  id?: number;
  comprador: Usuario;
  itens: ItemPedido[];
  valorTotal: number;
}
