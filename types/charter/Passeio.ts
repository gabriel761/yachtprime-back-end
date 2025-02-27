import { Condicao } from "./Condicoes.js";
import {  HorariosInput, HorariosOutput } from "./Horarios.js";
import {  LocalEmbarqueInput, LocalEmbarqueOutput } from "./LocalEmbarque.js";

export type PasseioOutput = {
    id: number;
    tipoPasseio: string;
    embarquePrincipal: LocalEmbarqueOutput;
    embarquesAlternativos: LocalEmbarqueOutput[];
    horarios: HorariosOutput[];
    condicoes: Condicao[];
    duracaoPasseio: number;
    tripulacaoSkipper: string;
}

export type PasseioInput = {
    tipoPasseio: string;
    embarquePrincipal: LocalEmbarqueInput;
    embarquesAlternativos: LocalEmbarqueInput[];
    horarios: HorariosInput[];
    condicoes: Condicao[];
    duracaoPasseio: number;
    tripulacaoSkipper: string;
}

export type PasseioDb = {
    id: number;
    tipo_passeio: string;
    embarque_principal_local: string;
    embarque_principal_ponto_encontro: string;
    embarque_principal_id: number;
    embarque_principal_id_passeio: number;
    duracao_passeio: number;
    tripulacao_skipper: string;
}