import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AvaliacaoService } from '../../../services/avaliacao.service';
import { Avaliacao } from '../../../models/avaliacao.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-avaliacao-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './avaliacao-form.component.html',
  styleUrl: './avaliacao-form.component.scss'
})
export class AvaliacaoFormComponent implements OnInit {
  form!: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private avaliacaoService: AvaliacaoService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nota: [null, [Validators.required]],
      comentario: ['', [Validators.required]]
    });

  const idProduto = this.route.snapshot.params['idProduto'];
  const idAvaliacao = this.route.snapshot.params['id'];

    if (this.id) {
      this.avaliacaoService.findById(this.id).subscribe((avaliacao) => {
        this.form.patchValue(avaliacao);
      });
    }
  }

  submit(): void {
    if (this.form.valid) {
      const idProduto = this.route.snapshot.params['idProduto'];
      const idAvaliacao = this.route.snapshot.params['id'];
  
      const avaliacao: Avaliacao = {
        ...this.form.value,
        produto: { id: Number(idProduto || 0) }
      };
  
      if (idAvaliacao) {
        this.avaliacaoService.update(Number(idAvaliacao), avaliacao).subscribe(() => {
          this.router.navigate(['/avaliacao']);
        });
      } else {
        this.avaliacaoService.save(avaliacao).subscribe(() => {
          this.router.navigate(['/avaliacao']);
        });
      }
    }
  }
}  