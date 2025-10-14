import { CustomError } from "../infra/CustoError.js";
import db from "../infra/database.js";
import { Modelo } from "../types/Modelo.js";

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
            const result = await db.query("SELECT * FROM modelo_barco ORDER BY modelo")
            return result
        } catch (error: any) {
            throw new CustomError(`Repository level error: Modelo listModelo: ${error.message}`, 500)
        }
    }

    async insertModelo(modelo: Modelo) {
        try {
            await db.query(`INSERT INTO modelo_barco (marca, modelo) VALUES ($1, $2)`, [modelo.marca, modelo.modelo])
        } catch (error:any) {
            throw new CustomError(`Repository level error: Modelo insertModelo: ${ error.message }`, 500)
        }
    }
}   