
import { ItemSeminovoRepository } from "../repository/ItemSeminovoRepository.ts"
import { ItemSeminovo } from "../types/ItemSeminovo.ts"
import { ItemSeminovoInputVO } from "../value_object/input/ItemSeminovoInputVO.ts"
import { ItemSeminovoOutputVO } from "../value_object/output/ItemSeminovoOutputVO.ts"

interface itemSeminovoDatabase {
    item_id: number,
    nome_item: string,
    quantidade_item: number
}

export class ItemSeminovoModel {
    constructor() {

    }
    async getItensByIdSeminovo(idSeminovo:number, itemSeminovoRepository:ItemSeminovoRepository) {
        const itens = await itemSeminovoRepository.getItensSeminovoByIdSeminovo(idSeminovo)
       const itensDtoCollection = itens.map((item: itemSeminovoDatabase) => {
            const itemSeminovoOutputVO = new ItemSeminovoOutputVO()
            itemSeminovoOutputVO.setId(item.item_id)
            itemSeminovoOutputVO.setItem(item.nome_item)
            itemSeminovoOutputVO.setQuantidade(item.quantidade_item)
            return itemSeminovoOutputVO.extractData()
        })
       return itensDtoCollection
    }

    async associateItemWithSeminovo(idBarcoSeminovo:number, itens:ItemSeminovo[], itemSeminovoRepository:ItemSeminovoRepository){
        for (let i = 0; i < itens.length; i++) {
            const item = itens[i];
            await itemSeminovoRepository.associateItemWithSeminovo(idBarcoSeminovo, item) 
        }
    }

    validateItensSeminovo(itens: ItemSeminovo[], itemSeminovoVO: ItemSeminovoInputVO): ItemSeminovo [] {
        const validatedItems = itens.map((item) => {
            itemSeminovoVO.setId(item.id)
            itemSeminovoVO.setItem(item.item)
            itemSeminovoVO.setQuantidade(item.quantidade)
            return itemSeminovoVO.extractData()
        })
           return validatedItems
    }
}