
import { Combustivel } from "../Combustivel.js";
import { Imagem } from "../Imagem.js";
import { Modelo } from "../Modelo.js";
import { PrecoInput, PrecoOutput } from "../Preco.js";
import { Proprietario } from "../Proprietario.js";
import { Cabine } from "./Cabine.js";

import { ItemSeminovo } from "./ItemSeminovo.js";

import { Motorizacao } from "./Motorizacao.js";

import { Propulsao } from "./Propulsao.js";

export type BarcoSeminovoOutput = {
    id?: number
    modelo: string;
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
    preco: PrecoOutput;
    imagens: Imagem[];
    equipadoCom: ItemSeminovo[];
    videoPromocional?: string | null;
    oportunidade: boolean;
};

export type BarcoSeminovoOutputDashboard = {
    id?: number
    modelo: string;
    nome: string;
    ano: number;
    tamanho: number;
    motorizacao: Motorizacao;
    potenciaTotal: number;
    combustivel: Combustivel;
    propulsao: Propulsao;
    proprietario: Proprietario;
    cabines: Cabine;
    procedencia: string;
    destaque?: string | null;
    preco: PrecoOutput;
    imagens: Imagem[];
    equipadoCom: ItemSeminovo[];
    videoPromocional?: string | null;
    oportunidade: boolean;
};

export type BarcoSeminovoInput = {
    modelo: string;
    nome: string;
    ano: number;
    tamanho: number;
    motorizacao: Motorizacao;
    potenciaTotal: number;
    combustivel: Combustivel;
    propulsao: Propulsao;
    proprietario: Proprietario;
    cabines: Cabine;
    procedencia: string;
    destaque?: string | null;
    preco: PrecoInput;
    imagens: Imagem[];
    equipadoCom: ItemSeminovo[];
    videoPromocional?: string | null;
    oportunidade: boolean
};


export type BarcoSeminovoInputWithId = {
    id: number;
    modelo: string;
    nome: string;
    ano: number;
    tamanho: number;
    motorizacao: Motorizacao;
    potenciaTotal: number;
    combustivel: Combustivel;
    propulsao: Propulsao;
    cabines: Cabine;
    proprietario: Proprietario;
    procedencia: string;
    destaque?: string | null;
    preco: PrecoInput;
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
    video_barco?: string | null;

}

export type BarcoSeminovoDatabaseDashboard = {
    oportunidade: boolean;
    barco_id?: number;
    nome_barco: string;
    ano_barco: number;
    tamanho_barco: number;
    id_modelo: number;
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
    id_combustivel: number;
    tipo_combustivel: string;
    id_propulsao: number;
    tipo_propulsao: string;
    proprietario_id: number;
    proprietario_nome: string;
    proprietario_email: string;
    proprietario_telefone: string;
    capacidade_id: number;
    capacidade_passageiro: number;
    capacidade_tripulacao: number;
    procedencia: string;
    destaque: string;
    preco_id: number;
    preco: string;
    moeda_simbolo: string;
    video_barco?: string | null;

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
    page:number,
    limit: number
}

export type BarcoSeminovoRelated = {
    id:number,
    modelo: string,
    imagem: string,
    preco: string,
}