import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../services/pedido.service';
import { Pedido } from '../../../models/pedido.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    this.loadPedidos();
  }

  loadPedidos(): void {
    this.pedidoService.listAll().subscribe((data) => {
      this.pedidos = data;
    });
  }

  delete(id: number): void {
    this.pedidoService.delete(id).subscribe(() => {
      this.loadPedidos();
    });
  }
}
