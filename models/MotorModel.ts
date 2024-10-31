import { MotorDto } from "../dto/MotorDto.ts"

export class MotorModel {
    constructor() {

    }
    buildMotorDtoFromDatabase(input: Record<string, any>) {
        const motorDto = new MotorDto(input.modelo_motor, input.quantidade_motor, input.potencia_motor, input.horas_motor, input.ano_motor, input.observacoes_motor)
        return motorDto
    }
    buildMotorDtoFromClient() {

    }
}