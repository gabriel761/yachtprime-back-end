import { PrecoOutput } from "../Preco.js";

export type LocalEmbarqueOutput = {
    id: number;
    idPasseio: number;
    nomeLocal: string;
    pontoEncontro: string | null;
    preco: PrecoOutput | null;
}

export type LocalEmbarqueInput = {
    nomeLocal: string;
    pontoEncontro: string | null;
    preco: PrecoOutput | null;
}

export type LocalEmbarqueDb = {
    id: number;
    id_passeio: number;
    nome_local: string;
    ponto_encontro: string ;
    taxa_extra_valor: string ;
    taxa_extra_moeda: string ; 
}