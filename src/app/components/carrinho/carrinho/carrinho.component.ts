import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Produto } from '../../../models/produto.model';
import { CarrinhoService } from '../../../services/carrinho.service';
import { CarrinhoItem } from '../../../models/carrinho.item.model';
import { PedidoTempService } from '../../../services/pedido-temp.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit {
  itens: CarrinhoItem[] = [];

  constructor(
    private carrinhoService: CarrinhoService,
    private pedidoTempService: PedidoTempService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listarItens();
  }

  listarItens() {
    this.itens = this.carrinhoService.getItens();
  }

  aumentarQuantidade(produto: Produto) {
    this.carrinhoService.adicionarProduto(produto);
    this.listarItens();
  }

  diminuirQuantidade(produto: Produto) {
    this.carrinhoService.removerProduto(produto);
    this.listarItens();
  }

  removerItem(produto: Produto) {
    this.carrinhoService.removerProdutoCompleto(produto);
    this.listarItens();
  }

  limparCarrinho() {
    this.carrinhoService.limparCarrinho();
    this.listarItens();
  }

  finalizarPedido(): void {
    if (this.itens.length === 0) return;
    this.pedidoTempService.itens = this.itens;
    this.carrinhoService.limparCarrinho();
    this.router.navigate(['/pedido/novo']);
  }

  get total(): number {
    return this.itens.reduce((soma, item) => soma + (Number(item.produto.preco) || 0) * item.quantidade, 0);
  }
}