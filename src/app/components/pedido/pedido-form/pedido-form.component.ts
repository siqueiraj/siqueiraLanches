import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../../../services/pedido.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Produto } from '../../../models/produto.model';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-pedido-form',
  standalone: true,
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class PedidoFormComponent implements OnInit {
  form!: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      compradorId: ['', Validators.required],
      produtosIds: this.fb.array([])
    });

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.pedidoService.findById(this.id).subscribe((pedido) => {
        this.form.patchValue({
          compradorId: pedido.comprador.id
        });

        const produtosArray = this.form.get('produtosIds') as FormArray;
        pedido.produtos.forEach(produto => {
          produtosArray.push(new FormControl(produto.id));
        });
      });
    }
  }

  get produtosControls() {
    return (this.form.get('produtosIds') as FormArray).controls;
  }

  adicionarProduto(): void {
    (this.form.get('produtosIds') as FormArray).push(this.fb.control('', Validators.required));
  }

  removerProduto(index: number): void {
    (this.form.get('produtosIds') as FormArray).removeAt(index);
  }

  submit(): void {
    if (this.form.valid) {
      const pedido = {
        id: this.id ?? 0,
        comprador: {
          id: this.form.value.compradorId,
          nome: '',
          email: '',
          senha: '',
          tipo: 'CLIENTE'
        } as Usuario,
        produtos: this.form.value.produtosIds.map((id: number) => ({
          id,
          nome: '',
          descricao: '',
          valor: 0
        })) as Produto[]
      };

      if (this.id) {
        this.pedidoService.update(this.id, pedido).subscribe(() => {
          this.router.navigate(['/pedidos']);
        });
      } else {
        this.pedidoService.save(pedido).subscribe(() => {
          this.router.navigate(['/pedidos']);
        });
      }
    }
  }
}
