import { Propulsao } from "../../types/Propulsao.js"
import { validateIntegerPositiveNumber, validateString } from "../../util/validationUtil.js"

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