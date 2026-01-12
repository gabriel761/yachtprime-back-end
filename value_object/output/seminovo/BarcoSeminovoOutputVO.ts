import { CustomError } from "../../../infra/CustoError.js";
import { BarcoSeminovoOutput, BarcoSeminovoOutputWithId } from "../../../types/seminovo/BarcoSeminovo.js";
import { Cabine } from "../../../types/seminovo/Cabine.js";
import { Combustivel } from "../../../types/Combustivel.js";
import { Imagem } from "../../../types/Imagem.js";
import { ItemSeminovo } from "../../../types/seminovo/ItemSeminovo.js";
import { Motorizacao } from "../../../types/seminovo/Motorizacao.js";
import { PrecoOutput } from "../../../types/Preco.js";
import { Propulsao } from "../../../types/seminovo/Propulsao.js";

export class BarcoSeminovoOutputVO {
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
    private procedencia!: string;
    private destaque?: string | null;
    private preco!: PrecoOutput;
    private imagens!: Imagem[];
    private equipadoCom!: ItemSeminovo[];
    private videoPromocional?: string | null;
    private oportunidade!: boolean

    constructor(
    ) { }
    setId(id: number) {
        this.id = id
    }
    setModelo(modelo: string) {
        this.modelo = modelo
    }
    setNome(nome: string) {
        this.nome = nome
    }
    setAno(ano: number) {
        this.ano = ano
    }
    setTamanho(tamanho: number) {
        this.tamanho = tamanho
    }
    setMotorizacao(motorizacao: Motorizacao) {
        this.motorizacao = motorizacao
    }
    setPotenciaTotal(potenciaTotal: number) {
        this.potenciaTotal = potenciaTotal
    }
    setCombustivel(combustivel: Combustivel) {
        this.combustivel = combustivel
    }
    setPropulsao(propulsao: Propulsao) {
        this.propulsao = propulsao
    }
    setCabine(cabine: Cabine) {
        this.cabines = cabine
    }
    setProcedencia(procedencia: string) {
        this.procedencia = procedencia
    }
    setDestaque(destaque: string | null) {
        if (!destaque) destaque = null
        this.destaque = destaque
    }
    setPreco(preco: PrecoOutput) {
        this.preco = preco
    }
    setImagens(imagens: Imagem[]) {
        this.imagens = imagens
    }
    setItens(itens: ItemSeminovo[]) {
        this.equipadoCom = itens
    }
    setVideoPromocional(video?: string | null) {
        if(!video) video = null
        this.videoPromocional = video
    }
    setOportunidade(oportunidade: boolean) {
        if (typeof oportunidade != "boolean") throw new CustomError("Oportunidade de barco seminovo é inválido", 400)
        this.oportunidade = oportunidade
    }

    extractData():BarcoSeminovoOutputWithId{
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
            videoPromocional: this.videoPromocional,
            oportunidade: this.oportunidade
        };
    }
}


