import { CustomError } from "../infra/CustoError.ts";
import db from "../infra/database.ts";
import { Combustivel } from "../types/Combustivel.ts";

export class CombustivelRepository {
    async getIdCombustivelByName(opcao: string) {
        try{
        const result = await db.oneOrNone("SELECT id FROM tipo_combustivel WHERE opcao = $1", [opcao])
        return result
        } catch (error: any) {
            throw new CustomError(`Repository level error: Combustivel repository: ${error.message}`, 500)
        }
    }
    async listCombustivel():Promise<Combustivel[]> {
        try {
            const result = await db.query("SELECT * FROM tipo_combustivel")
            return result
        } catch (error:any) {
            throw new CustomError(`Repository level error: Combustivel repository: ${error.message}`,500)
        }
    }
}