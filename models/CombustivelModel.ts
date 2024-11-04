import { CombustiveDto } from "../dto/CombustivelDto.ts"
import { CustomError } from "../infra/CustoError.ts"
import { CombustivelRepository } from "../repository/CombustivelRepository.ts"

export class CombustivelModel{

    combustivelDTOFactory(opcao:string, id?:number){
        const combustivelDTO = new CombustiveDto(opcao, id)
        return combustivelDTO
    }

    async getIdCombustivelByName(opcao:string, combustivelRepository: CombustivelRepository):Promise<number>{
        const {id} = await combustivelRepository.getIdCombustivelByName(opcao)
        if (typeof id != "number") {
            throw new CustomError("Tipo de combustível não encontrado", 404)
        }
        return id
    }
}