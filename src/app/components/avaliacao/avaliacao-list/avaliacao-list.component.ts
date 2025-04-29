import { Component, OnInit } from '@angular/core';
import { AvaliacaoService } from '../../../services/avaliacao.service';
import { Avaliacao } from '../../../models/avaliacao.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avaliacao-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './avaliacao-list.component.html',
  styleUrl: './avaliacao-list.component.scss'
})
export class AvaliacaoListComponent implements OnInit {
  avaliacoes: Avaliacao[] = [];

  constructor(private avaliacaoService: AvaliacaoService) {}

  ngOnInit(): void {
    this.loadAvaliacoes();
  }

  loadAvaliacoes(): void {
    this.avaliacaoService.listAll().subscribe(data => {
      this.avaliacoes = data;
    });
  }

  delete(id: number): void {
    this.avaliacaoService.delete(id).subscribe(() => {
      this.loadAvaliacoes();
    });
  }
}
