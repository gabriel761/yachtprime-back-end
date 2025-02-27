import { CustomError } from "../../../infra/CustoError.js"
import { Combustivel } from "../../../types/Combustivel.js"
import { characterLimit, validateIntegerPositiveNumber, validateString } from "../../../util/validationUtil.js"

export class CombustivelInputVO {
    private opcao!: string
    private id!: number
    constructor(
        
    ) { }

    setOpcao(opcao:string){
        validateString(opcao, "opção", "Combustível")
        characterLimit(opcao,"opção", 50, "Combustível")
        this.opcao = opcao
    }
    setId(id: number) {
        validateIntegerPositiveNumber(id,"id","Combustível")
        this.id = id
    }
    extractData(): Combustivel {
        return {
            id: this.id,
            opcao: this.opcao
        }
    }
}