
import { ModeloMotorRepository } from "../repository/ModeloMotorRepository.ts"
import { MotorizacaoRepository } from "../repository/MotorizacaoRepository.ts"
import { Motorizacao } from "../types/Motorizacao.ts"

export class MotorizacaoModel {
    constructor() {

    }
    

    async saveMotorizacao(motor:Motorizacao, modeloMotorRepository:ModeloMotorRepository, motorRepository:MotorizacaoRepository ){
       const idModeloMotor = await modeloMotorRepository.getIdModeloMotorByModelo(motor.modelo)
       const idMotorizacaoSaved = await motorRepository.insertMotorizacao(motor, idModeloMotor.id)
       return idMotorizacaoSaved.id
    }
    async updateMotorizacao(motorizacao: Motorizacao, idMotorizacao: number, motorizacaoRepository: MotorizacaoRepository){
        motorizacaoRepository.updateMotorizacao(motorizacao, idMotorizacao)
    }
    async deleteMotorizacaoByIdMotorizacao(idMotorizacao: number, motorRepository: MotorizacaoRepository){
        await motorRepository.deleteMotorizacaoById(idMotorizacao)
    }
}