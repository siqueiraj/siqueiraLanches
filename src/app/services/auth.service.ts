import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, of } from 'rxjs';
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
    return this.http.post(this.apiUrl, { email, senha }, { responseType: 'text' }).pipe(
      switchMap((token: string) => {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const usuario: Usuario = {
          id: tokenPayload.id,
          nome: '',
          email: tokenPayload.sub,
          senha: '',
          tipo: tokenPayload.role === 'CLIENTE' ? 'USUARIO' : tokenPayload.role,
          token: token
        };
        this.usuarioLogado = usuario;
        localStorage.setItem('usuario', JSON.stringify(usuario));
        return of(usuario);
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

  hasRole(role: 'ADMIN' | 'USUARIO'): boolean {
    return this.usuarioLogado?.tipo === role;
  }
}
