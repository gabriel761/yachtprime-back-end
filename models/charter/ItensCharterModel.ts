import { ItensCharterRepository } from "../../repository/charter/ItensCharterRepository.js"
import { ItemCharter } from "../../types/charter/ItemCharter.js"
import { ItemCharterInputVO } from "../../value_object/input/charter/ItemCharterInputVO.js"

export class ItensCharterModel {
  async getItensCharter(idCharter: number, itensCharterRepo: ItensCharterRepository): Promise<ItemCharter[]> {
    const itensCharterDb = await itensCharterRepo.getItensCharterByIdCharter(idCharter)
    const itensCharterArray = itensCharterDb.map((item) => {
      const itemResult: ItemCharter = {
        id: item.item_id,
        item: item.nome_item,
        itemLazer: item.item_lazer,
        quantidade: item.quantidade_item
      }
      return itemResult
    })
    return itensCharterArray
  }
  validateItensCharter(itensCharterArray: ItemCharter[], itensCharterVO: ItemCharterInputVO) {
    const validatedItems = itensCharterArray.map((item) => {
      itensCharterVO.setId(item.id)
      itensCharterVO.setItem(item.item)
      itensCharterVO.setItemLazer(item.itemLazer)
      itensCharterVO.setQuantidade(item.quantidade)
      return itensCharterVO.extractData()
    })
    return validatedItems
  }

  async deleteAllAssotiationsItemCharter(idBarcoCharter: number, itemCharterRepository: ItensCharterRepository) {
      await itemCharterRepository.deleteAssiciationOfItemWithCharter(idBarcoCharter)
  }

  async associateItemWithSeminovo(idBarcoCharter: number, itens: ItemCharter[], itemCharterRepository: ItensCharterRepository) {
    for (let i = 0; i < itens.length; i++) {
      const item = itens[i];
      await itemCharterRepository.associateItemWithCharter(idBarcoCharter, item)
    }
  }

}