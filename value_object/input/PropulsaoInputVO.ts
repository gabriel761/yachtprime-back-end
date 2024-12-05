import { Propulsao } from "../../types/Propulsao.ts"
import { validateIntegerPositiveNumber, validateString } from "../../util/validationUtil.ts"

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
        validateIntegerPositiveNumber(id, "id", "Propulsão")
        this.id = id
    }
    extractData(): Propulsao {
        return {
            id: this.id,
            opcao: this.opcao
        }
    }
}