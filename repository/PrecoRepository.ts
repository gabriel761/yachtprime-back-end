import { CustomError } from "../infra/CustoError.js";
import db from "../infra/database.js";
export class PrecoRepository {
    async insertPreco(valor: number, IdMoeda: number) {
        const result = await db.one("INSERT INTO preco(valor, id_moeda) VALUES($1,$2) RETURNING id", [valor, IdMoeda]);
        return result
    }
    async updatePreco(valor: number, IdMoeda: number, idPreco: number) {
        const result = await db.query("UPDATE preco SET valor = $1, id_moeda = $2 WHERE id = $3", [valor, IdMoeda, idPreco]);
        return result
    }
    async getPrecoById(idPreco: number) {
       
          const preco =  await db.oneOrNone("SELECT * FROM preco WHERE id = $1;", [idPreco]).catch((error) => {
              throw new CustomError(`Repository lever Error: PrecoRepository getPrecoById: ${error}`, 500)
          })
            if(!preco){
                throw new CustomError("Não há preco com o id " + idPreco, 404)
            }
            return preco    
    }
    async deletePrecoById(idPreco: number) {
        try {
            await db.query("DELETE FROM preco WHERE id = $1;",[idPreco])
        } catch (error: any) {
            throw new CustomError(`Repository lever Error: PrecoRepository deleteByIdPreco: ${error}`, 500)
        }
    }
}