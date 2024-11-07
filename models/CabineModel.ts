
import { CabineRepository } from "../repository/CabineRepository.ts";
import { Cabine } from "../types/Cabine.ts";

export class CabineModel {
    constructor() {

    }
    
    
    async saveCabine(input:Cabine, cabineRepository: CabineRepository):Promise<number>{
        const {id} = await cabineRepository.insertCabine(input)
        return id
    }
}