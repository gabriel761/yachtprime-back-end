import { TipoPasseioRepository } from "../../repository/charter/TipoPasseioRepo.js";


export class TipoPasseioModel {
    async getIdTipoPasseioByString(tipoPasseio: string, tipoPasseioRepository: TipoPasseioRepository){
        const result =  await tipoPasseioRepository.getIdTipoPasseioByString(tipoPasseio)
        return result
    }

    async listTipoPasseio(tipoPasseioRepository: TipoPasseioRepository){
        return tipoPasseioRepository.listTipoPasseio()
    }
}