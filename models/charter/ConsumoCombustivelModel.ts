import { ConsumoCombustivelRepo } from "../../repository/charter/ConsumoCombustivelRepo.js";
import { MoedaRepository } from "../../repository/MoedaRepository.js";
import { PrecoRepository } from "../../repository/PrecoRepository.js";
import { CombustivelRepository } from "../../repository/seminovo/CombustivelRepository.js";
import { ConsumoCombustivelInput } from "../../types/charter/ConsumoCombustivel.js";
import { PrecoModel } from "../PrecoModel.js";
import { CombustivelModel } from "../seminovo/CombustivelModel.js";

export class ConsumoCombustivelModel {
    async postConsumoCombustivel(consumoCombustivel: ConsumoCombustivelInput, consumoCombustivelRepo: ConsumoCombustivelRepo, precoModel: PrecoModel, tipoCombustivelModel: CombustivelModel):Promise<number> {
        const idPrecoHora = await precoModel.savePreco(consumoCombustivel.precoHora, new PrecoRepository(), new MoedaRepository())
        const idTipoCombustivel = await tipoCombustivelModel.getIdCombustivelByName(consumoCombustivel.tipoCombustivel, new CombustivelRepository())
        const idConsumoCombustivel = await consumoCombustivelRepo.insertComsumoCombustivel(consumoCombustivel, idPrecoHora, idTipoCombustivel)
        return idConsumoCombustivel
    }
}