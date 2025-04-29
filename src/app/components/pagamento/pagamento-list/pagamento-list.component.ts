import { Component, OnInit } from '@angular/core';
import { PagamentoService } from '../../../services/pagamento.service';
import { Pagamento } from '../../../models/pagamento.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagamento-list',
  standalone: true,
  templateUrl: './pagamento-list.component.html',
  styleUrls: ['./pagamento-list.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class PagamentoListComponent implements OnInit {
  pagamentos: Pagamento[] = [];

  constructor(private pagamentoService: PagamentoService) {}

  ngOnInit(): void {
    this.loadPagamentos();
  }

  loadPagamentos(): void {
    this.pagamentoService.listAll().subscribe((data) => {
      this.pagamentos = data;
    });
  }

  delete(id: number): void {
    this.pagamentoService.delete(id).subscribe(() => {
      this.loadPagamentos();
    });
  }
}
