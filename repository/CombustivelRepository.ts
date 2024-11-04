import db from "../infra/database.ts";

export class CombustivelRepository {
    async getIdCombustivelByName(opcao:string){
        const result = await db.oneOrNone("SELECT id FROM tipo_combustivel WHERE opcao = $1", [opcao])
        return result
    }
}