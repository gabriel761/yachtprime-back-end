import { CustomError } from "../../../infra/CustoError.js";
import { ItemCharterInput } from "../../../types/charter/ItemCharter.js";
import { validateIntegerPositiveNumber, validateString } from "../../../util/validationUtil.js";

export class ItemCharterInputVO {
    private item!: string;
    private itemLazer!: boolean;
    private quantidade!: number;
    constructor() { }


    setItem(item: string) {
       validateString(item, "Item", "ItemCharter")
        this.item = item;
    }

    setItemLazer(itemLazer: boolean) {
        if (typeof itemLazer !== "boolean") {
            throw new CustomError("Valor inválido para item de lazer", 400);
        }
        this.itemLazer = itemLazer;
    }

    extractData(): ItemCharterInput {
        return {
            item: this.item,
            quantidade: this.quantidade,
            itemLazer: this.itemLazer
        };
    }
}
