import { CustomError } from "../../../infra/CustoError.js";
import { BarcoCharterOutput } from "../../../types/charter/BarcoCharter.js";
import { PrecoOutput } from "../../../types/Preco.js";
import { Passageiros } from "../../../types/charter/Passageiros.js";
import { Passeio } from "../../../types/charter/Passeio.js";
import { ItemCharter } from "../../../types/charter/ItemCharter.js";
import { Imagem } from "../../../types/Imagem.js";
import { ConsumoCombustivel } from "../../../types/charter/ConsumoCombustivel.js";
import { TaxaChurrasco } from "../../../types/charter/TaxaChurrasco.js";
import { characterLimit, validateIntegerPositiveNumber, validateString, validateYear } from "../../../util/validationUtil.js";

export class BarcoCharterInputVO {
    private modelo!: string;
    private nome!: string;
    private ano!: number;
    private tamanho!: number;
    private preco!: PrecoOutput;
    private passageiros!: Passageiros;
    private passeio!: Passeio;
    private pernoite!: string;
    private petFriendly!: string;
    private itensDisponiveis!: ItemCharter[];
    private imagens!: Imagem[];
    private consumoCombustivel!: ConsumoCombustivel;
    private horaExtra!: PrecoOutput;
    private aluguelLancha!: PrecoOutput;
    private taxaChurrasco!: TaxaChurrasco;
    private videoPromocional!: string;

    constructor() { }

    setModelo(modelo: string) {
        validateString(modelo, "modelo", "BarcoCharter");
        this.modelo = modelo;
    }

    setNome(nome: string) {
        validateString(nome, "nome", "BarcoCharter");
        characterLimit(nome, "nome", 100, "barco charter");
        this.nome = nome;
    }

    setAno(ano: number) {
        validateYear(ano, "BarcoCharter");
        this.ano = ano;
    }

    setTamanho(tamanho: number) {
        validateIntegerPositiveNumber(tamanho, "tamanho", "BarcoCharter");
        this.tamanho = tamanho;
    }

    setPreco(preco: PrecoOutput) {
        if (!preco) throw new CustomError("Preço em barco charter é inválido", 400);
        this.preco = preco;
    }

    setPassageiros(passageiros: Passageiros) {
        if (!passageiros) throw new CustomError("Passageiros em barco charter é inválido", 400);
        this.passageiros = passageiros;
    }

    setPasseio(passeio: Passeio) {
        if (!passeio) throw new CustomError("Passeio em barco charter é inválido", 400);
        this.passeio = passeio;
    }

    setPernoite(pernoite: string) {
        validateString(pernoite, "pernoite", "BarcoCharter");
        this.pernoite = pernoite;
    }

    setPetFriendly(petFriendly: string) {
        validateString(petFriendly, "petFriendly", "BarcoCharter");
        this.petFriendly = petFriendly;
    }

    setItensDisponiveis(itens: ItemCharter[]) {
        if (!itens) throw new CustomError("Itens disponíveis em barco charter são inválidos", 400);
        this.itensDisponiveis = itens;
    }

    setImagens(imagens: Imagem[]) {
        if (!imagens) throw new CustomError("Imagens em barco charter são inválidas", 400);
        this.imagens = imagens;
    }

    setConsumoCombustivel(consumo: ConsumoCombustivel) {
        if (!consumo) throw new CustomError("Consumo de combustível em barco charter é inválido", 400);
        this.consumoCombustivel = consumo;
    }

    setHoraExtra(horaExtra: PrecoOutput) {
        if (!horaExtra) throw new CustomError("Hora extra em barco charter é inválida", 400);
        this.horaExtra = horaExtra;
    }

    setAluguelLancha(aluguelLancha: PrecoOutput) {
        if (!aluguelLancha) throw new CustomError("Aluguel de lancha em barco charter é inválido", 400);
        this.aluguelLancha = aluguelLancha;
    }

    setTaxaChurrasco(taxa: TaxaChurrasco) {
        if (!taxa) throw new CustomError("Taxa de churrasco em barco charter é inválida", 400);
        this.taxaChurrasco = taxa;
    }

    setVideoPromocional(video: string) {
        validateString(video, "videoPromocional", "BarcoCharter");
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
