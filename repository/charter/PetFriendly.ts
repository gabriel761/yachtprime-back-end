import { CustomError } from "../../infra/CustoError.js";
import db from "../../infra/database.js";

export class PetFriendlyRepository {
    async getPetFriendlyIdByString(opcao:string):Promise<number>{
        const result = await db.one("SELECT id FROM pet_friendly WHERE opcao = $1",[opcao]).catch((error) => {
            throw new CustomError(`Repository lever Error: PetFriendlyRepository getPetFriendlyIdByString:  ${error}`, 500)
        })
        return result.id 
    }
}