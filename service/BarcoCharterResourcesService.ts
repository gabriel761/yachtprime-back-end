import { ItensCharterModel } from "../models/charter/ItensCharterModel.js";
import { PetFriendlyModel } from "../models/charter/PetFriendlyModel.js";
import { TipoPasseioModel } from "../models/charter/TipoPasseioModel.js";
import { TripulacaoSkipperModel } from "../models/charter/TripulacaoSkipperModel.js";
import { ItensCharterRepository } from "../repository/charter/ItensCharterRepository.js";
import { PetFriendlyRepository } from "../repository/charter/PetFriendly.js";
import { TipoPasseioRepository } from "../repository/charter/TipoPasseioRepo.js";
import { TripulacaoSkipperRepository } from "../repository/charter/TripulacaoSkipperRepo.js";

const petFriendlyModel = new PetFriendlyModel()
const tipoPasseioModel = new TipoPasseioModel()
const tripulacaoSkipperModel = new TripulacaoSkipperModel()
const itensCharterModel = new ItensCharterModel()

export class BarcoCharterResourcesService {  

    async listPetFriendly() { 
     const result =  await  petFriendlyModel.listPetFrienly(new PetFriendlyRepository())
     return result
    }
    async listTipoPasseio() { 
        const result = await tipoPasseioModel.listTipoPasseio(new TipoPasseioRepository())
        return result
    }
    async listTripulacaoSkipper() { 
        const result = await tripulacaoSkipperModel.listTripulacaoSkipper(new TripulacaoSkipperRepository())
        return result
    }

    async listItensCharter(){
        const itensCharter = await itensCharterModel.getAllItensCharter(new ItensCharterRepository())
        return itensCharter
    }
}