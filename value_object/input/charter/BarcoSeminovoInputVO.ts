import { CustomError } from "../../../infra/CustoError.js";
import { BarcoCharterInput, BarcoCharterOutput } from "../../../types/charter/BarcoCharter.js";
import { PrecoInput } from "../../../types/Preco.js";
import { Passageiros } from "../../../types/charter/Passageiros.js";
import { PasseioInput } from "../../../types/charter/Passeio.js";
import { ItemCharterInput } from "../../../types/charter/ItemCharter.js";
import { Imagem } from "../../../types/Imagem.js";
import { ConsumoCombustivelInput } from "../../../types/charter/ConsumoCombustivel.js";
import { TaxaChurrascoInput } from "../../../types/charter/TaxaChurrasco.js";
import { characterLimit, validateIntegerPositiveNumber, validateString, validateYear } from "../../../util/validationUtil.js";

export class BarcoCharterInputVO {
    private modelo!: string;
    private nome!: string;
    private ano!: number;
    private tamanho!: number;
    private preco!: PrecoInput;
    private passageiros!: Passageiros;
    private passeio!: PasseioInput;
    private pernoite!: boolean;
    private petFriendly!: string;
    private itensDisponiveis!: ItemCharterInput[];
    private imagens!: Imagem[];
    private consumoCombustivel!: ConsumoCombustivelInput;
    private horaExtra!: PrecoInput;
    private aluguelLancha!: PrecoInput;
    private taxaChurrasco!: TaxaChurrascoInput;
    private videoPromocional!: string;

    constructor() { }

    setModelo(modelo: string) {
        validateString(modelo, "modelo", "BarcoCharter");
        this.modelo = modelo;
    }

    setNome(nome: string | null) {
        if(nome == null) return
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

    setPreco(preco: PrecoInput) {
        if (!preco) throw new CustomError("Preço em barco charter é inválido", 400);
        this.preco = preco;
    }

    setPassageiros(passageiros: Passageiros) {
        if (!passageiros) throw new CustomError("Passageiros em barco charter é inválido", 400);
        this.passageiros = passageiros;
    }

    setPasseio(passeio: PasseioInput) {
        if (!passeio) throw new CustomError("Passeio em barco charter é inválido", 400);
        this.passeio = passeio;
    }

    setPernoite(pernoite: boolean) {
        if(typeof pernoite != "boolean") return
        this.pernoite = pernoite;
    }

    setPetFriendly(petFriendly: string) {
        validateString(petFriendly, "petFriendly", "BarcoCharter");
        this.petFriendly = petFriendly;
    }

    setItensDisponiveis(itens: ItemCharterInput[]) {
        if (!itens) throw new CustomError("Itens disponíveis em barco charter são inválidos", 400);
        this.itensDisponiveis = itens;
    }

    setImagens(imagens: Imagem[]) {
        if (!imagens) throw new CustomError("Imagens em barco charter são inválidas", 400);
        this.imagens = imagens;
    }

    setConsumoCombustivel(consumo: ConsumoCombustivelInput) {
        if (!consumo) throw new CustomError("Consumo de combustível em barco charter é inválido", 400);
        this.consumoCombustivel = consumo;
    }

    setHoraExtra(horaExtra: PrecoInput) {
        if (!horaExtra) throw new CustomError("Hora extra em barco charter é inválida", 400);
        this.horaExtra = horaExtra;
    }

    setAluguelLancha(aluguelLancha: PrecoInput) {
        if (!aluguelLancha) throw new CustomError("Aluguel de lancha em barco charter é inválido", 400);
        this.aluguelLancha = aluguelLancha;
    }

    setTaxaChurrasco(taxa: TaxaChurrascoInput) {
        if (!taxa) throw new CustomError("Taxa de churrasco em barco charter é inválida", 400);
        this.taxaChurrasco = taxa;
    }

    setVideoPromocional(video: string | null) {
        if(video == null) return
        validateString(video, "videoPromocional", "BarcoCharter");
        this.videoPromocional = video;
    }

    extractData(): BarcoCharterInput {
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
