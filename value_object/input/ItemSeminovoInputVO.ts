import { CustomError } from "../../infra/CustoError.ts"
import { ItemSeminovo } from "../../types/ItemSeminovo.ts"
import { characterLimit, validateId, validateString } from "../../util/validationUtil.ts"

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
        if(!quantidade || quantidade < 0 || typeof quantidade != "number") throw new CustomError("Quantidade de itens de barco seminovo inválida",403)
        this.quantidade = quantidade
    }
    setId(id?:number){
        if (!!id) validateId(id, "item de barco seminovo")
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