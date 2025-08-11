import { TaxaChurrascoRepository } from "../../repository/charter/TaxaChurrascoRepo.js";
import { MoedaRepository } from "../../repository/MoedaRepository.js";
import { PrecoRepository } from "../../repository/PrecoRepository.js";
import { TaxaChurrascoInput } from "../../types/charter/TaxaChurrasco.js";
import { PrecoModel } from "../PrecoModel.js";

export class TaxaChurrascoModel {
    async saveTaxaChurrasco (taxaChurrasco: TaxaChurrascoInput, taxaChurrascoRepository: TaxaChurrascoRepository, precoModel: PrecoModel){

        const idPrecoChurrasco = await precoModel.savePreco(taxaChurrasco.preco, new PrecoRepository, new MoedaRepository())
        const idTaxaChurrasco = await taxaChurrascoRepository.insertTaxaChurrasco(taxaChurrasco.mensagem, idPrecoChurrasco)
        return idTaxaChurrasco
    }
    

    async updateTaxaChurrasco(taxaChurrasco: TaxaChurrascoInput, taxaChurrascoRepository: TaxaChurrascoRepository, precoModel: PrecoModel) {
        await precoModel.updatePreco(taxaChurrasco.preco,taxaChurrasco.preco.id, new PrecoRepository, new MoedaRepository())
         await taxaChurrascoRepository.updateTaxaChurrasco(taxaChurrasco.mensagem, taxaChurrasco.id)
    }

    async deleteTaxaChurrasco(idChurrasco: number, taxaChurrascoRepo: TaxaChurrascoRepository, precoRepository: PrecoRepository){
        const taxaChurrasco = await taxaChurrascoRepo.getTaxaChurrascoById(idChurrasco)
        await taxaChurrascoRepo.deleteTaxaChurrasco(idChurrasco)
        await precoRepository.deletePrecoById(taxaChurrasco.id_preco)
    }
}
