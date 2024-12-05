import { CustomError } from "../infra/CustoError.ts";
import db from "../infra/database.ts";
import { Modelo } from "../types/Modelo.ts";

export class ModeloRepository {
   async getIdModeloByName(modelo:string){
       
        const result = await db.oneOrNone("SELECT id FROM modelo_barco WHERE modelo = $1",[modelo]).catch((error) => {
            throw new CustomError(`Repository level error: Modelo getIdModeloByName: ${error.message}`, 500)
        })
        if(!result){
            throw new CustomError(`Modelo não encontrado `, 404)
        }
        return result
   
    }

    async listModelo(): Promise<Modelo[]> {
        try {
            const result = await db.query("SELECT * FROM modelo_barco")
            return result
        } catch (error: any) {
            throw new CustomError(`Repository level error: Modelo listModelo: ${error.message}`, 500)
        }
    }
}   