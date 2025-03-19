import { BarcoCharterModel } from "../models/charter/BarcoCharterModel.js"
import { CondicoesModel } from "../models/charter/CondicoesModel.js"
import { ConsumoCombustivelModel } from "../models/charter/ConsumoCombustivelModel.js"
import { HorariosModel } from "../models/charter/HorariosModel.js"
import { ItensCharterModel } from "../models/charter/ItensCharterModel.js"
import { LocalEmbarqueModel } from "../models/charter/LocalEmbarqueModel.js"
import { PassageirosModel } from "../models/charter/PassageirosModel.js"
import { PasseioModel } from "../models/charter/PasseioModel.js"
import { PetFriendlyModel } from "../models/charter/PetFriendlyModel.js"
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
import { LocalEmbarqueRepository } from "../repository/charter/LocalEmbarqueRepository.js"
import { PassageirosRepository } from "../repository/charter/PassageirosRepository.js"
import { PasseioRepository } from "../repository/charter/PasseioRepository.js"
import { PetFriendlyRepository } from "../repository/charter/PetFriendly.js"
import { TaxaChurrascoRepository } from "../repository/charter/TaxaChurrascoRepo.js"
import { ImagemRepository } from "../repository/ImagemRepository.js"
import { MoedaRepository } from "../repository/MoedaRepository.js"
import { PrecoRepository } from "../repository/PrecoRepository.js"
import { CombustivelRepository } from "../repository/seminovo/CombustivelRepository.js"
import { BarcoCharterInput } from "../types/charter/BarcoCharter.js"
import { BarcoSeminovoInput } from "../types/seminovo/BarcoSeminovo.js"
import { BarcoCharterInputVO } from "../value_object/input/charter/BarcoSeminovoInputVO.js"
import { ItemCharterInputVO } from "../value_object/input/charter/ItemCharterInputVO.js"
import { PassageirosInputVO } from "../value_object/input/charter/PassageirosInputVO.js"
import { TaxaChurrascoInputVO } from "../value_object/input/charter/TaxaChurrascoInputVO.js"
import { ImagemInputVO } from "../value_object/input/ImagemInputVO.js"
import { PrecoInputVO } from "../value_object/input/PrecoInputVO.js"
import { BarcoCharterOutputVO } from "../value_object/output/charter/BarcoSeminovoOutputVO.js"
import { CondicoesVO } from "../value_object/output/charter/Condicoes.js"
import { ConsumoCombustivelOutputVO } from "../value_object/output/charter/ConsumoCombustivelOutputVO.js"
import { PassageirosOutputVO } from "../value_object/output/charter/PassageirosOutputVO.js"
import { PasseioOutputVO } from "../value_object/output/charter/PasseioOutputVO.js"
import { TaxaChurrascoOutputVO } from "../value_object/output/charter/TaxaChurrascoOutputVO.js"
import { PrecoOutputVO } from "../value_object/output/PrecoOutputVO.js"


const barcoCharterModel = new BarcoCharterModel()
const itensCharterModel = new ItensCharterModel()
const imagemModel = new ImagemModel()
const precoModel = new PrecoModel()
const passeioModel = new PasseioModel()
const petFreindlyModel = new PetFriendlyModel()
const consumoCombustivelModel = new ConsumoCombustivelModel()
const taxaChurrasco = new TaxaChurrascoModel()
const passageirosModel = new PassageirosModel()

export class BarcoCharterService {

   async getBarcoCharterById(id: number) {
      const barcoCharterDatabase = await barcoCharterModel.getBarcoCharter(id, new BarcoCharterRepository())
      const itensCharterArray = await itensCharterModel.getItensCharter(id, new ItensCharterRepository())
      const imagensArray = await imagemModel.getImagesByIdCharter(id, new ImagemRepository())
      const passeio = await passeioModel.getPasseioById(barcoCharterDatabase.passeio_id_passeio, new PasseioRepository(), new LocalEmbarqueModel(), new HorariosModel(), new CondicoesModel())
      const barcoCharterResult = barcoCharterModel.buildBarcoSeminovoOutputObject(barcoCharterDatabase, new BarcoCharterOutputVO(), new PrecoOutputVO(), new PassageirosOutputVO(), new ConsumoCombustivelOutputVO, new TaxaChurrascoOutputVO(), passeio, itensCharterArray, imagensArray)
      return barcoCharterResult
   }

   async postBarcoCharter(barcoCharter: BarcoCharterInput) {

      const barcoCharterValidated = barcoCharterModel.validateBarchoCharter(barcoCharter, new BarcoCharterInputVO(), new PrecoInputVO
         (), new PassageirosInputVO(), new TaxaChurrascoInputVO())
      const validatedImages = imagemModel.validateImages(barcoCharter.imagens, new ImagemInputVO())
      const validatedItensCharter = itensCharterModel.validateItensCharter(barcoCharter.itensDisponiveis, new ItemCharterInputVO())

      

      const idPrecoBarco = await precoModel.savePreco(barcoCharterValidated.preco, new PrecoRepository(), new MoedaRepository())
      const idPassageiros = await passageirosModel.savePassageiros(barcoCharterValidated.passageiros, new PassageirosRepository())
      const idPasseio = await passeioModel.postPasseio(barcoCharterValidated.passeio, new LocalEmbarqueRepository(), new LocalEmbarqueModel(), new HorariosModel(), new CondicoesModel(), new PasseioRepository(), new TipoPasseioModel(), new TripulacaoSkipperModel())
      const idPetFriendly = await petFreindlyModel.getIdPetFriendlyByString(barcoCharterValidated.petFriendly, new PetFriendlyRepository())
      const idConsumo = await consumoCombustivelModel.postConsumoCombustivel(barcoCharterValidated.consumoCombustivel, new ConsumoCombustivelRepo(), new PrecoModel(), new CombustivelModel())
      const idPrecoHoraExtra = await precoModel.savePreco(barcoCharterValidated.horaExtra, new PrecoRepository(), new MoedaRepository())
      const idPrecoAluguelLancha = await precoModel.savePreco(barcoCharterValidated.aluguelLancha, new PrecoRepository(), new MoedaRepository())
      const idTaxaChurrasco = await taxaChurrasco.saveTaxaChurrasco(barcoCharterValidated.taxaChurrasco, new TaxaChurrascoRepository(), new PrecoModel())
      const idBarcoCharter = await barcoCharterModel.saveBarcoCharter(barcoCharterValidated, new BarcoCharterRepository(), new ModeloModel(), idPrecoBarco, idPassageiros, idPasseio, idPetFriendly, idConsumo, idPrecoHoraExtra, idPrecoAluguelLancha, idTaxaChurrasco);

      await imagemModel.insertImagensForCharter(validatedImages, idBarcoCharter, new ImagemRepository())
      await itensCharterModel.associateItemWithSeminovo(idBarcoCharter, validatedItensCharter, new ItensCharterRepository())
      

   }
}

