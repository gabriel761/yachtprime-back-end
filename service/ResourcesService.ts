import { PrecoModel } from "../models/PrecoModel.js"
import { MoedaRepository } from "../repository/MoedaRepository.js"

const precoModel = new PrecoModel()

export class ResourcesService {
    
    async listModeda() {
        const result = precoModel.listMoeda(new MoedaRepository())
        return result
    }
}