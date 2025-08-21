import { CustomError } from "../infra/CustoError.js";
import { CidadeModel } from "../models/charter/CidadeModel.js";
import { CondicoesModel } from "../models/charter/CondicoesModel.js";
import { ItensCharterModel } from "../models/charter/ItensCharterModel.js";
import { PetFriendlyModel } from "../models/charter/PetFriendlyModel.js";
import { TipoPasseioModel } from "../models/charter/TipoPasseioModel.js";
import { TripulacaoSkipperModel } from "../models/charter/TripulacaoSkipperModel.js";
import { FirebaseModel } from "../models/external/FirebaseModel.js";
import { ImagemModel } from "../models/ImagemModel.js";
import { CidadeRepository } from "../repository/charter/CidadeRepository.js";
import { CondicoesRepository } from "../repository/charter/CondicoesRepository.js";
import { ItensCharterRepository } from "../repository/charter/ItensCharterRepository.js";
import { PetFriendlyRepository } from "../repository/charter/PetFriendly.js";
import { TipoPasseioRepository } from "../repository/charter/TipoPasseioRepo.js";
import { TripulacaoSkipperRepository } from "../repository/charter/TripulacaoSkipperRepo.js";
import { ImagemRepository } from "../repository/ImagemRepository.js";

const petFriendlyModel = new PetFriendlyModel()
const tipoPasseioModel = new TipoPasseioModel()
const tripulacaoSkipperModel = new TripulacaoSkipperModel()
const itensCharterModel = new ItensCharterModel()
const imagemModel = new ImagemModel()
const cidadeModel = new CidadeModel()
const condicoesModel = new CondicoesModel()

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

    async listImagesByIdCharter(idCharter:number){
        const imagesCharter = await imagemModel.getImagesByIdCharter(idCharter, new ImagemRepository())
        return imagesCharter
    }

    async listCidades(){
        const cidades = await cidadeModel.getCidades(new CidadeRepository())
        return cidades
    }

    async listCondicoes() {
        const condicoes = await condicoesModel.getAllCondicoes(new CondicoesRepository())
        return condicoes
    }

     async deleteImagesFromFirebase(images:[]){
            try {
                imagemModel.deleteImagesFromFirebase(images, new FirebaseModel, "charter")
            } catch (error: any) {
                throw new CustomError(error.message, 500)
            }
      
       }
}