import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CarrinhoService } from '../../../services/carrinho.service';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  totalCarrinho = 0;

  constructor(
    public authService: AuthService,
    private router: Router,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {
    this.totalCarrinho = this.carrinhoService.getQuantidadeTotal();
    this.carrinhoService.carrinhoObservable.subscribe(() => {
      this.totalCarrinho = this.carrinhoService.getQuantidadeTotal();
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
