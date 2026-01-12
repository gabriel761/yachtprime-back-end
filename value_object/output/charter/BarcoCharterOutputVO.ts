import { BarcoCharterDashboardOutput, BarcoCharterOutput, BarcoCharterOutputWithId } from "../../../types/charter/BarcoCharter.js";
import { PrecoOutput } from "../../../types/Preco.js";
import { Passageiros } from "../../../types/charter/Passageiros.js";
import { ItemCharter } from "../../../types/charter/ItemCharter.js";
import { Imagem } from "../../../types/Imagem.js";
import { ConsumoCombustivelOutput } from "../../../types/charter/ConsumoCombustivel.js";
import { TaxaChurrascoOutput } from "../../../types/charter/TaxaChurrasco.js";
import { RoteiroOutput } from "../../../types/charter/Roteiro.js";
import { PetFriendly } from "../../../types/charter/PetFriendly.js";
import { TipoPasseio } from "../../../types/charter/TipoPasseio.js";
import { TripulacaoSkipper } from "../../../types/charter/TripulacaoSkipper.js";

import { Condicao } from "../../../types/charter/Condicoes.js";
import { Proprietario } from "../../../types/Proprietario.js";

export class BarcoCharterOutputVO {
    private id!:number;
    private codigo!: string;
    private modelo!: string;
    private nome!: string | null;
    private ano!: number;
    private tamanho!: number;
    private cidade!: "Angra dos Reis" | "Rio de Janeiro";
    private preco!: PrecoOutput;
    private passageiros!: Passageiros;
    private roteiros!: RoteiroOutput[];
    private pernoite!: boolean;
    private petFriendly!: PetFriendly;
    private itensDisponiveis!: ItemCharter[];
    private imagens!: Imagem[];
    private consumoCombustivel!: ConsumoCombustivelOutput;
    private tipoPasseio!: TipoPasseio;
    private tripulacaoSkpper!: TripulacaoSkipper;
    private horaExtra!: PrecoOutput;
    private aluguelLancha!: PrecoOutput;
    private condicoes!: Condicao[];
    private taxaChurrasco!: TaxaChurrascoOutput;
    private videoPromocional!: string | null;

    constructor() { }

    setId(id:number){
        this.id = id
    }

    setCodigo(codigo: string){
        this.codigo = codigo
    }

    setModelo(modelo: string) {
        this.modelo = modelo;
    }

    setNome(nome: string | null) {
        this.nome = nome;
    }

    setAno(ano: number) {
        this.ano = ano;
    }

    setTamanho(tamanho: number) {
        this.tamanho = tamanho;
    }

    setCidade(cidade: "Angra dos Reis" | "Rio de Janeiro"){
        this.cidade = cidade
    }

    setPreco(preco: PrecoOutput) {
        this.preco = preco;
    }

    setPassageiros(passageiros: Passageiros) {
        this.passageiros = passageiros;
    }

    setRoteiros(roteiros: RoteiroOutput[]){
        this.roteiros = roteiros
    }

    setPernoite(pernoite: boolean) {
        this.pernoite = pernoite;
    }

    setPetFriendly(petFriendly: PetFriendly) {
        this.petFriendly = petFriendly;
    }

    setItensDisponiveis(itens: ItemCharter[]) {
        this.itensDisponiveis = itens;
    }

    setImagens(imagens: Imagem[]) {
        this.imagens = imagens;
    }

    setConsumoCombustivel(consumo: ConsumoCombustivelOutput) {
        this.consumoCombustivel = consumo;
    }


    setTripulacaoSkipper(tripulacaoSkipper: TripulacaoSkipper){
        this.tripulacaoSkpper = tripulacaoSkipper
    }

    setTipoPasseio(tipoPasseio: TipoPasseio) {
        this.tipoPasseio = tipoPasseio
    }

    setHoraExtra(horaExtra: PrecoOutput) {
        this.horaExtra = horaExtra;
    }

    setAluguelLancha(aluguelLancha: PrecoOutput) {
        this.aluguelLancha = aluguelLancha;
    }

    setCondicao(condicoes: Condicao[]){
        this.condicoes = condicoes
    }

    setTaxaChurrasco(taxa: TaxaChurrascoOutput) {
        this.taxaChurrasco = taxa;
    }

    setVideoPromocional(video: string | null) {
        this.videoPromocional = video;
    }

    extractData(): BarcoCharterOutputWithId {
        return {
            id: this.id,
            codigo: this.codigo,
            modelo: this.modelo,
            nome: this.nome,
            ano: this.ano,
            cidade: this.cidade,
            tamanho: this.tamanho,
            preco: this.preco,
            passageiros: this.passageiros,
            roteiros: this.roteiros,
            pernoite: this.pernoite,
            petFriendly: this.petFriendly,
            itensDisponiveis: this.itensDisponiveis,
            imagens: this.imagens,
            consumoCombustivel: this.consumoCombustivel,
            tipoPasseio: this.tipoPasseio,
            tripulacaoSkipper: this.tripulacaoSkpper,
            horaExtra: this.horaExtra,
            aluguelLancha: this.aluguelLancha,
            condicoes: this.condicoes,
            taxaChurrasco: this.taxaChurrasco,
            videoPromocional: this.videoPromocional
        };
    }
}
