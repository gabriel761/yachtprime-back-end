import { CustomError } from "../../../infra/CustoError.js";
import { ItemCharterOutput } from "../../../types/charter/ItemCharter.js";

export class ItemCharterOutputVO {
    private id!: number;
    private item!: string;
    private itemLazer!: boolean;
    private quantidade!: number;

    constructor() { }

    setId(id: number) {
        this.id = id;
    }

    setItem(item: string) {
        this.item = item;
    }

    setItemLazer(itemLazer: boolean) {
        this.itemLazer = itemLazer;
    }

    extractData(): ItemCharterOutput {
        return {
            id: this.id,
            item: this.item,
            quantidade: this.quantidade,
            itemLazer: this.itemLazer
        };
    }
}
