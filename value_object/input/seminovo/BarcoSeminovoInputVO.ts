import { CustomError } from "../../../infra/CustoError.js";
import { BarcoSeminovoInput, BarcoSeminovoInputWithId } from "../../../types/seminovo/BarcoSeminovo.js";
import { Cabine } from "../../../types/seminovo/Cabine.js";
import { Combustivel } from "../../../types/Combustivel.js";
import { Imagem } from "../../../types/Imagem.js";
import { ItemSeminovo } from "../../../types/seminovo/ItemSeminovo.js";
import { Modelo } from "../../../types/Modelo.js";
import { Motorizacao } from "../../../types/seminovo/Motorizacao.js";
import { PrecoInput } from "../../../types/Preco.js";
import { Propulsao } from "../../../types/seminovo/Propulsao.js";
import { characterLimit, validateIntegerPositiveNumber, validateString, validateYear } from "../../../util/validationUtil.js";
import { Proprietario } from "../../../types/Proprietario.js";

export class BarcoSeminovoInputVO {
    private id!: number
    private modelo!: string;
    private nome!: string;
    private ano!: number;
    private tamanho!: number;
    private motorizacao!: Motorizacao;
    private potenciaTotal!: number;
    private combustivel!: Combustivel;
    private propulsao!: Propulsao;
    private cabines!: Cabine;
    private proprietario!: Proprietario;
    private procedencia!: string;
    private destaque!: string | null;
    private preco!: PrecoInput;
    private imagens!: Imagem[];
    private equipadoCom!: ItemSeminovo[];
    private videoPromocional?: string | null;
    private oportunidade!: boolean

    constructor(
    ) { }
    setId(id: number) {
        validateIntegerPositiveNumber(id, "id", "BarcoSeminovo")
        this.id = id
    }
    setModelo(modelo: string) {
        if (!modelo) throw new CustomError("Modelo em barco seminovo é inválido", 400)
        this.modelo = modelo
    }
    setNome(nome: string) {
        validateString(nome, "nome", "BarcoSeminovo")
        characterLimit(nome, "nome", 100, "barco seminovo")
        this.nome = nome
    }
    setAno(ano: number) {
        validateYear(ano, "BarcoSeminovo")
        this.ano = ano
    }
    setTamanho(tamanho: number) {
        if (!tamanho || tamanho < 0 || typeof tamanho != "number") throw new CustomError("Tamanho barco seminovo é inválido", 400)
        this.tamanho = tamanho
    }
    setMotorizacao(motorizacao: Motorizacao) {
        if (!motorizacao) throw new CustomError("Motorização em barco seminovo é inválido", 400)
        this.motorizacao = motorizacao
    }
    setPotenciaTotal(potenciaTotal: number) {
        if (!potenciaTotal || potenciaTotal < 0 || typeof potenciaTotal != "number") throw new CustomError("Potência total barco seminovo é inválido", 400)
        this.potenciaTotal = potenciaTotal
    }
    setCombustivel(combustivel: Combustivel) {
        if (!combustivel) throw new CustomError("Combustível em barco seminovo é inválido", 400)
        this.combustivel = combustivel
    }
    setPropulsao(propulsao: Propulsao) {
        if (!propulsao) throw new CustomError("Propulsão em barco seminovo é inválido", 400)
        this.propulsao = propulsao
    }
    setCabine(cabine: Cabine) {
        if (!cabine) throw new CustomError("Cabine em barco seminovo é inválido", 400)
        this.cabines = cabine
    }
    setProprietario(proprietario: Proprietario){
        if (!proprietario) throw new CustomError("Proprietario em barco seminovo é inválido", 400)
        this.proprietario = proprietario
    }
    setProcedencia(procedencia: string) {
        if (!procedencia || typeof procedencia != "string") throw new CustomError("Procedência de barco seminovo é inválido", 400)
        characterLimit(procedencia, "procedência", 50, "barco seminovo")
        this.procedencia = procedencia
    }
    setDestaque(destaque?: string | null) {
        if (!!destaque && typeof destaque != "string") throw new CustomError("Destaque de barco seminovo é inválido", 400)
        if (!!destaque) {
            characterLimit(destaque, "destaque", 100, "barco seminovo")
            this.destaque = destaque
        } else {
            this.destaque = null
        }
    }
    setPreco(preco: PrecoInput) {
        if (!preco) throw new CustomError("Preço em barco seminovo é inválido", 400)
        this.preco = preco
    }
    setImagens(imagens: Imagem[]) {
        if (!imagens) throw new CustomError("Imagens em barco seminovo é inválido ou está vazio", 400)
        this.imagens = imagens
    }
    setItens(itens: ItemSeminovo[]) {
        if (!itens) throw new CustomError("Itens em barco seminovo é inválido ou está vazio", 400)
        this.equipadoCom = itens
    }
    setVideoPromocional(video?: string | null) {
        if (!!video && typeof video != "string") throw new CustomError("Video promocional de barco seminovo é inválido", 400)
        this.videoPromocional = video
    }
    setOportunidade(oportunidade: boolean) {
        if (typeof oportunidade != "boolean") throw new CustomError("Oportunidade de barco seminovo é inválido", 400)
        this.oportunidade = oportunidade
    }
    extractData(): BarcoSeminovoInput {
        return {
            modelo: this.modelo,
            nome: this.nome,
            ano: this.ano,
            tamanho: this.tamanho,
            motorizacao: this.motorizacao,
            potenciaTotal: this.potenciaTotal,
            combustivel: this.combustivel,
            propulsao: this.propulsao,
            cabines: this.cabines,
            proprietario: this.proprietario,
            procedencia: this.procedencia,
            destaque: this.destaque,
            preco: this.preco,
            imagens: this.imagens,
            equipadoCom: this.equipadoCom,
            videoPromocional: this.videoPromocional,
            oportunidade: this.oportunidade
        };
    }
    extractDataWithId(): BarcoSeminovoInputWithId {
        return {
            id: this.id,
            modelo: this.modelo,
            nome: this.nome,
            ano: this.ano,
            tamanho: this.tamanho,
            motorizacao: this.motorizacao,
            potenciaTotal: this.potenciaTotal,
            combustivel: this.combustivel,
            propulsao: this.propulsao,
            cabines: this.cabines,
            proprietario: this.proprietario,
            procedencia: this.procedencia,
            destaque: this.destaque,
            preco: this.preco,
            imagens: this.imagens,
            equipadoCom: this.equipadoCom,
            videoPromocional: this.videoPromocional,
            oportunidade: this.oportunidade
        };
    }

}


