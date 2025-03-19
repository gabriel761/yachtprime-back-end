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
}
