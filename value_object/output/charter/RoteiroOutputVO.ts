import { RoteiroOutput } from "../../../types/charter/Roteiro.js";
import { PrecoInput, PrecoOutput } from "../../../types/Preco.js";

export class RoteiroOutputVO {
    private nome!: string;
    private descricao!: string;
    private preco!: PrecoOutput;
    private detalhesPagamento!: string

    constructor(){

    }
    setNome(nome:string){
        this.nome = nome
    }

    setDescricao(descricao: string) {
        this.descricao = descricao
    }
    setPreco(preco: PrecoOutput) {
        this.preco = preco
    }
    setDetalhesPagamento(detalhesPagamento: string) {
        this.detalhesPagamento = detalhesPagamento
    }

    extractData():RoteiroOutput{
        return {
            nome: this.nome,
            descricao: this.descricao,
            preco: this.preco,
            detalhesPagamento: this.detalhesPagamento
        }
    }
}