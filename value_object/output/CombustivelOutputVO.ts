import { CustomError } from "../../infra/CustoError.js"
import { Combustivel } from "../../types/Combustivel.js"
import { characterLimit, validateIntegerPositiveNumber } from "../../util/validationUtil.js"

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