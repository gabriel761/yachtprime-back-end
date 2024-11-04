import db from "../infra/database.ts";
import { Motorizacao } from "../types/Motorizacao.ts";

export class MotorizacaoRepository {
    async insertMotor(motor:Motorizacao,idMotor:number ){
        const result = await db.one("INSERT INTO motorizacao(quantidade, potencia, horas, ano, observacoes, motor_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING id", [motor.quantidade, motor.potencia, motor.horas, motor.ano, motor.observacoes, idMotor]);
        return result
    }
}