import { Cabine } from "./Cabine.ts";
import { Combustivel } from "./Combustivel.ts";
import { Imagem } from "./Imagem.ts";
import { ItemSeminovo } from "./ItemSeminovo.ts";
import { Modelo } from "./Modelo.ts";
import { Motorizacao } from "./Motorizacao.ts";
import { Preco } from "./Preco.ts";
import { Propulsao } from "./Propulsao.ts";

export type BarcoSeminovoPersistence = {
    id?: number
    modelo: Modelo;
    nome: string;
    ano: number;
    tamanho: number;
    motorizacao: Motorizacao;
    potenciaTotal: number;
    combustivel: Combustivel;
    propulsao: Propulsao;
    cabines: Cabine;
    procedencia: string;
    destaque: string;
    preco: Preco;
    imagens: Imagem[];
    equipadoCom: ItemSeminovo[];
    videoPromocional: string;
};
