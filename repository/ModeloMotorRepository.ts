import { CustomError } from "../infra/CustoError.js";
import db from "../infra/database.js";
import { Motor } from "../types/Motor.js";

export class ModeloMotorRepository {
    async getIdModeloMotorByModelo(modelo: string) {
        const result = await db.oneOrNone("SELECT id FROM motor_cadastrado WHERE modelo = $1", [modelo])
            .catch((error) => {
                throw new CustomError(`Repository level error: Modelo Motor getIdModeloMotorByModelo: ${error.message}`, 500)
            })
        if (!result) {
            throw new CustomError("Modelo não encontrado", 404)
        }
        return result
    }

    async listModeloMotor(): Promise<Motor[]> {
        try {
            const result = await db.query("SELECT * FROM motor_cadastrado limit 10")
            return result
        } catch (error: any) {
            throw new CustomError(`Repository level error: Modelo Motor repository: ${error.message}`, 500)
        }
    }
}