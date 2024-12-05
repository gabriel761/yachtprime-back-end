import { CustomError } from "../../infra/CustoError.ts"
import { Preco } from "../../types/Preco.ts"
import { characterLimit, validateFloatPositiveNumber, validateIntegerPositiveNumber, validateString } from "../../util/validationUtil.ts"

export class PrecoInputVO {
    private id?: number
    private moeda!: string
    private valor!: number
    constructor(

    ) {

    }
    setMoeda(moeda: string) {
        validateString(moeda, "moeda", "preço")
        characterLimit(moeda, "moeda", 4, "preço")
        this.moeda = moeda
    }
    setValor(valor: number) {
        validateFloatPositiveNumber(valor, "valor", "Preço")
        this.valor = valor
    }
    setId(id:number){
        validateIntegerPositiveNumber(id,"id","Preço")
        this.id = id
    }
    extractData():Preco{
        return {
            id: this.id,
            valor: this.valor,
            moeda: this.moeda
        }
    }
}