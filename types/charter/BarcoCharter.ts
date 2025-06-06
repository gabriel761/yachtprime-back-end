import { Imagem } from "../Imagem.js";
import { PrecoInput, PrecoOutput } from "../Preco.js";
import { ConsumoCombustivelInput, ConsumoCombustivelOutput } from "./ConsumoCombustivel.js";
import {  ItemCharter } from "./ItemCharter.js";
import { Passageiros } from "./Passageiros.js";
import { Pernoite } from "./Pernoite.js";
import { PetFriendly } from "./PetFriendly.js";
import {  RoteiroOutput, RoteiroInput} from "./Roteiro.js";
import { TaxaChurrascoInput, TaxaChurrascoOutput } from "./TaxaChurrasco.js";
import { TipoPasseio } from "./TipoPasseio.js";
import { TripulacaoSkipper } from "./TripulacaoSkipper.js";

export type BarcoCharterOutput = {
    id:number;
    modelo: string;
    nome: string | null;
    ano: number;
    tamanho: number;
    preco: PrecoOutput;
    passageiros: Passageiros;
    roteiros: RoteiroOutput[];
    pernoite: boolean;
    petFriendly: PetFriendly;
    itensDisponiveis: ItemCharter[];
    imagens: Imagem[];
    consumoCombustivel: ConsumoCombustivelOutput;
    tipoPasseio: TipoPasseio;
    tripulacaoSkipper: TripulacaoSkipper;
    horaExtra: PrecoOutput;
    aluguelLancha: PrecoOutput;
    taxaChurrasco: TaxaChurrascoOutput;
    videoPromocional: string | null;
}

export type BarcoCharterInput = {
    modelo: string;
    nome: string | null;
    ano: number;
    tamanho: number;
    preco: PrecoInput;
    passageiros: Passageiros;
    roteiros: RoteiroInput[];
    pernoite: boolean;
    petFriendly: PetFriendly;
    itensDisponiveis: ItemCharter[];
    imagens: Imagem[];
    consumoCombustivel: ConsumoCombustivelInput;
    tipoPasseio: TipoPasseio;
    tripulacaoSkipper: TripulacaoSkipper;
    horaExtra: PrecoInput;
    aluguelLancha: PrecoInput;
    taxaChurrasco: TaxaChurrascoInput;
    videoPromocional: string  | null
}

export type BarcoCharterInputWithId = {
    id: number,
    modelo: string;
    nome: string | null;
    ano: number;
    tamanho: number;
    preco: PrecoInput;
    passageiros: Passageiros;
    roteiros: RoteiroInput[];
    pernoite: boolean;
    petFriendly: PetFriendly;
    itensDisponiveis: ItemCharter[];
    imagens: Imagem[];
    consumoCombustivel: ConsumoCombustivelInput;
    tipoPasseio: TipoPasseio;
    tripulacaoSkipper: TripulacaoSkipper;
    horaExtra: PrecoInput;
    aluguelLancha: PrecoInput;
    taxaChurrasco: TaxaChurrascoInput;
    videoPromocional: string | null
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
    pet_friendly_id: number;
    pet_friendly: 'Não' | 'Pequeno porte' | 'Grande e pequeno porte';
    consumo_combustivel_litros: number;
    consumo_combustivel_tipo_combustivel_id: number;
    consumo_combustivel_tipo_combustivel: string;
    consumo_combustivel_valor: string;
    comsumo_combustivel_moeda: string;
    tipo_passeio_id: number;
    tipo_passeio: 'Day use' | 'Day use e pernoite';
    tripulacao_skipper_id: number;
    tripulacao_skipper: 'Tripulação inclusa' | 'Skipper incluso';
    preco_hora_extra_valor: string;
    preco_hora_extra_moeda: string;
    preco_aluguel_lancha_valor: string;
    preco_aluguel_lancha_moeda: string;
    taxa_churrasco_valor: string;
    taxa_churrasco_moeda: string;
    taxa_churrasco_mensagem: string;
    video_promocional: string | null;
};