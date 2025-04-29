import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';
import { CarrinhoItem } from '../models/carrinho.item.model'; 

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private itens: CarrinhoItem[] = [];

  constructor() {}

  getItens(): CarrinhoItem[] {
    return this.itens;
  }

  adicionarProduto(produto: Produto) {
    const itemExistente = this.itens.find(item => item.produto.id === produto.id);

    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      this.itens.push({ produto, quantidade: 1 });
    }
  }

  removerProduto(produto: Produto) {
    const itemExistente = this.itens.find(item => item.produto.id === produto.id);

    if (itemExistente) {
      itemExistente.quantidade--;

      if (itemExistente.quantidade <= 0) {
        this.itens = this.itens.filter(item => item.produto.id !== produto.id);
      }
    }
  }

  removerProdutoCompleto(produto: Produto) {
    this.itens = this.itens.filter(item => item.produto.id !== produto.id);
  }

  limparCarrinho() {
    this.itens = [];
  }

  getTotal(): number {
    return this.itens.reduce((total, item) => total + (Number(item.produto.preco) || 0) * item.quantidade, 0);
  }  
}
