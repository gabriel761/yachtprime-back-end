import { CustomError } from "../../../infra/CustoError.js";
import { RoteiroInput, RoteiroOutput } from "../../../types/charter/Roteiro.js";
import { PrecoInput } from "../../../types/Preco.js";
import { validateString } from "../../../util/validationUtil.js";

export class RoteiroInputVO {
    private idCharter?: number;
    private nome!: string;
    private descricao!: string;
    private preco!: PrecoInput;
    private detalhesPagamento!: string

    constructor(){

    }
    setIdCharter(idCharter: number){
        this.idCharter = idCharter 

    }
    setNome(nome:string){
        validateString(nome, "Nome", "Roteiro")
        this.nome = nome
    }

    setDescricao(descricao: string) {
        validateString(descricao, "Descrição", "Roteiro")
        this.descricao = descricao
    }
    setPreco(preco: PrecoInput) {
        if(!preco) throw new CustomError("Preco de roteiro inválido",400)
        this.preco = preco
    }
    setDetalhesPagamento(detalhesPagamento: string) {
        validateString(detalhesPagamento, "Detalhes pagamento", "Roteiro")
        this.detalhesPagamento = detalhesPagamento
    }

    extractData():RoteiroInput{
        return {
            nome: this.nome,
            descricao: this.descricao,
            preco: this.preco,
            detalhesPagamento: this.detalhesPagamento
        }
    }
}