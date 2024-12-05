import { CustomError } from "../../infra/CustoError.ts"
import { Combustivel } from "../../types/Combustivel.ts"
import { characterLimit, validateIntegerPositiveNumber, validateString } from "../../util/validationUtil.ts"

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