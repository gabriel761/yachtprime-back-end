import { Cabine } from "./Cabine.ts";
import { Combustivel } from "./Combustivel.ts";
import { Imagem } from "./Imagem.ts";
import { ItemSeminovo } from "./ItemSeminovo.ts";
import { Modelo } from "./Modelo.ts";
import { Motorizacao } from "./Motorizacao.ts";
import { Preco } from "./Preco.ts";
import { Propulsao } from "./Propulsao.ts";

export type BarcoSeminovoOutput = {
    id?: number
    modelo: Modelo;
    nome: string;
    ano: number;
    tamanho: number;
    motorizacao: Motorizacao;
    potenciaTotal: number;
    combustivel: Combustivel;
    propulsao: Propulsao;
    cabines: Cabine;
    procedencia: string;
    destaque?: string | null;
    preco: Preco;
    imagens: Imagem[];
    equipadoCom: ItemSeminovo[];
    videoPromocional?: string | null;
    oportunidade: boolean;
};


export type BarcoSeminovoInput = {
    modelo: Modelo;
    nome: string;
    ano: number;
    tamanho: number;
    motorizacao: Motorizacao;
    potenciaTotal: number;
    combustivel: Combustivel;
    propulsao: Propulsao;
    cabines: Cabine;
    procedencia: string;
    destaque?: string | null;
    preco: Preco;
    imagens: Imagem[];
    equipadoCom: ItemSeminovo[];
    videoPromocional?: string | null;
    oportunidade: boolean
};


export type BarcoSeminovoInputWithId = {
    id: number;
    modelo: Modelo;
    nome: string;
    ano: number;
    tamanho: number;
    motorizacao: Motorizacao;
    potenciaTotal: number;
    combustivel: Combustivel;
    propulsao: Propulsao;
    cabines: Cabine;
    procedencia: string;
    destaque?: string | null;
    preco: Preco;
    imagens: Imagem[];
    equipadoCom: ItemSeminovo[];
    videoPromocional?: string | null;
    oportunidade: boolean
};


export type BarcoSeminovoDatabase ={
    oportunidade: boolean;
    barco_id?: number;
    nome_barco: string;
    ano_barco: number;
    tamanho_barco: number;
    id_modelo:number;
    marca_modelo: string;
    modelo_modelo: string;
    quantidade_motorizacao: number;
    motorizacao_id: number;
    potencia_motorizacao: number;
    potencia_total: number;
    horas_motorizacao: number;
    ano_motorizacao: number;
    observacoes_motorizacao?: string;
    marca_motor: string;
    modelo_motor: string;
    id_combustivel:number;
    tipo_combustivel: string;
    id_propulsao:number;
    tipo_propulsao: string;
    capacidade_id:number;
    capacidade_passageiro: number;
    capacidade_tripulacao: number;
    procedencia: string;
    destaque: string;
    preco_id:number;
    preco: string;
    moeda_simbolo: string;
    video?: string | null;

}

export type BarcoSeminovoDashboardList = {
    id:number,
    modelo: string,
    imagem: string,
    nome: string,
    tamanho: number,
    ano: number,
    preco: {moeda: string, valor: number}
}

export type BarcoSeminovoFrontEndList = {
    id: number,
    modelo: string,
    imagem: string,
    tamanho: number,
    ano: number,
    potencia: number,
    combustivel: string,
    motorizacao: {quantidade:number, modelo:string}
}

export type BarcoSeminovoFilters = {
    modelo: string,
    oportunidade: boolean
}