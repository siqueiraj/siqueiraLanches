import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../services/pedido.service';
import { Pedido } from '../../../models/pedido.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarrinhoComponent } from '../../carrinho/carrinho/carrinho.component';

@Component({
  selector: 'app-pedido-list',
  standalone: true,
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class PedidoListComponent implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.pedidoService.listAll().subscribe(data => {
      this.pedidos = data;
    });
  }
  calcularTotal(pedido: Pedido): number {
    return pedido.itens.reduce((soma, item) =>
      soma + (Number(item.produto.preco) || 0) * item.quantidade, 0);
  }

  delete(id: number): void {
    this.pedidoService.delete(id).subscribe(() => {
      this.pedidos = this.pedidos.filter(p => p.id !== id);
    });
  }
}