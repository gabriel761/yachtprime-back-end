
import { CustomError } from "../infra/CustoError.js"
import { CombustivelRepository } from "../repository/CombustivelRepository.js"

export class CombustivelModel{

    
    async getIdCombustivelByName(opcao:string, combustivelRepository: CombustivelRepository):Promise<number>{
        const response = await combustivelRepository.getIdCombustivelByName(opcao)
        if (typeof response?.id != "number") {
            throw new CustomError("Tipo de combustível não encontrado", 404)
        }
        return response.id
    }
    async listCombustivel(combustivelRepository: CombustivelRepository){
        const result = await combustivelRepository.listCombustivel()
        return result
    }
}