import { CustomError } from "../../infra/CustoError.ts"
import { Combustivel } from "../../types/Combustivel.ts"
import { characterLimit, validateIntegerPositiveNumber } from "../../util/validationUtil.ts"

export class CombustivelOutputVO {
    private opcao!: string
    private id!: number
    constructor(

    ) { }

    setOpcao(opcao: string) {
        this.opcao = opcao
    }
    setId(id: number) {
        
        this.id = id
    }
    extractData():Combustivel{
        return{
            id:this.id,
            opcao: this.opcao
        }
    }
}