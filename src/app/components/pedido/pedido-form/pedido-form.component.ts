import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../../../services/pedido.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PedidoTempService } from '../../../services/pedido-temp.service';
import { CarrinhoItem } from '../../../models/carrinho.item.model';
import { AuthService } from '../../../services/auth.service';
import { Pedido } from '../../../models/pedido.model';
import { Observable } from 'rxjs';
import { Produto } from '../../../models/produto.model';

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
  itens: CarrinhoItem[] = [];
  pedidoFinalizado = false;

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private pedidoTempService: PedidoTempService,
    private authService: AuthService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({});

    this.itens = this.pedidoTempService.itens;
    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.pedidoService.findById(this.id).subscribe((pedido) => {
        this.itens = pedido.itens.map((item: any) => ({
          produto: {
            id: item.produto.id,
            nome: item.produto.nome,
            descricao: item.produto.descricao,
            preco: item.produto.preco
          },
          quantidade: item.quantidade
        }));
      });
    }
  }

  get total(): number {
    return this.itens.reduce((soma, item) => soma + (Number(item.produto.preco) || 0) * item.quantidade, 0);
  }

  submit(): void {
    if (this.itens.length > 0) {
      const usuario = this.authService.getUsuario();
      if (!usuario) {
        alert('Usuário não logado.');
        return;
      }
  
      const pedidoDTO = {
        compradorId: usuario.id,
        itens: this.itens.map(item => ({
          produtoId: item.produto.id,
          quantidade: item.quantidade
        }))
      };
  
      console.log('Enviando pedido:', pedidoDTO);
  
      const operacao: Observable<Pedido> = this.id
        ? this.pedidoService.update(this.id, pedidoDTO)
        : this.pedidoService.save(pedidoDTO);
  
      operacao.subscribe({
        next: (pedidoSalvo) => {
          this.pedidoFinalizado = true;
          setTimeout(() => {
            this.router.navigate(['/pagamento', pedidoSalvo.id]); 
          }, 1500);
        },
        error: (err: any) => {
          console.error('Erro ao salvar pedido:', err);
          alert('Erro ao finalizar pedido. Verifique o console.');
        }
      });
    }
  }
  
}  