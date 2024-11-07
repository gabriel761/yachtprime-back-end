import { Propulsao } from "../../types/Propulsao.ts"
import { validateId, validateString } from "../../util/validationUtil.ts"

export class PropulsaoInputVO{
    private opcao!: string
    private id!: number
    constructor(
        
    ){}
    setOpcao(opcao:string){
        validateString(opcao, "opção", "propulsão")
        this.opcao = opcao
    }
    setId(id:number){
        validateId(id,"propulsão")
        this.id = id
    }
    extractData(): Propulsao {
        return {
            id: this.id,
            opcao: this.opcao
        }
    }
}