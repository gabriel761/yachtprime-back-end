import { CustomError } from "../../../infra/CustoError.js"
import { ItemSeminovo } from "../../../types/seminovo/ItemSeminovo.js"
import { characterLimit, validateIntegerPositiveNumber, validateString } from "../../../util/validationUtil.js"

export class ItemSeminovoInputVO {
   private item!: string
   private quantidade!: number
   private id?: number
    constructor(
       
    ) {

    }
    setItem(item:string){
        validateString(item, "item", "item seminovo")
        characterLimit(item,"item", 100, "item seminovo")
        this.item = item
    }
    setQuantidade(quantidade: number){
        validateIntegerPositiveNumber(quantidade, "quantidade", "ItemSeminovo")
        this.quantidade = quantidade
    }
    setId(id?:number){
        if (!!id) validateIntegerPositiveNumber(id, "id", "Item de barco seminovo")
        this.id = id
    }
    extractData():ItemSeminovo{
        return{
            id:this.id,
            item:this.item,
            quantidade: this.quantidade
        }
    }
}