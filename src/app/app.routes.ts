import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

import { LoginFormComponent } from './components/login/login-form.component';
import { CardapioComponent } from './components/cardapio/cardapio/cardapio.component';
import { DashboardLayoutComponent } from './components/layout/dashboard-layout/dashboard-layout.component';

import { ProdutoListComponent } from './components/produto/produto-list/produto-list.component';
import { ProdutoFormComponent } from './components/produto/produto-form/produto-form.component';
import { PedidoListComponent } from './components/pedido/pedido-list/pedido-list.component';
import { PedidoFormComponent } from './components/pedido/pedido-form/pedido-form.component';
import { PagamentoListComponent } from './components/pagamento/pagamento-list/pagamento-list.component';
import { PagamentoFormComponent } from './components/pagamento/pagamento-form/pagamento-form.component';
import { AvaliacaoListComponent } from './components/avaliacao/avaliacao-list/avaliacao-list.component';
import { AvaliacaoFormComponent } from './components/avaliacao/avaliacao-form/avaliacao-form.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './components/usuario/usuario-form/usuario-form.component';
import { CarrinhoComponent } from './components/carrinho/carrinho/carrinho.component';

export const routes: Routes = [
  
    {path: 'login', component: LoginFormComponent },
    {path: '',component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'cardapio', pathMatch: 'full' },

      
      { path: 'cardapio', component: CardapioComponent },

      { path: 'produto', component: ProdutoListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
      { path: 'produto/novo', component: ProdutoFormComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
      { path: 'produto/editar/:id', component: ProdutoFormComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },

      { path: 'pedido', component: PedidoListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
      { path: 'pedido/novo', component: PedidoFormComponent, canActivate: [AuthGuard], data: { roles: ['USUARIO', 'ADMIN'] } },
      { path: 'pedido/editar/:id', component: PedidoFormComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },

      { path: 'pagamento', component: PagamentoListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
      { path: 'pagamento/:id', component: PagamentoFormComponent, canActivate: [AuthGuard], data: { roles: ['USUARIO', 'ADMIN'] } },
      { path: 'pagamento/editar/:id', component: PagamentoFormComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },

      { path: 'avaliacao', component: AvaliacaoListComponent },
      { path: 'avaliacao/novo/:idProduto', component: AvaliacaoFormComponent, canActivate: [AuthGuard] },
      { path: 'avaliacao/editar/:id', component: AvaliacaoFormComponent, canActivate: [AuthGuard] },

      {path : 'carrinho', component: CarrinhoComponent},

      { path: 'usuario', component: UsuarioListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
      { path: 'usuario/novo', component: UsuarioFormComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
      { path: 'usuario/editar/:id', component: UsuarioFormComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
    ]
  }
];
