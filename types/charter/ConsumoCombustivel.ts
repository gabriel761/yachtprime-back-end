import { Combustivel } from "../Combustivel.js";
import { PrecoInput, PrecoOutput } from "../Preco.js";

export type ConsumoCombustivelInput = {
    id?:number,
    litrosHora: number;
    precoHora: PrecoInput;
    tipoCombustivel: Combustivel
}

export type ConsumoCombustivelOutput = {
    litrosHora: number;
    precoHora: PrecoOutput;
    tipoCombustivel: Combustivel
}