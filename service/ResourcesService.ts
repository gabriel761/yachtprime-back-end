import { PrecoModel } from "../models/PrecoModel.ts"
import { MoedaRepository } from "../repository/MoedaRepository.ts"

const precoModel = new PrecoModel()

export class ResourcesService {
    
    async listModeda() {
        const result = precoModel.listMoeda(new MoedaRepository())
        return result
    }
}