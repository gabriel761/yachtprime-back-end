import { CustomError } from "../infra/CustoError.js";
import db from "../infra/database.js";
import { Propulsao } from "../types/Propulsao.js";

export class PropulsaoRepository {
    async getIdPropulsaoByName(opcao: string) {
       
            const result = await db.oneOrNone("SELECT id FROM propulsao WHERE opcao = $1", [opcao])
                .catch((error) => {
                    throw new CustomError(`Repository level error: Propulsao repository: ${error.message}`, 500)
                })
            if(!result){
                throw new CustomError("Propulsão não encontrada "+opcao, 404)
            }
            return result
       
    }

    async listPropulsao(): Promise<Propulsao[]> {
        try {
            const result = await db.query("SELECT * FROM propulsao")
            return result
        } catch (error: any) {
            throw new CustomError(`Repository level error: Propulsao listPropulsao: ${error.message}`, 500)
        }
    }
}