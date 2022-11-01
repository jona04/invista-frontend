import { Servico } from "./servico";

export interface Nota {
    id: number;
    numero: number;
    desconto: number;
    servico: Servico [];
    valor_total_nota: number;
    obs: string;
}
