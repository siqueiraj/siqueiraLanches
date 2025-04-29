import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PagamentoService } from '../../../services/pagamento.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-pagamento-form',
  standalone: true,
  templateUrl: './pagamento-form.component.html',
  styleUrls: ['./pagamento-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class PagamentoFormComponent implements OnInit {
  form!: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private pagamentoService: PagamentoService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      pedidoId: ['', Validators.required],
      valor: [null, [Validators.required, Validators.min(0)]]
    });

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.pagamentoService.findById(this.id).subscribe((pagamento) => {
        this.form.patchValue({
          pedidoId: pagamento.pedido?.id,
          valor: pagamento.valor
        });
      });
    }
  }

  submit(): void {
    if (this.form.valid) {
      const pagamento = {
        pedido: {
          id: this.form.value.pedidoId,
          comprador: {
            id: 0,
            nome: '',
            email: '',
            senha: '',
            tipo: 'CLIENTE'
          } as Usuario, 
          produtos: []
        },
        valor: this.form.value.valor
      };

      if (this.id) {
        this.pagamentoService.update(this.id, pagamento).subscribe(() => {
          this.router.navigate(['/pagamentos']);
        });
      } else {
        this.pagamentoService.save(pagamento).subscribe(() => {
          this.router.navigate(['/pagamentos']);
        });
      }
    }
  }
}
