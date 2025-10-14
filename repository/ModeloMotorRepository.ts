import { CustomError } from "../infra/CustoError.js";
import db from "../infra/database.js";
import { Motor } from "../types/seminovo/Motor.js";

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
            const result = await db.query("SELECT * FROM motor_cadastrado")
            return result
        } catch (error: any) {
            throw new CustomError(`Repository level error: Modelo Motor repository: ${error.message}`, 500)
        }
    }

    async insertModeloMotor(motor: Motor) {
        try {
            await db.query(`INSERT INTO motor_cadastrado (marca, modelo) VALUES ($1, $2)`, [motor.marca, motor.modelo])
        } catch (error: any) {
            throw new CustomError(`Repository level error: Motor insertModelo: ${error.message}`, 500)
        }
    }
}