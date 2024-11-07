
import { CustomError } from "../infra/CustoError.ts"
import { CombustivelRepository } from "../repository/CombustivelRepository.ts"

export class CombustivelModel{

    
    async getIdCombustivelByName(opcao:string, combustivelRepository: CombustivelRepository):Promise<number>{
        const response = await combustivelRepository.getIdCombustivelByName(opcao)
        if (typeof response?.id != "number") {
            throw new CustomError("Tipo de combustível não encontrado", 404)
        }
        return response.id
    }
}