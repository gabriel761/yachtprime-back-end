import { MotorizacaoDto } from "../dto/MotorizacaoDto.ts"
import { ModeloMotorRepository } from "../repository/ModeloMotorRepository.ts"
import { MotorizacaoRepository } from "../repository/MotorizacaoRepository.ts"
import { Motorizacao } from "../types/Motorizacao.ts"

export class MotorizacaoModel {
    constructor() {

    }
    buildMotorDtoFromDatabase(input: Record<string, any>) {
        const motorDto = new MotorizacaoDto(input.modelo_motor, input.quantidade_motorizacao, input.potencia_motorizacao, input.horas_motorizacao, input.ano_motorizacao, input.observacoes_motorizacao)
        return motorDto
    }
    buildMotorDtoFromClient() {

    }
    async saveMotor(motor:Motorizacao, modeloMotorRepository:ModeloMotorRepository, motorRepository:MotorizacaoRepository ){
       const idModeloMotor = await modeloMotorRepository.getIdModeloMotorByModelo(motor.modelo)
       motorRepository.insertMotor(motor, idModeloMotor)
    }
}