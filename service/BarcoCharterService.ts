import { BarcoCharterModel } from "../models/charter/BarcoCharterModel.js"
import { ConsumoCombustivelModel } from "../models/charter/ConsumoCombustivelModel.js"
import { ItensCharterModel } from "../models/charter/ItensCharterModel.js"
import { PassageirosModel } from "../models/charter/PassageirosModel.js"
import { PetFriendlyModel } from "../models/charter/PetFriendlyModel.js"
import { RoteiroModel } from "../models/charter/RoteiroModel.js"
import { TaxaChurrascoModel } from "../models/charter/TaxaChurrascoModel.js"
import { TipoPasseioModel } from "../models/charter/TipoPasseioModel.js"
import { TripulacaoSkipperModel } from "../models/charter/TripulacaoSkipperModel.js"
import { ImagemModel } from "../models/ImagemModel.js"
import { ModeloModel } from "../models/ModeloModel.js"
import { PrecoModel } from "../models/PrecoModel.js"
import { CombustivelModel } from "../models/seminovo/CombustivelModel.js"
import { BarcoCharterRepository } from "../repository/charter/BarcoCharterRepository.js"
import { ConsumoCombustivelRepo } from "../repository/charter/ConsumoCombustivelRepo.js"
import { ItensCharterRepository } from "../repository/charter/ItensCharterRepository.js"
import { PassageirosRepository } from "../repository/charter/PassageirosRepository.js"
import { PetFriendlyRepository } from "../repository/charter/PetFriendly.js"
import { RoteiroRepository } from "../repository/charter/RoteiroRepository.js"
import { TaxaChurrascoRepository } from "../repository/charter/TaxaChurrascoRepo.js"
import { TipoPasseioRepository } from "../repository/charter/TipoPasseioRepo.js"
import { TripulacaoSkipperRepository } from "../repository/charter/TripulacaoSkipperRepo.js"
import { ImagemRepository } from "../repository/ImagemRepository.js"
import { MoedaRepository } from "../repository/MoedaRepository.js"
import { PrecoRepository } from "../repository/PrecoRepository.js"
import { BarcoCharterInput, BarcoCharterInputWithId } from "../types/charter/BarcoCharter.js"
import { BarcoCharterInputVO } from "../value_object/input/charter/BarcoSeminovoInputVO.js"
import { ItemCharterInputVO } from "../value_object/input/charter/ItemCharterInputVO.js"
import { PassageirosInputVO } from "../value_object/input/charter/PassageirosInputVO.js"
import { RoteiroInputVO } from "../value_object/input/charter/RoteiroInputVO.js"
import { TaxaChurrascoInputVO } from "../value_object/input/charter/TaxaChurrascoInputVO.js"
import { ImagemInputVO } from "../value_object/input/ImagemInputVO.js"
import { PrecoInputVO } from "../value_object/input/PrecoInputVO.js"
import { BarcoCharterOutputVO } from "../value_object/output/charter/BarcoSeminovoOutputVO.js"
import { ConsumoCombustivelOutputVO } from "../value_object/output/charter/ConsumoCombustivelOutputVO.js"
import { PassageirosOutputVO } from "../value_object/output/charter/PassageirosOutputVO.js"
import { RoteiroOutputVO } from "../value_object/output/charter/RoteiroOutputVO.js"
import { TaxaChurrascoOutputVO } from "../value_object/output/charter/TaxaChurrascoOutputVO.js"
import { PrecoOutputVO } from "../value_object/output/PrecoOutputVO.js"


const barcoCharterModel = new BarcoCharterModel()
const itensCharterModel = new ItensCharterModel()
const imagemModel = new ImagemModel()
const precoModel = new PrecoModel()
const petFreindlyModel = new PetFriendlyModel()
const consumoCombustivelModel = new ConsumoCombustivelModel()
const taxaChurrasco = new TaxaChurrascoModel()
const passageirosModel = new PassageirosModel()
const roteiroModel = new RoteiroModel()
const tipoPasseioModel = new TipoPasseioModel()
const tripulacaoSkipperModel = new TripulacaoSkipperModel()
export class BarcoCharterService {

   async getBarcoCharterById(id: number) {
      const barcoCharterDatabase = await barcoCharterModel.getBarcoCharter(id, new BarcoCharterRepository())
      const itensCharterArray = await itensCharterModel.getItensCharter(id, new ItensCharterRepository())
      const imagensArray = await imagemModel.getImagesByIdCharter(id, new ImagemRepository())
      const roteirosArray = await roteiroModel.getRoteirosByIdCharter(id, new RoteiroRepository(), new RoteiroOutputVO(), new PrecoOutputVO())
      const barcoCharterResult = barcoCharterModel.buildBarcoCharterOutputObject(barcoCharterDatabase, new BarcoCharterOutputVO(), new PrecoOutputVO(), new PassageirosOutputVO(), new ConsumoCombustivelOutputVO, new TaxaChurrascoOutputVO(), itensCharterArray, imagensArray, roteirosArray)
      return barcoCharterResult
   }

