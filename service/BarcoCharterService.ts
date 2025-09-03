import { BarcoCharterModel } from "../models/charter/BarcoCharterModel.js"
import { CidadeModel } from "../models/charter/CidadeModel.js"
import { CondicoesModel } from "../models/charter/CondicoesModel.js"
import { ConsumoCombustivelModel } from "../models/charter/ConsumoCombustivelModel.js"
import { ItensCharterModel } from "../models/charter/ItensCharterModel.js"
import { PassageirosModel } from "../models/charter/PassageirosModel.js"
import { RoteiroModel } from "../models/charter/RoteiroModel.js"
import { TaxaChurrascoModel } from "../models/charter/TaxaChurrascoModel.js"
import { FirebaseModel } from "../models/external/FirebaseModel.js"
import { ImagemModel } from "../models/ImagemModel.js"
import { ModeloModel } from "../models/ModeloModel.js"
import { PrecoModel } from "../models/PrecoModel.js"
import { CombustivelModel } from "../models/seminovo/CombustivelModel.js"
import { BarcoCharterRepository } from "../repository/charter/BarcoCharterRepository.js"
import { CidadeRepository } from "../repository/charter/CidadeRepository.js"
import { CondicoesRepository } from "../repository/charter/CondicoesRepository.js"
import { ConsumoCombustivelRepo } from "../repository/charter/ConsumoCombustivelRepo.js"
import { ItensCharterRepository } from "../repository/charter/ItensCharterRepository.js"
import { PassageirosRepository } from "../repository/charter/PassageirosRepository.js"
import { RoteiroRepository } from "../repository/charter/RoteiroRepository.js"
import { TaxaChurrascoRepository } from "../repository/charter/TaxaChurrascoRepo.js"
import { ImagemRepository } from "../repository/ImagemRepository.js"
import { MoedaRepository } from "../repository/MoedaRepository.js"
import { PrecoRepository } from "../repository/PrecoRepository.js"
import { BarcoCharterFilters, BarcoCharterInput, BarcoCharterInputWithId } from "../types/charter/BarcoCharter.js"
import { BarcoCharterInputVO } from "../value_object/input/charter/BarcoCharterInputVO.js"
import { ItemCharterInputVO } from "../value_object/input/charter/ItemCharterInputVO.js"
import { PassageirosInputVO } from "../value_object/input/charter/PassageirosInputVO.js"
import { RoteiroInputVO } from "../value_object/input/charter/RoteiroInputVO.js"
import { TaxaChurrascoInputVO } from "../value_object/input/charter/TaxaChurrascoInputVO.js"
import { ImagemInputVO } from "../value_object/input/ImagemInputVO.js"
import { ModeloInputVO } from "../value_object/input/ModeloInputVO.js"
import { PrecoInputVO } from "../value_object/input/PrecoInputVO.js"
import { BarcoCharterOutputVO } from "../value_object/output/charter/BarcoCharterOutputVO.js"
import { ConsumoCombustivelOutputVO } from "../value_object/output/charter/ConsumoCombustivelOutputVO.js"
import { PassageirosOutputVO } from "../value_object/output/charter/PassageirosOutputVO.js"
import { RoteiroOutputVO } from "../value_object/output/charter/RoteiroOutputVO.js"
import { TaxaChurrascoOutputVO } from "../value_object/output/charter/TaxaChurrascoOutputVO.js"
import { ModeloOutputVO } from "../value_object/output/ModeloOutputVO.js"
import { PrecoOutputVO } from "../value_object/output/PrecoOutputVO.js"


const barcoCharterModel = new BarcoCharterModel()
const itensCharterModel = new ItensCharterModel()
const imagemModel = new ImagemModel()
const precoModel = new PrecoModel()
const consumoCombustivelModel = new ConsumoCombustivelModel()
const taxaChurrascoModel = new TaxaChurrascoModel()
const passageirosModel = new PassageirosModel()
const roteiroModel = new RoteiroModel()
const cidadeModel = new CidadeModel()
const condicoesModel = new CondicoesModel()

export class BarcoCharterService {

