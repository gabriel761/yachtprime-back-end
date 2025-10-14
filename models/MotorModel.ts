import { ModeloMotorRepository } from "../repository/ModeloMotorRepository.js";
import { MotorizacaoRepository } from "../repository/seminovo/MotorizacaoRepository.js";
import { Motor } from "../types/seminovo/Motor.js";

export class MotorModel {
    async listMotor(motorRepository: ModeloMotorRepository) {
        const result = await motorRepository.listModeloMotor()
        return result
    }

    async insertModeloMotor(motorRepository: ModeloMotorRepository, modeloInput: Motor) {
        await motorRepository.insertModeloMotor(modeloInput)
    }
}