import { PrecoInput, PrecoOutput } from "../Preco.js";

export type ConsumoCombustivelInput = {
    litrosHora: number;
    precoHora: PrecoInput;
    tipoCombustivel: string
}

export type ConsumoCombustivelOutput = {
    litrosHora: number;
    precoHora: PrecoOutput;
    tipoCombustivel: string
}