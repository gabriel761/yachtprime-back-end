import { CustomError } from "../infra/CustoError.ts";
import db from "../infra/database.ts";

export class ModeloMotorRepository {
    async getIdModeloMotorByModelo(modelo: string){
       const result = await db.oneOrNone("SELECT id FROM motor_cadastrado WHERE modelo = $1",[modelo])
       if(!result){
        throw new CustomError("Modelo não encontrado", 404)
       }
       return result
    }
}