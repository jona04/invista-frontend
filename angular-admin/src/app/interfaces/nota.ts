import { Servico } from "./servico";

export interface Nota {
    id: number;
    numero: number;
    desconto: number;
    cliente_nome: string;
    servico: Servico [];
    valor_total_nota: number;
    obs: string;
    created_at: string;
}
