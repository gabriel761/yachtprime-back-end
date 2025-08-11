import { CondicoesRepository } from "../../repository/charter/CondicoesRepository.js";
import { Condicao } from "../../types/charter/Condicoes.js";

export class CondicoesModel {
    async getCondicoesByIdPasseio(idPasseio: number, condicoesRepository: CondicoesRepository){
       const condicoesDb = await condicoesRepository.getCondicoesByIdPasseio(idPasseio)
        return condicoesDb
    }

    async getAllCondicoes(condicoesRepository: CondicoesRepository){
        const result = await condicoesRepository.getAllCondicoes()
        return result
    }

    async associateCondicoesPasseio(idPasseio: number, condicoesArray: Condicao[], condicoesRepository: CondicoesRepository) {
        for (let i = 0; i < condicoesArray.length; i++) {
            const condicao = condicoesArray[i]
            await condicoesRepository.associateCondicaoPasseio(idPasseio, condicao.id)
        }
    }

    async deleteAssociationCondicoesPasseio(idCharter: number, condicoesRepository: CondicoesRepository){
        condicoesRepository.deleteAllAssociationCondicaoPasseio(idCharter)
    }
}