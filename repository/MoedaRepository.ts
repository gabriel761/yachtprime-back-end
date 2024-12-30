import { CustomError } from "../infra/CustoError.js";
import db from "../infra/database.js";
import { Moeda, MoedaDatabase } from "../types/Moeda.js";

export class MoedaRepository {
    async getIdMoedaBySimbolo(moedaSimbolo:string){
        const result = await db.oneOrNone("SELECT id FROM moeda WHERE simbolo = $1",[moedaSimbolo])
        .catch((error) => {
            throw new CustomError(`Repository level error: Moeda getIdMoedaBySimbolo: ${error.message}`, 500)
        })
        if(!result){
            throw new CustomError("Moeda não encontrada "+moedaSimbolo, 404)
        }
        return result
    }

    async listMoeda(): Promise<MoedaDatabase[]> {
        try {
            const result = await db.query("SELECT * FROM moeda")
            return result
        } catch (error: any) {
            throw new CustomError(`Repository level error: Moeda listMoeda: ${error.message}`, 500)
        }
    }
}