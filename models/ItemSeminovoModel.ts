import { ItemSeminovoDto } from "../dto/ItemSeminovoDto.ts"

interface itemSeminovoDatabase {
    nome_item: string,
    quantidade_item: number
}

export class ItemSeminovoModel {
    constructor() {

    }
    buildItemSeminovoDtoCollectionFromDatabase(itens:[]) {
       const itensDtoCollection = itens.map((item: itemSeminovoDatabase) => {
            return new ItemSeminovoDto(item.nome_item, item.quantidade_item)
        })
       return itensDtoCollection
    }
    buildItemSeminovoDtoFromClient() {

    }
}