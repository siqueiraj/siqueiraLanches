import { Usuario } from './usuario.model';
import { Produto } from './produto.model';

export interface Pedido {
  id: number;
  comprador: Usuario;
  produtos: Produto[];
}
