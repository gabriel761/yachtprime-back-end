import { CustomError } from "../infra/CustoError.ts";
import db from "../infra/database.ts";
import { Motorizacao } from "../types/Motorizacao.ts";

export class MotorizacaoRepository {
    async insertMotor(motor: Motorizacao, idMotor: number) {
        const result = await db.one("INSERT INTO motorizacao(quantidade, potencia, horas, ano, observacoes, motor_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING id", [motor.quantidade, motor.potencia, motor.horas, motor.ano, motor.observacoes, idMotor])
        .catch((error) => { 
            throw new CustomError(`Repository lever Error: MotorizacaoRepository getMotorizacaoById: ${error.message}`, 500) 
        });
        return result
    }
    async getMotorizacaoById(idMotorizacao: number) {
       
           const motorizacao = await db.oneOrNone("SELECT * FROM motorizacao WHERE id =  $1;", [idMotorizacao]).catch((error) => {
               throw new CustomError(`Repository lever Error: MotorizacaoRepository getMotorizacaoById: ${error.message}`, 500)
           })
           if(!motorizacao){
                throw new CustomError("Não há motorizacao com o id " + idMotorizacao, 404)
            }
            return motorizacao
        
    }
    async deleteMotorizacaoById(idMotorizacao: number) {
        try {
            await db.query("DELETE FROM motorizacao WHERE id =  $1;", [idMotorizacao])
        } catch (error: any) {
            throw new CustomError(`Repository lever Error: MotorizacaoRepository deleteByIdSeminovo: ${error.message}`, 500)
        }
    }
}