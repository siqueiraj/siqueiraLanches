import { Pedido } from './pedido.model';

export interface Pagamento {
  id: number;
  pedido?: Pedido;
  valor: number;
  formaPagamento: 'PIX' | 'CARTAO' | 'DINHEIRO';
}