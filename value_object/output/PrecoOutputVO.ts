import { CustomError } from "../../infra/CustoError.ts"
import { Preco } from "../../types/Preco.ts"
import { characterLimit, validateId, validateString } from "../../util/validationUtil.ts"

export class PrecoOutputVO {
    private id?: number
    private moeda!: string
    private valor!: number
    constructor(

    ) {

    }
    setMoeda(moeda: string) {
        this.moeda = moeda
    }
    setValor(valor: number | string) {
        if(typeof valor == "string") valor = parseFloat(valor)
        this.valor = valor
    }
    setId(id: number) {
        this.id = id
    }
    extractData():Preco{
        return{
            id:this.id,
            moeda:this.moeda,
            valor:this.valor
        }
    }
}