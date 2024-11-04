import db from "../infra/database.ts";

export class ModeloRepository {
   async getIdModeloByName(modelo:string){
        const result = await db.oneOrNone("SELECT id FROM modelo_barco WHERE modelo = $1",[modelo])
        return result
    }
}   