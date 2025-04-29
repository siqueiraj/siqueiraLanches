import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/usuarios/login';
  private usuarioLogado: Usuario | null = null;

  constructor(private http: HttpClient) {
    const usuarioStorage = localStorage.getItem('usuario');
    if (usuarioStorage) {
      this.usuarioLogado = JSON.parse(usuarioStorage);
    }
  }

  login(email: string, senha: string): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, { email, senha }).pipe(
      tap((usuario: Usuario) => {
        this.usuarioLogado = usuario;
        localStorage.setItem('usuario', JSON.stringify(usuario));
      })
    );
  }

  logout(): void {
    this.usuarioLogado = null;
    localStorage.removeItem('usuario'); 
  }

  getUsuario(): Usuario | null {
    return this.usuarioLogado;
  }

  isLoggedIn(): boolean {
    return this.usuarioLogado != null;
  }
}
