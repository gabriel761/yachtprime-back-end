import db from "../infra/database.ts";
import { Preco } from "../types/Preco.ts";
export class PrecoRepository {
    async insertPreco(valor:number, IdMoeda: number){
        const result = await db.one("INSERT INTO preco(valor, moeda_id) VALUES($1,$2) RETURNING id", [valor, IdMoeda]);
        return result
    }
}