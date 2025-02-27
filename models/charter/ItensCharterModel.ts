import { ItensCharterRepository } from "../../repository/charter/ItensCharterRepository.js"
import { ItemCharter } from "../../types/charter/ItemCharter.js"

export class ItensCharterModel {
    async getItensCharter(idCharter: number, itensCharterRepo: ItensCharterRepository):Promise<ItemCharter[]>{
      const itensCharterDb =  await itensCharterRepo.getItensCharterByIdCharter(idCharter)
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
}