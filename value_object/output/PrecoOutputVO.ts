import { CustomError } from "../../infra/CustoError.js"
import { PrecoOutput } from "../../types/Preco.js"
import { characterLimit, validateIntegerPositiveNumber, validateString } from "../../util/validationUtil.js"

export class PrecoOutputVO {
    private id?: number
    private moeda!: string
    private valor!: string
    constructor(

    ) {

    }
    setMoeda(moeda: string) {
        this.moeda = moeda
    }
    setValor(valor: string) {
            this.valor = valor
       
    }
    setId(id: number) {
        this.id = id
    }
    extractData():PrecoOutput{
        return{
            id:this.id,
            moeda:this.moeda,
            valor:this.valor
        }
    }
}