   async getBarcoCharterById(id: number) {
      const barcoCharterDatabase = await barcoCharterModel.getBarcoCharter(id, new BarcoCharterRepository())
      const itensCharterArray = await itensCharterModel.getItensCharter(id, new ItensCharterRepository())
      const imagensArray = await imagemModel.getImagesByIdCharter(id, new ImagemRepository())
      const roteirosArray = await roteiroModel.getRoteirosByIdCharter(id, new RoteiroRepository(), new RoteiroOutputVO(), new PrecoOutputVO())
      const condicoesArray = await condicoesModel.getAllCondicoes(new CondicoesRepository())
      const barcoCharterResult = barcoCharterModel.buildBarcoCharterOutputObject(barcoCharterDatabase, new BarcoCharterOutputVO(), new PrecoOutputVO(), new PassageirosOutputVO(), new ModeloOutputVO, new ConsumoCombustivelOutputVO, new TaxaChurrascoOutputVO(), itensCharterArray, imagensArray, roteirosArray, condicoesArray)
      return barcoCharterResult
   }

   async listBarcoCharterDashboard() {
      const barcoCharterDashboardList = await barcoCharterModel.listBarcoCharterDashboard(new BarcoCharterRepository())
      return barcoCharterDashboardList
   }

   async listBarcoCharterFrontEnd(filters: any) {
      const barcoCharterDashboardList = await barcoCharterModel.listBarcoCharterFrontEnd(filters,new BarcoCharterRepository())
      return barcoCharterDashboardList
   }

   async getRelatedCharters(idCharter: number){
      const relatedCharters = await barcoCharterModel.getRelatedCharters(idCharter, new BarcoCharterRepository())
      return relatedCharters      
   }

   async postBarcoCharter(barcoCharter: BarcoCharterInput) {
      const barcoCharterValidated = barcoCharterModel.validateBarcoCharter(barcoCharter, new BarcoCharterInputVO(), new PrecoInputVO
         (), new PassageirosInputVO(), new ModeloInputVO(), new TaxaChurrascoInputVO())
      const validatedImages = imagemModel.validateImages(barcoCharter.imagens, new ImagemInputVO())
      const validatedItensCharter = itensCharterModel.validateItensCharter(barcoCharter.itensDisponiveis, new ItemCharterInputVO())
      const validatedRoteiros = roteiroModel.validateRoteiro(barcoCharter.roteiros, new RoteiroInputVO())

      const idPrecoBarco = await precoModel.savePreco(barcoCharterValidated.preco, new PrecoRepository(), new MoedaRepository())
      const idPassageiros = await passageirosModel.savePassageiros(barcoCharterValidated.passageiros, new PassageirosRepository())
      const idCidade = await cidadeModel.getIdCidadeByString(barcoCharter.cidade, new CidadeRepository())
      const idConsumo = await consumoCombustivelModel.postConsumoCombustivel(barcoCharterValidated.consumoCombustivel, new ConsumoCombustivelRepo(), new PrecoModel(), new CombustivelModel())
      const idPrecoHoraExtra = await precoModel.savePreco(barcoCharterValidated.horaExtra, new PrecoRepository(), new MoedaRepository())
      const idPrecoAluguelLancha = await precoModel.savePreco(barcoCharterValidated.aluguelLancha, new PrecoRepository(), new MoedaRepository())
      const idTaxaChurrasco = await taxaChurrascoModel.saveTaxaChurrasco(barcoCharterValidated.taxaChurrasco, new TaxaChurrascoRepository(), new PrecoModel())

      
      const idBarcoCharter = await barcoCharterModel.saveBarcoCharter(barcoCharterValidated, new BarcoCharterRepository(), new ModeloModel(), idPrecoBarco, idPassageiros, idCidade, barcoCharter.petFriendly.id, idConsumo, barcoCharter.tipoPasseio.id, barcoCharter.tripulacaoSkipper.id, idPrecoHoraExtra, idPrecoAluguelLancha, idTaxaChurrasco);

      await roteiroModel.saveRoteiro(idBarcoCharter, validatedRoteiros, new RoteiroRepository(), new PrecoModel())
      await imagemModel.insertImagensForCharter(validatedImages, idBarcoCharter, new ImagemRepository())
      await itensCharterModel.associateItemWithSeminovo(idBarcoCharter, validatedItensCharter, new ItensCharterRepository())
   }

