
import { ItemSeminovoRepository } from "../../repository/seminovo/ItemSeminovoRepository.js"
import { ItemSeminovo, ItemSeminovoInput } from "../../types/seminovo/ItemSeminovo.js"
import { ItemSeminovoInputVO } from "../../value_object/input/seminovo/ItemSeminovoInputVO.js"
import { ItemSeminovoOutputVO } from "../../value_object/output/seminovo/ItemSeminovoOutputVO.js"

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

    async listItemSeminovo (itemSeminovoRepository: ItemSeminovoRepository){
      return  itemSeminovoRepository.listItemSeminovo()
    }

    async associateItemWithSeminovo(idBarcoSeminovo:number, itens:ItemSeminovo[], itemSeminovoRepository:ItemSeminovoRepository){
        for (let i = 0; i < itens.length; i++) {
            const item = itens[i];
            await itemSeminovoRepository.associateItemWithSeminovo(idBarcoSeminovo, item) 
        }
    }

    async deleteAllAssotiationsItemSeminovo(idBarcoSeminovo:number, itemSeminovoRepository: ItemSeminovoRepository){
        await itemSeminovoRepository.deleteAllAssociationItemSeminovo(idBarcoSeminovo)
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

    async insertItemSeminovo(itemSeminovo: ItemSeminovoInput,itemSeminovoRepository: ItemSeminovoRepository){
        await itemSeminovoRepository.insertItemSeminovo(itemSeminovo)
      }
}