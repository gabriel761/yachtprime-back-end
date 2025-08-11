import { PrecoInput, PrecoOutput} from "../Preco.js";

export type TaxaChurrascoInput = {
    id?:number
    preco: PrecoInput;
    mensagem: string;
}

export type TaxaChurrascoOutput = {
    preco: PrecoOutput;
    mensagem: string;
}

export type TaxaChurrascoDatabase = {
    id: number
    id_preco: number;
    mensagem: string;
}