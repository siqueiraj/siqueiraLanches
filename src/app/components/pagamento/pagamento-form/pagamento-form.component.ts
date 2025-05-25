import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PagamentoService } from '../../../services/pagamento.service';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-pagamento-form',
  standalone: true,
  templateUrl: './pagamento-form.component.html',
  styleUrls: ['./pagamento-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class PagamentoFormComponent implements OnInit {
  form!: FormGroup;
  idPedido!: number;
  valor!: number;

  mensagemSucesso = '';

  constructor(
    private fb: FormBuilder,
    private pagamentoService: PagamentoService,
    private pedidoService: PedidoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idPedido = this.route.snapshot.params['id'];

    this.form = this.fb.group({
      pedidoId: [{ value: '', disabled: true }, Validators.required],
      valor: [{ value: '', disabled: true }, Validators.required],
      formaPagamento: ['', Validators.required]
    });

    if (this.idPedido) {
      this.pedidoService.findById(this.idPedido).subscribe(pedido => {
        this.form.patchValue({
          pedidoId: pedido.id,
          valor: pedido.valorTotal
        });
      });
    }
  }

  submit(): void {
    if (this.form.valid) {
      const pagamento = {
        pedidoId: this.idPedido,
        valor: this.form.get('valor')?.value,
        formaPagamento: this.form.get('formaPagamento')?.value
      };

      this.pagamentoService.save(pagamento).subscribe(() => {
        this.mensagemSucesso = '✅ Pagamento realizado com sucesso!';

        setTimeout(() => {
          this.router.navigate(['/cardapio']);
        }, 2000);
      });
    }
  }
}
