
import { ModeloMotorRepository } from "../repository/ModeloMotorRepository.ts"
import { MotorizacaoRepository } from "../repository/MotorizacaoRepository.ts"
import { Motorizacao } from "../types/Motorizacao.ts"

export class MotorizacaoModel {
    constructor() {

    }
    

    async saveMotorizacao(motor:Motorizacao, modeloMotorRepository:ModeloMotorRepository, motorRepository:MotorizacaoRepository ){
       const idModeloMotor = await modeloMotorRepository.getIdModeloMotorByModelo(motor.modelo)
       const idMotorizacaoSaved = await motorRepository.insertMotor(motor, idModeloMotor.id)
       return idMotorizacaoSaved.id
    }
}