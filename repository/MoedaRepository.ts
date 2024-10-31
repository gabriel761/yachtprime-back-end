import { CustomError } from "../infra/CustoError.ts";
import db from "../infra/database.ts";

export class MoedaRepository {
    async getIdMoedaBySimbolo(moedaSimbolo:string){
        const result = await db.oneOrNone("SELECT id FROM moeda WHERE simbolo = $1",[moedaSimbolo])
        if(!result){
            throw new CustomError("Moeda não encontrada", 404)
        }
        return result
    }
}