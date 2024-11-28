import { ModeloMotorRepository } from "../repository/ModeloMotorRepository.ts";

export class MotorModel {
    async listMotor(motorRepository: ModeloMotorRepository){
        const result = await motorRepository.listModeloMotor()
        return result 
    }
}