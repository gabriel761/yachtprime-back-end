import { CabinesDto } from "../dto/CabinesDto.ts";

export class CabineModel {
    constructor() {

    }
    buildCabineDtoFromDatabase(input: Record<string, any>) {
        const cabineDto = new CabinesDto(input.capacidade_passageiro, input.capacidade_tripulacao)
        return cabineDto
    }
    buildCabineDtoFromClient() {

    }
}