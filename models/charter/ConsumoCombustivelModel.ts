import { ConsumoCombustivelRepo } from "../../repository/charter/ConsumoCombustivelRepo.js";
import { MoedaRepository } from "../../repository/MoedaRepository.js";
import { PrecoRepository } from "../../repository/PrecoRepository.js";
import { CombustivelRepository } from "../../repository/seminovo/CombustivelRepository.js";
import { ConsumoCombustivelInput } from "../../types/charter/ConsumoCombustivel.js";
import { converterPrecoBrasilParaEUA } from "../../util/transformationUtil.js";
import { PrecoModel } from "../PrecoModel.js";
import { CombustivelModel } from "../seminovo/CombustivelModel.js";

export class ConsumoCombustivelModel {
    async postConsumoCombustivel(consumoCombustivel: ConsumoCombustivelInput, consumoCombustivelRepo: ConsumoCombustivelRepo, precoModel: PrecoModel, tipoCombustivelModel: CombustivelModel):Promise<number> {
        const idPrecoHora = await precoModel.savePreco(consumoCombustivel.precoHora, new PrecoRepository(), new MoedaRepository())
        const idTipoCombustivel = await tipoCombustivelModel.getIdCombustivelByName(consumoCombustivel.tipoCombustivel.opcao, new CombustivelRepository())
        const idConsumoCombustivel = await consumoCombustivelRepo.insertComsumoCombustivel(consumoCombustivel, idPrecoHora, idTipoCombustivel)
        return idConsumoCombustivel
    }

    async updateConsumoCombustivel(consumoCombustivel: ConsumoCombustivelInput, consumoCombustivelRepo: ConsumoCombustivelRepo, precoModel: PrecoModel, tipoCombustivelModel: CombustivelModel, idConsumo: number): Promise<void> {
        const idPrecoHora = await consumoCombustivelRepo.getIdPrecoCombustivelByIdConsumo(idConsumo)
        consumoCombustivel.precoHora.valor = converterPrecoBrasilParaEUA(consumoCombustivel.precoHora.valor)
        await precoModel.updatePreco(consumoCombustivel.precoHora, idPrecoHora, new PrecoRepository(), new MoedaRepository())
        const idTipoCombustivel = await tipoCombustivelModel.getIdCombustivelByName(consumoCombustivel.tipoCombustivel.opcao, new CombustivelRepository())
        consumoCombustivelRepo.updateComsumoCombustivel(consumoCombustivel, idTipoCombustivel, idConsumo)
        
    }
}