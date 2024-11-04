import { Cabine } from "../types/Cabine.ts";
import { Combustivel } from "../types/Combustivel.ts";
import { Imagem } from "../types/Imagem.ts";
import { ItemSeminovo } from "../types/ItemSeminovo.ts";
import { Modelo } from "../types/Modelo.ts";
import { Motorizacao } from "../types/Motorizacao.ts";
import { Preco } from "../types/Preco.ts";
import { Propulsao } from "../types/Propulsao.ts";

export class BarcoSeminovoPersistenceDto {
    public id?: number
    public modelo: Modelo;
    public nome: string;
    public ano: number;
    public tamanho: number;
    public motorizacao: Motorizacao;
    public potenciaTotal: number;
    public combustivel: Combustivel;
    public propulsao: Propulsao;
    public cabines: Cabine;
    public procedencia: string;
    public destaque?: string;
    public preco: Preco;
    public imagens: Imagem[];
    public equipadoCom: ItemSeminovo[];
    public videoPromocional: string | null;

    constructor(
        modelo: Modelo,
        nome: string,
        ano: number,
        tamanho: number,
        motorizacao: Motorizacao,
        potenciaTotal: number,
        combustivel: Combustivel,
        propulsao: Propulsao,
        cabines: Cabine,
        procedencia: string,
        preco: Preco,
        imagens: Imagem[],
        equipadoCom: ItemSeminovo[],
        videoPromocional: string | null,
        id?: number,
        destaque?: string,
    ) {
        this.id = id
        this.modelo = modelo;
        this.nome = nome;
        this.ano = ano;
        this.tamanho = tamanho;
        this.motorizacao = motorizacao;
        this.potenciaTotal = potenciaTotal;
        this.combustivel = combustivel;
        this.propulsao = propulsao;
        this.cabines = cabines;
        this.procedencia = procedencia;
        this.destaque = destaque;
        this.preco = preco;
        this.imagens = imagens;
        this.equipadoCom = equipadoCom;
        this.videoPromocional = videoPromocional;
    }
}


