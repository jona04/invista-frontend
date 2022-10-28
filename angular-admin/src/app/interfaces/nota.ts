import { Servico } from "./servico";

export interface Nota {
    id: number;
    desconto: number;
    servico: Servico [];
    obs: string;
}
