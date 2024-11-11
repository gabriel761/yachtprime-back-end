import { CustomError } from "../infra/CustoError.ts";
import db from "../infra/database.ts";
import { Preco } from "../types/Preco.ts";
export class PrecoRepository {
    async insertPreco(valor: number, IdMoeda: number) {
        const result = await db.one("INSERT INTO preco(valor, moeda_id) VALUES($1,$2) RETURNING id", [valor, IdMoeda]);
        return result
    }
    async deletePrecoById(idPreco: number) {
        try {
            await db.query("DELETE FROM preco WHERE id = $1;",[idPreco])
        } catch (error: any) {
            throw new CustomError(`Repository lever Error: PrecoRepository deleteByIdSeminovo: ${error}`, 500)
        }
    }
}