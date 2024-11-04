import { ItemSeminovoDto } from "../dto/ItemSeminovoDto.ts"
import { ItemSeminovoRepository } from "../repository/ItemSeminovoRepository.ts"
import { ItemSeminovo } from "../types/ItemSeminovo.ts"

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
            return new ItemSeminovoDto(item.nome_item, item.quantidade_item, item.item_id)
        })
       return itensDtoCollection
    }
    buildItemSeminovoDtoFromClient() {

    }
    async associateItemWithSeminovo(idBarcoSeminovo:number, itens:ItemSeminovo[], itemSeminovoRepository:ItemSeminovoRepository){
        for (let i = 0; i < itens.length; i++) {
            const item = itens[i];
            await itemSeminovoRepository.associateItemWithSeminovo(idBarcoSeminovo, item) 
        }
    }
}