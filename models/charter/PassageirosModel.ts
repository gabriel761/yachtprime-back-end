import { PassageirosRepository } from "../../repository/charter/PassageirosRepository.js";
import { Passageiros } from "../../types/charter/Passageiros.js";

export class PassageirosModel {
    async savePassageiros(passageiros:Passageiros, passageirosRepo: PassageirosRepository){
        const idPassageiros = await passageirosRepo.insertPassageiros(passageiros)
        return idPassageiros
    }
    async updatePassageiros(passageiros: Passageiros, passageirosRepo: PassageirosRepository) {
        const idPassageiros = await passageirosRepo.updatePassageiros(passageiros)
        return idPassageiros
    }
    async deletePassageiros(idPassageiros: number, passageirosRepo: PassageirosRepository){
        await passageirosRepo.deletePassageirosById(idPassageiros)
    }   
}