   async postBarcoCharter(barcoCharter: BarcoCharterInput) {

      const barcoCharterValidated = barcoCharterModel.validateBarcoCharter(barcoCharter, new BarcoCharterInputVO(), new PrecoInputVO
         (), new PassageirosInputVO(), new TaxaChurrascoInputVO())
      const validatedImages = imagemModel.validateImages(barcoCharter.imagens, new ImagemInputVO())
      const validatedItensCharter = itensCharterModel.validateItensCharter(barcoCharter.itensDisponiveis, new ItemCharterInputVO())
      const validatedRoteiros = roteiroModel.validateRoteiro(barcoCharter.roteiros, new RoteiroInputVO())

      const idPrecoBarco = await precoModel.savePreco(barcoCharterValidated.preco, new PrecoRepository(), new MoedaRepository())
      const idPassageiros = await passageirosModel.savePassageiros(barcoCharterValidated.passageiros, new PassageirosRepository())
    
      const idConsumo = await consumoCombustivelModel.postConsumoCombustivel(barcoCharterValidated.consumoCombustivel, new ConsumoCombustivelRepo(), new PrecoModel(), new CombustivelModel())
      const idPrecoHoraExtra = await precoModel.savePreco(barcoCharterValidated.horaExtra, new PrecoRepository(), new MoedaRepository())
      const idPrecoAluguelLancha = await precoModel.savePreco(barcoCharterValidated.aluguelLancha, new PrecoRepository(), new MoedaRepository())
      const idTaxaChurrasco = await taxaChurrasco.saveTaxaChurrasco(barcoCharterValidated.taxaChurrasco, new TaxaChurrascoRepository(), new PrecoModel())
  
      const idBarcoCharter = await barcoCharterModel.saveBarcoCharter(barcoCharterValidated, new BarcoCharterRepository(), new ModeloModel(), idPrecoBarco, idPassageiros, barcoCharter.petFriendly.id, idConsumo, barcoCharter.tipoPasseio.id, barcoCharter.tripulacaoSkipper.id, idPrecoHoraExtra, idPrecoAluguelLancha, idTaxaChurrasco);

      await roteiroModel.saveRoteiro(idBarcoCharter, validatedRoteiros, new RoteiroRepository(), new PrecoModel())
      await imagemModel.insertImagensForCharter(validatedImages, idBarcoCharter, new ImagemRepository())
      await itensCharterModel.associateItemWithSeminovo(idBarcoCharter, validatedItensCharter, new ItensCharterRepository())

   }

   async updateBarcoCharter(barcoCharter: BarcoCharterInputWithId) {
      const {barcoCharterValidated, idConsumo} = await barcoCharterModel.validateBarcoCharterWithId(barcoCharter, new BarcoCharterInputVO(), new PrecoInputVO
         (), new PassageirosInputVO(), new TaxaChurrascoInputVO())

      console.log(barcoCharterValidated)
      const validatedImages = imagemModel.validateImages(barcoCharter.imagens, new ImagemInputVO())
      const validatedItensCharter = itensCharterModel.validateItensCharter(barcoCharter.itensDisponiveis, new ItemCharterInputVO())
      await precoModel.updatePreco(barcoCharterValidated.preco, barcoCharterValidated.preco.id, new PrecoRepository(), new MoedaRepository())
      await precoModel.updatePreco(barcoCharterValidated.horaExtra, barcoCharterValidated.horaExtra.id, new PrecoRepository(), new MoedaRepository())
      await precoModel.updatePreco(barcoCharterValidated.aluguelLancha, barcoCharterValidated.aluguelLancha.id, new PrecoRepository(), new MoedaRepository())

      await taxaChurrasco.updateTaxaChurrasco(barcoCharterValidated.taxaChurrasco, new TaxaChurrascoRepository(), new PrecoModel())
      
      passageirosModel.updatePassageiros(barcoCharterValidated.passageiros, new PassageirosRepository())
      
      consumoCombustivelModel.updateConsumoCombustivel(barcoCharterValidated.consumoCombustivel, new ConsumoCombustivelRepo(), new PrecoModel(), new CombustivelModel(), idConsumo)

      await barcoCharterModel.updateBarcoCharter(barcoCharterValidated, new BarcoCharterRepository(), new ModeloModel(), idConsumo );

      await imagemModel.deleteAllImagesFromCharter(barcoCharterValidated.id, new ImagemRepository())
      await itensCharterModel.deleteAllAssotiationsItemCharter(barcoCharterValidated.id, new ItensCharterRepository())
      await roteiroModel.deleteAllRoteirosFromCharter(barcoCharterValidated.id, new RoteiroRepository())
      await imagemModel.insertImagensForCharter(validatedImages, barcoCharterValidated.id, new ImagemRepository())
      await itensCharterModel.associateItemWithSeminovo(barcoCharterValidated.id, validatedItensCharter, new ItensCharterRepository())
      await roteiroModel.saveRoteiro(barcoCharterValidated.id, barcoCharterValidated.roteiros, new RoteiroRepository(), new PrecoModel())

   }
}

