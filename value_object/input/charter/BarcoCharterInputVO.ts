import { CustomError } from "../../../infra/CustoError.js";
import { BarcoCharterInput, BarcoCharterInputWithId } from "../../../types/charter/BarcoCharter.js";
import { PrecoInput } from "../../../types/Preco.js";
import { Passageiros } from "../../../types/charter/Passageiros.js";
import { ItemCharter } from "../../../types/charter/ItemCharter.js";
import { Imagem } from "../../../types/Imagem.js";
import { ConsumoCombustivelInput } from "../../../types/charter/ConsumoCombustivel.js";
import { TaxaChurrascoInput } from "../../../types/charter/TaxaChurrasco.js";
import { characterLimit, validateIntegerPositiveNumber, validateString, validateYear, validateUUID } from "../../../util/validationUtil.js";
import { RoteiroInput } from "../../../types/charter/Roteiro.js";
import { PetFriendly } from "../../../types/charter/PetFriendly.js";
import { TipoPasseio } from "../../../types/charter/TipoPasseio.js";
import { TripulacaoSkipper } from "../../../types/charter/TripulacaoSkipper.js";
import { Modelo } from "../../../types/Modelo.js";
import { Proprietario } from "../../../types/Proprietario.js";
import { Condicao } from "../../../types/charter/Condicoes.js";

export class BarcoCharterInputVO {
    private id!: number;
    private ativo!: boolean;
    private modelo!: string;
    private nome!: string;
    private ano!: number;
    private tamanho!: number;
    private cidade!: "Angra dos Reis" | "Rio de Janeiro";
    private preco!: PrecoInput;
    private passageiros!: Passageiros;
    private pernoite!: boolean;
    private petFriendly!: PetFriendly;
    private itensDisponiveis!: ItemCharter[];
    private imagens!: Imagem[];
    private consumoCombustivel!: ConsumoCombustivelInput;
    private proprietario!: Proprietario;
    private roteiros!: RoteiroInput[]
    private horaExtra!: PrecoInput;
    private tipoPasseio!: TipoPasseio;
    private tripulacaoSkipper!: TripulacaoSkipper;
    private aluguelLancha!: PrecoInput;
    private condicoes!: Condicao[]
    private taxaChurrasco!: TaxaChurrascoInput;
    private videoPromocional!: string | null;

    constructor() { }

    setId(id: number){
        validateIntegerPositiveNumber(id, "id", "BarcoCharterVO")
        this.id = id
    }

    setAtivo(ativo: boolean){
        if (typeof ativo != "boolean") new CustomError("Ativo em BarcoCharterDashboard é inválido", 403)
        this.ativo = ativo
    }

    setModelo(modelo: string) {
        validateString(modelo, "Modelo", "BarcoCharterVO")
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

    setCidade(cidade: "Angra dos Reis" | "Rio de Janeiro"){
        validateString(cidade, "cidade", "BarcoCharterVO")
        this.cidade = cidade
    }

    setPreco(preco: PrecoInput) {
        if (!preco) throw new CustomError("Preço em barco charter é inválido", 400);
        this.preco = preco;
    }

    setPassageiros(passageiros: Passageiros) {
        if (!passageiros) throw new CustomError("Passageiros em barco charter é inválido", 400);
        this.passageiros = passageiros;
    }

    setPernoite(pernoite: boolean) {
        if(typeof pernoite != "boolean") return
        this.pernoite = pernoite;
    }

    setPetFriendly(petFriendly: PetFriendly) {
        if (!petFriendly) throw new CustomError("Pet friendly em barco charter é inválido", 400);
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

    setRoteiros(roteiros: RoteiroInput[]){
        if (!roteiros || roteiros.length == 0) throw new CustomError("Roteiros em barco charter são inválidos", 400);
        this.roteiros = roteiros
    }

    setConsumoCombustivel(consumo: ConsumoCombustivelInput) {
        if (!consumo) throw new CustomError("Consumo de combustível em barco charter é inválido", 400);
        this.consumoCombustivel = consumo;
    }

    setProprietario(proprietario: Proprietario){
        if (!proprietario) throw new CustomError("Proprietário em barco charter é inválido", 400);
        this.proprietario = proprietario
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

    setTripulacaoSkipper(tripulacaoSkipper: TripulacaoSkipper){
        if (!tripulacaoSkipper) throw new CustomError("Tripulação Skipper em barco charter é inválido", 400);
        this.tripulacaoSkipper = tripulacaoSkipper

    }
    setTipoPasseio(tipoPasseio: TipoPasseio) {
        if (!tipoPasseio) throw new CustomError("Tipo passeio em barco charter é inválido", 400);
        this.tipoPasseio = tipoPasseio

    }
    setVideoPromocional(video: string | null) {
        if(video == '' || video == null) return
        validateString(video, "videoPromocional", "BarcoCharter");
        this.videoPromocional = video;
    }

    extractData(): BarcoCharterInput {
        return {
            ativo: this.ativo,
            modelo: this.modelo,
            nome: this.nome,
            ano: this.ano,
            tamanho: this.tamanho,
            cidade: this.cidade,
            preco: this.preco,
            passageiros: this.passageiros,
            pernoite: this.pernoite,
            petFriendly: this.petFriendly,
            itensDisponiveis: this.itensDisponiveis,
            proprietario: this.proprietario,
            imagens: this.imagens,
            roteiros: this.roteiros,
            consumoCombustivel: this.consumoCombustivel,
            horaExtra: this.horaExtra,
            tipoPasseio: this.tipoPasseio,
            tripulacaoSkipper: this.tripulacaoSkipper,
            aluguelLancha: this.aluguelLancha,
            taxaChurrasco: this.taxaChurrasco,
            condicoes: this.condicoes,
            videoPromocional: this.videoPromocional
        };
    }

    extractDataWhithId(): BarcoCharterInputWithId {
        return {
            id: this.id,
            ativo: this.ativo,
            modelo: this.modelo,
            nome: this.nome,
            ano: this.ano,
            tamanho: this.tamanho,
            cidade: this.cidade,
            preco: this.preco,
            passageiros: this.passageiros,
            pernoite: this.pernoite,
            petFriendly: this.petFriendly,
            itensDisponiveis: this.itensDisponiveis,
            imagens: this.imagens,
            roteiros: this.roteiros,
            consumoCombustivel: this.consumoCombustivel,
            proprietario: this.proprietario,
            horaExtra: this.horaExtra,
            tipoPasseio: this.tipoPasseio,
            tripulacaoSkipper: this.tripulacaoSkipper,
            aluguelLancha: this.aluguelLancha,
            condicoes: this.condicoes,
            taxaChurrasco: this.taxaChurrasco,
            videoPromocional: this.videoPromocional
        };
    }

}
