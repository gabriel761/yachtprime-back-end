import { CustomError } from "../../../infra/CustoError.js";
import { ItemCharter } from "../../../types/charter/ItemCharter.js";
import { validateIntegerPositiveNumber, validateString } from "../../../util/validationUtil.js";

export class ItemCharterInputVO {
    private id!:number;
    private item!: string;
    private itemLazer!: boolean;
    private quantidade!: number;
    constructor() { }

    setId(id: number){
        validateIntegerPositiveNumber(id, "id", "item chater")
        this.id = id
    }

    setItem(item: string) {
       validateString(item, "Item", "ItemCharter")
        this.item = item;
    }

    setItemLazer(itemLazer: boolean) {
        console.log("item lazer:", itemLazer)
        console.log("item lazer typeof:", typeof itemLazer !== "boolean")
        if (typeof itemLazer !== "boolean") {
            throw new CustomError("Valor inválido para item de lazer", 400);
        }
        this.itemLazer = itemLazer;
    }

    setQuantidade(quantidade: number){
        validateIntegerPositiveNumber(quantidade, "quantidade", "Item charter")
        this.quantidade = quantidade
    }

    extractData(): ItemCharter {
        return {
            id: this.id,
            item: this.item,
            quantidade: this.quantidade,
            itemLazer: this.itemLazer
        };
    }
}
