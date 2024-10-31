import { Cabine } from "../types/Cabines.ts";
import { Imagem } from "../types/Imagem.ts";
import { ItemSeminovo } from "../types/ItemSeminovo.ts";
import { Motor } from "../types/Motor.ts";
import { Preco } from "../types/Preco.ts";

class BarcoSeminovoDto {
    public id?: number
    public modelo: string;
    public nome: string;
    public ano: number;
    public tamanho: number;
    public motorizacao: Motor;
    public potenciaTotal: number;
    public combustivel: string;
    public propulsao: string;
    public cabines: Cabine;
    public procedencia: string;
    public destaque?: string;
    public preco: Preco;
    public imagens: Imagem[];
    public equipadoCom: ItemSeminovo[];
    public videoPromocional: string | null;

    constructor(
        modelo: string,
        nome: string,
        ano: number,
        tamanho: number,
        motorizacao: Motor,
        potenciaTotal: number,
        combustivel: string,
        propulsao: string,
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

export default BarcoSeminovoDto;

