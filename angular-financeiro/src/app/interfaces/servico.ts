import { Chapa } from "./chapa";
import { Cliente } from "./cliente";

export interface Servico {
  id:number;
  nome: string;
  chapa: Chapa;
  cliente: Cliente;
  quantidade: string;
  valor_total_servico: number;
  created_at: string;
}
