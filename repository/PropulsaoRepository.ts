import { CustomError } from "../infra/CustoError.ts";
import db from "../infra/database.ts";
import { Propulsao } from "../types/Propulsao.ts";

export class PropulsaoRepository {
    async getIdPropulsaoByName(opcao: string) {
        try {
            const result = await db.oneOrNone("SELECT id FROM propulsao WHERE opcao = $1", [opcao])
            return result
        } catch (error: any) {
            throw new CustomError(`Repository level error: Propulsao repository: ${error.message}`, 500)
        }
    }

    async listPropulsao(): Promise<Propulsao[]> {
        try {
            const result = await db.query("SELECT * FROM propulsao")
            return result
        } catch (error: any) {
            throw new CustomError(`Repository level error: Propulsao repository: ${error.message}`, 500)
        }
    }
}