import { Produto } from './produto.model';

export interface Avaliacao {
  id: number;
  nota: number;
  comentario: string;
  produto?: Produto | null;
  usuario: {
    id: number;
  };
}
