import { Endereco } from "./endereco.model";

export interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    tipo: 'ADMIN' | 'CLIENTE';
    endereco?: Endereco;
  }