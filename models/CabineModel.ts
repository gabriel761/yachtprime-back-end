import { CabinesDto } from "../dto/CabinesDto.ts";
import { CabineRepository } from "../repository/CabineRepository.ts";
import { Cabine } from "../types/Cabine.ts";

export class CabineModel {
    constructor() {

    }
    buildCabineDtoFromDatabase(input: Record<string, any>) {
        const cabineDto = new CabinesDto(input.capacidade_passageiro, input.capacidade_tripulacao)
        return cabineDto
    }
    buildCabineDtoFromClient() {

    }
    async saveCabine(input:Cabine, cabineRepository: CabineRepository):Promise<number>{
        const {id} = await cabineRepository.insertCabine(input)
        return id
    }
}