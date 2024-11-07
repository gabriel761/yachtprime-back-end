import { CustomError } from "../../infra/CustoError.ts";
import { BarcoSeminovoOutput } from "../../types/BarcoSeminovo.ts";
import { Cabine } from "../../types/Cabine.ts";
import { Combustivel } from "../../types/Combustivel.ts";
import { Imagem } from "../../types/Imagem.ts";
import { ItemSeminovo } from "../../types/ItemSeminovo.ts";
import { Modelo } from "../../types/Modelo.ts";
import { Motorizacao } from "../../types/Motorizacao.ts";
import { Preco } from "../../types/Preco.ts";
import { Propulsao } from "../../types/Propulsao.ts";

export class BarcoSeminovoOutputVO {
    private id?: number
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
    private destaque?: string | null;
    private preco!: Preco;
    private imagens!: Imagem[];
    private equipadoCom!: ItemSeminovo[];
    private videoPromocional?: string | null;

    constructor(
    ) { }
    setId(id?: number) {
        this.id = id
    }
    setModelo(modelo: Modelo) {
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
    setPreco(preco: Preco) {
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

    extractData():BarcoSeminovoOutput{
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

