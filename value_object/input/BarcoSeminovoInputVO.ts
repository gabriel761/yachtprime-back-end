import { CustomError } from "../../infra/CustoError.ts";
import { BarcoSeminovoInput, BarcoSeminovoInputWithId } from "../../types/BarcoSeminovo.ts";
import { Cabine } from "../../types/Cabine.ts";
import { Combustivel } from "../../types/Combustivel.ts";
import { Imagem } from "../../types/Imagem.ts";
import { ItemSeminovo } from "../../types/ItemSeminovo.ts";
import { Modelo } from "../../types/Modelo.ts";
import { Motorizacao } from "../../types/Motorizacao.ts";
import { Preco } from "../../types/Preco.ts";
import { Propulsao } from "../../types/Propulsao.ts";
import { characterLimit, validateIntegerPositiveNumber, validateString, validateYear } from "../../util/validationUtil.ts";

export class BarcoSeminovoInputVO {
    private id!: number
    private modelo!: Modelo;
    private nome!: string;
    private ano!: number;
    private tamanho!: number;
    private motorizacao!: Motorizacao;
    private potenciaTotal!: number;
    private combustivel!: Combustivel;
    private propulsao!: Propulsao;
    private cabines!: Cabine;
    private procedencia!: string;
    private destaque!: string | null;
    private preco!: Preco;
    private imagens!: Imagem[];
    private equipadoCom!: ItemSeminovo[];
    private videoPromocional?: string | null;

    constructor(
    ) { }
    setId(id: number) {
        validateIntegerPositiveNumber(id,"id", "BarcoSeminovo")
        this.id = id
    }
    setModelo(modelo: Modelo) {
        if (!modelo) throw new CustomError("Modelo em barco seminovo é inválido", 400)
        this.modelo = modelo
    }
    setNome(nome: string) {
        validateString(nome, "nome", "BarcoSeminovo")
        characterLimit(nome,"nome", 100, "barco seminovo")
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
    setProcedencia(procedencia: string) {
        if (!procedencia || typeof procedencia != "string") throw new CustomError("Procedência de barco seminovo é inválido", 400)
        characterLimit(procedencia,"procedência", 50, "barco seminovo")
        this.procedencia = procedencia
    }
    setDestaque(destaque?: string | null) {
        if (!!destaque && typeof destaque != "string") throw new CustomError("Destaque de barco seminovo é inválido", 400)
        if(!!destaque){
            characterLimit(destaque, "destaque", 100, "barco seminovo")
            this.destaque = destaque
        }else{
            this.destaque = null
        }
    }
    setPreco(preco: Preco) {
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
    extractData():BarcoSeminovoInput{
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
            procedencia: this.procedencia,
            destaque: this.destaque,
            preco: this.preco,
            imagens: this.imagens,
            equipadoCom: this.equipadoCom,
            videoPromocional: this.videoPromocional
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
            procedencia: this.procedencia,
            destaque: this.destaque,
            preco: this.preco,
            imagens: this.imagens,
            equipadoCom: this.equipadoCom,
            videoPromocional: this.videoPromocional
        };
    }

}


