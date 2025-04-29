import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.usuarioService.listAll().subscribe((data) => {
      this.usuarios = data;
    });
  }

  novoUsuario(): void {
    this.router.navigate(['/usuarios/form']);
  }

  editarUsuario(id: number): void {
    this.router.navigate(['/usuarios/form', id]);
  }

  delete(id: number): void {
    this.usuarioService.delete(id).subscribe(() => {
      this.loadUsuarios();
    });
  }
}
