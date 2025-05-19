import { PetFriendlyRepository } from "../../repository/charter/PetFriendly.js";

export class PetFriendlyModel {
    async getIdPetFriendlyByString(opcao:string, petFriendlyrepository: PetFriendlyRepository) {
       const idPetFriendly = await petFriendlyrepository.getPetFriendlyIdByString(opcao)
       return idPetFriendly
    }

    async listPetFrienly(petFriendlyRepository: PetFriendlyRepository){
        return await petFriendlyRepository.listPetFriendly()
    }
}