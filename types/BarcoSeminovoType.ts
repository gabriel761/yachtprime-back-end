import { Cabine } from "./Cabine.ts";
import { Imagem } from "./Imagem.ts";
import { ItemSeminovo } from "./ItemSeminovo.ts";
import { Motor } from "./Motorizacao.ts";
import { Preco } from "./Preco.ts";

export type BarcoSeminovoType = {
    id?: number
    modelo: string;
    nome: string;
    ano: number;
    tamanho: number;
    motorizacao: Motor;
    potenciaTotal: number;
    combustivel: string;
    propulsao: string;
    cabines: Cabine;
    procedencia: string;
    destaque: string;
    preco: Preco;
    imagens: Imagem[];
    equipadoCom: ItemSeminovo[];
    videoPromocional: string;
};
