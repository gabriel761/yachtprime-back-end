import { PrecoInput, PrecoOutput } from "../Preco.js";


export type RoteiroInput = {
    idCharter?: number;
    nome: string;
    descricao: string;
    preco: PrecoInput;
    detalhesPagamento: string
} 

export type RoteiroOutput = {
    nome: string;
    descricao: string;
    preco: PrecoOutput;
    detalhesPagamento: string
} 

export type RoteiroDataBase = {
    id: number;
    nome: string;
    descricao: string;
    preco_valor: string;
    preco_id: number;
    preco_moeda: string;
    detalhes_pagamento: string
}