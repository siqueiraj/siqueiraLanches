import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../../../services/produto.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent implements OnInit {
  form!: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      preco: [null, [Validators.required, Validators.min(0)]]
    });

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.produtoService.findById(this.id).subscribe((produto) => {
        this.form.patchValue(produto);
      });
    }
  }

  submit(): void {
    if (this.form.valid) {
      const produto = {
        ...this.form.value,
        preco: Number(this.form.value.preco)
      };

      if (this.id) {
        this.produtoService.update(this.id, produto).subscribe(() => {
          this.router.navigate(['/produto']);
        });
      } else {
        this.produtoService.save(produto).subscribe(() => {
          this.router.navigate(['/produto']);
        });
      }
    }
  }
}
