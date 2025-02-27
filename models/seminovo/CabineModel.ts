
import { CabineRepository } from "../../repository/seminovo/CabineRepository.js";
import { Cabine } from "../../types/seminovo/Cabine.js";

export class CabineModel {
    constructor() {

    }
    
    
    async saveCabine(input:Cabine, cabineRepository: CabineRepository):Promise<number>{
        const {id} = await cabineRepository.insertCabine(input)
        return id
    }
    async deleteCabineByIdCabine(idCabine:number, cabineRepository:CabineRepository){
       await cabineRepository.deleteCabineById(idCabine)
    }
    async updateCabine(cabine: Cabine,idCabine: number, cabineRepository: CabineRepository) {
        await cabineRepository.updateCabine(cabine, idCabine)
    }
}