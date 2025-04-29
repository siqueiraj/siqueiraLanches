import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../../services/produto.service';
import { Produto } from '../../../models/produto.model';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.scss']
})
export class ProdutoListComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProdutos();
  }

  loadProdutos(): void {
    this.produtoService.listAll().subscribe((data) => {
      this.produtos = data;
    });
  }

  novoProduto(): void {
    this.router.navigate(['/produtos/form']);
  }

  editarProduto(id: number): void {
    this.router.navigate(['/produtos/form', id]);
  }

  delete(id: number): void {
    this.produtoService.delete(id).subscribe(() => {
      this.loadProdutos();
    });
  }
}
