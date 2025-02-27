import { CustomError } from "../../../infra/CustoError.js";
import { BarcoCharterOutput } from "../../../types/charter/BarcoCharter.js";
import { PrecoOutput } from "../../../types/Preco.js";
import { Passageiros } from "../../../types/charter/Passageiros.js";
import { PasseioOutput } from "../../../types/charter/Passeio.js";
import { ItemCharterOutput } from "../../../types/charter/ItemCharter.js";
import { Imagem } from "../../../types/Imagem.js";
import { ConsumoCombustivelOutput } from "../../../types/charter/ConsumoCombustivel.js";
import { TaxaChurrascoOutput } from "../../../types/charter/TaxaChurrasco.js";
import { characterLimit, validateIntegerPositiveNumber, validateString, validateYear } from "../../../util/validationUtil.js";

export class BarcoCharterOutputVO {
    private modelo!: string;
    private nome!: string | null;
    private ano!: number;
    private tamanho!: number;
    private preco!: PrecoOutput;
    private passageiros!: Passageiros;
    private passeio!: PasseioOutput;
    private pernoite!: boolean;
    private petFriendly!: string;
    private itensDisponiveis!: ItemCharterOutput[];
    private imagens!: Imagem[];
    private consumoCombustivel!: ConsumoCombustivelOutput;
    private horaExtra!: PrecoOutput;
    private aluguelLancha!: PrecoOutput;
    private taxaChurrasco!: TaxaChurrascoOutput;
    private videoPromocional!: string | null;

    constructor() { }

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

    setPasseio(passeio: PasseioOutput) {
        this.passeio = passeio;
    }

    setPernoite(pernoite: boolean) {
        this.pernoite = pernoite;
    }

    setPetFriendly(petFriendly: string) {
        this.petFriendly = petFriendly;
    }

    setItensDisponiveis(itens: ItemCharterOutput[]) {
        this.itensDisponiveis = itens;
    }

    setImagens(imagens: Imagem[]) {
        this.imagens = imagens;
    }

    setConsumoCombustivel(consumo: ConsumoCombustivelOutput) {
        this.consumoCombustivel = consumo;
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
            modelo: this.modelo,
            nome: this.nome,
            ano: this.ano,
            tamanho: this.tamanho,
            preco: this.preco,
            passageiros: this.passageiros,
            passeio: this.passeio,
            pernoite: this.pernoite,
            petFriendly: this.petFriendly,
            itensDisponiveis: this.itensDisponiveis,
            imagens: this.imagens,
            consumoCombustivel: this.consumoCombustivel,
            horaExtra: this.horaExtra,
            aluguelLancha: this.aluguelLancha,
            taxaChurrasco: this.taxaChurrasco,
            videoPromocional: this.videoPromocional
        };
    }
}
