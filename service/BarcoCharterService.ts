import { BarcoCharterModel } from "../models/charter/BarcoCharterModel.js"
import { CondicoesModel } from "../models/charter/CondicoesModel.js"
import { HorariosModel } from "../models/charter/HorariosModel.js"
import { ItensCharterModel } from "../models/charter/ItensCharterModel.js"
import { LocalEmbarqueModel } from "../models/charter/LocalEmbarqueModel.js"
import { PasseioModel } from "../models/charter/PasseioModel.js"
import { ImagemModel } from "../models/ImagemModel.js"
import { PrecoModel } from "../models/PrecoModel.js"
import { BarcoCharterRepository } from "../repository/charter/BarcoCharterRepository.js"
import { ItensCharterRepository } from "../repository/charter/ItensCharterRepository.js"
import { LocalEmbarqueRepository } from "../repository/charter/LocalEmbarqueRepository.js"
import { PasseioRepository } from "../repository/charter/PasseioRepository.js"
import { ImagemRepository } from "../repository/ImagemRepository.js"
import { MoedaRepository } from "../repository/MoedaRepository.js"
import { PrecoRepository } from "../repository/PrecoRepository.js"
import { BarcoCharterInput } from "../types/charter/BarcoCharter.js"
import { BarcoSeminovoInput } from "../types/seminovo/BarcoSeminovo.js"
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

export class BarcoCharterService  {
    
   async getBarcoCharterById (id:number){
    const barcoCharterDatabase = await barcoCharterModel.getBarcoCharter(id, new BarcoCharterRepository())
    const itensCharterArray = await itensCharterModel.getItensCharter(id, new ItensCharterRepository())
    const imagensArray = await imagemModel.getImagesByIdCharter(id, new ImagemRepository())
    const passeio = await passeioModel.getPasseioById(barcoCharterDatabase.passeio_id_passeio , new PasseioRepository(), new LocalEmbarqueModel(), new HorariosModel(), new CondicoesModel())
    const barcoCharterResult = barcoCharterModel.buildBarcoSeminovoOutputObject(barcoCharterDatabase,new BarcoCharterOutputVO(), new PrecoOutputVO(), new PassageirosOutputVO(), new ConsumoCombustivelOutputVO, new TaxaChurrascoOutputVO(), new CondicoesVO(), passeio, itensCharterArray, imagensArray)
    return barcoCharterResult
   }
   async postBarcoCharter(barcoCharter: BarcoCharterInput) {
      const idPrecoBarco = precoModel.savePreco(barcoCharter.preco, new PrecoRepository(), new MoedaRepository())
      //const idPassageiros;
      const idPasseio = passeioModel.postPasseio(barcoCharter.passeio, new LocalEmbarqueRepository())
      // const idPetFriendly;
      // const idConsumo;
      // const idPrecoHoraExtra;
      // const idPrecoAluguelLancha;
      // const idTaxaChurrasco;
   }
}

