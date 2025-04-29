import { Produto } from './produto.model';

export interface CarrinhoItem {
    produto: Produto;
    quantidade: number;
}
