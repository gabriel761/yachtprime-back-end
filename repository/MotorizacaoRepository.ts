import db from "../infra/database.ts";
import { Motorizacao } from "../types/Motorizacao.ts";

export class MotorizacaoRepository {
    async insertMotor(motor:Motorizacao,idMotor:number ){
        db.query("INSERT INTO motor(quantidade, potencia, horas, observacoes, motor_id) VALUES($1,$2,$3,$4,$5) RETURNING id", [motor.quantidade, motor.potencia, motor.horas, motor.ano, motor.observacoes, idMotor])
    }
}