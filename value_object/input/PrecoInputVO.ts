import { CustomError } from "../../infra/CustoError.ts"
import { Preco } from "../../types/Preco.ts"
import { characterLimit, validateId, validateString } from "../../util/validationUtil.ts"

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
        if (!valor || valor < 0 || typeof valor != "number") throw new CustomError("Valor do preço inválido", 400)
        this.valor = valor
    }
    setId(id:number){
        validateId(id,"preço")
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