   async updateBarcoCharter(barcoCharter: BarcoCharterInputWithId) {
      const { barcoCharterValidated, idConsumo } = await barcoCharterModel.validateBarcoCharterWithId(barcoCharter, new BarcoCharterInputVO(), new PrecoInputVO
         (), new PassageirosInputVO(), new ModeloInputVO(), new TaxaChurrascoInputVO())
      const validatedImages = imagemModel.validateImages(barcoCharter.imagens, new ImagemInputVO())
      const validatedItensCharter = itensCharterModel.validateItensCharter(barcoCharter.itensDisponiveis, new ItemCharterInputVO())
      await precoModel.updatePreco(barcoCharterValidated.preco, barcoCharterValidated.preco.id, new PrecoRepository(), new MoedaRepository())
      await precoModel.updatePreco(barcoCharterValidated.horaExtra, barcoCharterValidated.horaExtra.id, new PrecoRepository(), new MoedaRepository())
      await precoModel.updatePreco(barcoCharterValidated.aluguelLancha, barcoCharterValidated.aluguelLancha.id, new PrecoRepository(), new MoedaRepository())

      await taxaChurrascoModel.updateTaxaChurrasco(barcoCharterValidated.taxaChurrasco, new TaxaChurrascoRepository(), new PrecoModel())

      passageirosModel.updatePassageiros(barcoCharterValidated.passageiros, new PassageirosRepository())

      consumoCombustivelModel.updateConsumoCombustivel(barcoCharterValidated.consumoCombustivel, new ConsumoCombustivelRepo(), new PrecoModel(), new CombustivelModel(), idConsumo)

      await barcoCharterModel.updateBarcoCharter(barcoCharterValidated, new BarcoCharterRepository(), new ModeloModel(), new CidadeModel(), idConsumo);

      await imagemModel.deleteAllImagesFromCharter(barcoCharterValidated.id, new ImagemRepository())
      await itensCharterModel.deleteAllAssotiationsItemCharter(barcoCharterValidated.id, new ItensCharterRepository())
      await roteiroModel.deleteAllRoteirosFromCharter(barcoCharterValidated.id, new RoteiroRepository(), new PrecoRepository)
      await imagemModel.insertImagensForCharter(validatedImages, barcoCharterValidated.id, new ImagemRepository())
      await itensCharterModel.associateItemWithSeminovo(barcoCharterValidated.id, validatedItensCharter, new ItensCharterRepository())
      await roteiroModel.saveRoteiro(barcoCharterValidated.id, barcoCharterValidated.roteiros, new RoteiroRepository(), new PrecoModel())
   }

   async rollbackPost(barcoSeminovoClient: BarcoCharterInput) {
           imagemModel.deleteImagesFromFirebase(barcoSeminovoClient.imagens, new FirebaseModel, "chartes")
       }

   async deleteBarcoCharter(idCharter: number, firebaseModel: FirebaseModel) {
      const barcoCharter = await barcoCharterModel.getBarcoCharter(idCharter, new BarcoCharterRepository())
      const imagesFromCharter = await imagemModel.getImagesByIdCharter(idCharter, new ImagemRepository())
      await imagemModel.deleteAllImagesFromCharter(idCharter, new ImagemRepository())
      await itensCharterModel.deleteAllAssotiationsItemCharter(idCharter, new ItensCharterRepository())
      await roteiroModel.deleteAllRoteirosFromCharter(idCharter, new RoteiroRepository(), new PrecoRepository)
      await barcoCharterModel.deleteBarcoCharterModel(barcoCharter.id, new BarcoCharterRepository())
      await precoModel.deletePrecoByidPreco(barcoCharter.preco_id, new PrecoRepository())
      await passageirosModel.deletePassageiros(barcoCharter.passageiros_id, new PassageirosRepository())
      await consumoCombustivelModel.deleteConsumoCombustivel(barcoCharter.consumo_combustivel_id, new ConsumoCombustivelRepo(), new PrecoRepository())
      await taxaChurrascoModel.deleteTaxaChurrasco(barcoCharter.taxa_churrasco_id, new TaxaChurrascoRepository(), new PrecoRepository())
      await precoModel.deletePrecoByidPreco(barcoCharter.preco_aluguel_lancha_id, new PrecoRepository())
      await precoModel.deletePrecoByidPreco(barcoCharter.preco_hora_extra_id, new PrecoRepository())
      await imagemModel.deleteImagesFromFirebase(imagesFromCharter, firebaseModel, "charters")

   }
}



