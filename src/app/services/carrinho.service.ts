import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';
import { CarrinhoItem } from '../models/carrinho.item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private itensCarrinho: CarrinhoItem[] = [];
  private carrinhoSubject = new BehaviorSubject<CarrinhoItem[]>([]);
  carrinhoObservable = this.carrinhoSubject.asObservable();

  getItens(): CarrinhoItem[] {
    return this.itensCarrinho;
  }

  adicionarProduto(produto: Produto): void {
    const item = this.itensCarrinho.find(i => i.produto.id === produto.id);
    if (item) {
      item.quantidade++;
    } else {
      this.itensCarrinho.push({ produto, quantidade: 1 });
    }
    this.atualizarObservable();
  }

  removerProduto(produto: Produto): void {
    const index = this.itensCarrinho.findIndex(i => i.produto.id === produto.id);
    if (index > -1) {
      this.itensCarrinho[index].quantidade--;
      if (this.itensCarrinho[index].quantidade <= 0) {
        this.itensCarrinho.splice(index, 1);
      }
    }
    this.atualizarObservable();
  }

  removerProdutoCompleto(produto: Produto): void {
    this.itensCarrinho = this.itensCarrinho.filter(i => i.produto.id !== produto.id);
    this.atualizarObservable();
  }

  limparCarrinho(): void {
    this.itensCarrinho = [];
    this.atualizarObservable();
  }

  getQuantidadeTotal(): number {
    return this.itensCarrinho.reduce((total, item) => total + item.quantidade, 0);
  }

  private atualizarObservable(): void {
    this.carrinhoSubject.next(this.itensCarrinho);
  }
}
