import { Imagem } from "../Imagem.js";
import { PrecoInput, PrecoOutput } from "../Preco.js";
import { ConsumoCombustivelInput, ConsumoCombustivelOutput } from "./ConsumoCombustivel.js";
import {  ItemCharterInput, ItemCharterOutput } from "./ItemCharter.js";
import { Passageiros } from "./Passageiros.js";
import {  PasseioInput, PasseioOutput } from "./Passeio.js";
import { TaxaChurrascoInput, TaxaChurrascoOutput } from "./TaxaChurrasco.js";

export type BarcoCharterOutput = {
    modelo: string;
    nome: string | null;
    ano: number;
    tamanho: number;
    preco: PrecoOutput;
    passageiros: Passageiros;
    passeio: PasseioOutput;
    pernoite: boolean;
    petFriendly: string;
    itensDisponiveis: ItemCharterOutput[];
    imagens: Imagem[];
    consumoCombustivel: ConsumoCombustivelOutput;
    horaExtra: PrecoOutput;
    aluguelLancha: PrecoOutput;
    taxaChurrasco: TaxaChurrascoOutput;
    videoPromocional: String | null;
}

export type BarcoCharterInput = {
    modelo: string;
    nome: string | null;
    ano: number;
    tamanho: number;
    preco: PrecoInput;
    passageiros: Passageiros;
    passeio: PasseioInput;
    pernoite: boolean;
    petFriendly: string;
    itensDisponiveis: ItemCharterInput[];
    imagens: Imagem[];
    consumoCombustivel: ConsumoCombustivelInput;
    
    horaExtra: PrecoInput;
    aluguelLancha: PrecoInput;
    taxaChurrasco: TaxaChurrascoInput;
    videoPromocional: String | null
}


export type BarcoCharterDatabase = {
    id: number;
    nome: string | null;
    modelo_modelo: string;
    modelo_marca: string;
    ano: number;
    tamanho: number;
    preco_valor: string;
    preco_moeda: string;
    passageiros_passageiros: number;
    passageiros_pernoite: number | null;
    passageiros_tripulacao: number;
    pet_friendly: 'Não' | 'Pequeno porte' | 'Grande e pequeno porte';
    consumo_combustivel_litros: number;
    consumo_combustivel_tipo_combustivel: string;
    consumo_combustivel_valor: string;
    comsumo_combustivel_moeda: string;
    passeio_tipo_passeio: 'Day use' | 'Day use e pernoite';
    passeio_duracao_passeio: number;
    passeio_tripulacao_skipper: 'Tripulação inclusa' | 'Skipper incluso';
    passeio_id_passeio: number;
    preco_hora_extra_valor: string;
    preco_hora_extra_moeda: string;
    preco_aluguel_lancha_valor: string;
    preco_aluguel_lancha_moeda: string;
    taxa_churrasco_valor: string;
    taxa_churrasco_moeda: string;
    taxa_churrasco_mensagem: string;
    video_promocional: string | null;
};