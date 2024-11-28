import { CustomError } from "../infra/CustoError.ts";
import db from "../infra/database.ts";
import { Moeda, MoedaDatabase } from "../types/Moeda.ts";

export class MoedaRepository {
    async getIdMoedaBySimbolo(moedaSimbolo:string){
        const result = await db.oneOrNone("SELECT id FROM moeda WHERE simbolo = $1",[moedaSimbolo])
        if(!result){
            throw new CustomError("Moeda não encontrada", 404)
        }
        return result
    }

    async listMoeda(): Promise<MoedaDatabase[]> {
        try {
            const result = await db.query("SELECT * FROM moeda")
            return result
        } catch (error: any) {
            throw new CustomError(`Repository level error: Moeda repository: ${error.message}`, 500)
        }
    }
}