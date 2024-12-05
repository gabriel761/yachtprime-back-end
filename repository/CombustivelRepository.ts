import { CustomError } from "../infra/CustoError.ts";
import db from "../infra/database.ts";
import { Combustivel } from "../types/Combustivel.ts";

export class CombustivelRepository {
    async getIdCombustivelByName(opcao: string) {

        const result = await db.oneOrNone("SELECT id FROM tipo_combustivel WHERE opcao = $1", [opcao]).catch((error) => {
            throw new CustomError(`Repository level error: Combustivel: getIdCombustivelByName: ${error.message}`, 500)
        })
        if (!result) {
            throw new CustomError(`Tipo de combustível não encontrado ${opcao}`, 404)
        }
        return result

    }
    async listCombustivel(): Promise<Combustivel[]> {

        const result = await db.query("SELECT * FROM tipo_combustivel")
            .catch((error) => {
                throw new CustomError(`Repository level error: Combustivel: listCombustivel: ${error.message}`, 500)
            })
        return result

    }
}