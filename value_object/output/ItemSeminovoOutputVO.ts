import { CustomError } from "../../infra/CustoError.ts"
import { ItemSeminovo } from "../../types/ItemSeminovo.ts"
import { characterLimit, validateIntegerPositiveNumber, validateString } from "../../util/validationUtil.ts"

export class ItemSeminovoOutputVO {
    private item!: string
    private quantidade!: number
    private id?: number
    constructor(

    ) {

    }
    setItem(item: string) {
        this.item = item
    }
    setQuantidade(quantidade: number) {
        this.quantidade = quantidade
    }
    setId(id: number) {
        this.id = id
    }
    extractData(): ItemSeminovo{
        return{
            id: this.id,
            item: this.item,
            quantidade: this.quantidade
        }
    }
}