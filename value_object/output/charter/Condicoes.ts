import { Condicao } from "../../../types/charter/Condicoes.js"

export class CondicoesVO {

    private id!: number
    private opcao!: string

    constructor(){}

    setId(id:number){
        this.id = id
    }

    setOpcao(opcao: string) {
        this.opcao = opcao
    }

    extractData (): Condicao{
        return {
            id: this.id,
            opcao: this.opcao
        }
    }
}