import { CustomError } from "../../../infra/CustoError.js";
import { BarcoCharterOutput } from "../../../types/charter/BarcoCharter.js";
import { PrecoOutput } from "../../../types/Preco.js";
import { Passageiros } from "../../../types/charter/Passageiros.js";
import { ItemCharter } from "../../../types/charter/ItemCharter.js";
import { Imagem } from "../../../types/Imagem.js";
import { ConsumoCombustivelOutput } from "../../../types/charter/ConsumoCombustivel.js";
import { TaxaChurrascoOutput } from "../../../types/charter/TaxaChurrasco.js";
import { characterLimit, validateIntegerPositiveNumber, validateString, validateYear } from "../../../util/validationUtil.js";
import { RoteiroOutput } from "../../../types/charter/Roteiro.js";
import { PetFriendly } from "../../../types/charter/PetFriendly.js";
import { TipoPasseio } from "../../../types/charter/TipoPasseio.js";
import { TripulacaoSkipper } from "../../../types/charter/TripulacaoSkipper.js";

export class BarcoCharterOutputVO {
    private id!:number;
    private modelo!: string;
    private nome!: string | null;
    private ano!: number;
    private tamanho!: number;
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
    private taxaChurrasco!: TaxaChurrascoOutput;
    private videoPromocional!: string | null;

    constructor() { }

    setId(id:number){
        this.id = id
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

    setTaxaChurrasco(taxa: TaxaChurrascoOutput) {
        this.taxaChurrasco = taxa;
    }

    setVideoPromocional(video: string | null) {
        this.videoPromocional = video;
    }

    extractData(): BarcoCharterOutput {
        return {
            id: this.id,
            modelo: this.modelo,
            nome: this.nome,
            ano: this.ano,
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
            taxaChurrasco: this.taxaChurrasco,
            videoPromocional: this.videoPromocional
        };
    }
}
