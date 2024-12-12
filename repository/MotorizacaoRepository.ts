import { CustomError } from "../infra/CustoError.ts";
import db from "../infra/database.ts";
import { Motorizacao } from "../types/Motorizacao.ts";

export class MotorizacaoRepository {
    async insertMotorizacao(motorizacao: Motorizacao, idMotorizacao: number) {
        const result = await db.one("INSERT INTO motorizacao(quantidade, potencia, horas, ano, observacoes, motor_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING id", [motorizacao.quantidade, motorizacao.potencia, motorizacao.horas, motorizacao.ano, motorizacao.observacoes, idMotorizacao])
        .catch((error) => { 
            throw new CustomError(`Repository lever Error: MotorizacaoRepository insertMotorizacao: ${error.message}`, 500) 
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

    async updateMotorizacao(motorizacao: Motorizacao, idMotorizacao: number) {
         await db.query("UPDATE motorizacao SET quantidade = $1, potencia = $2, horas = $3, ano = $4, observacoes = $5 WHERE id = $6", [motorizacao.quantidade, motorizacao.potencia, motorizacao.horas, motorizacao.ano, motorizacao.observacoes, idMotorizacao])
            .catch((error) => {
                throw new CustomError(`Repository lever Error: MotorizacaoRepository updateMotorizacao: ${error.message}`, 500)
            });
        
    }
    async deleteMotorizacaoById(idMotorizacao: number) {
        try {
            await db.query("DELETE FROM motorizacao WHERE id =  $1;", [idMotorizacao])
        } catch (error: any) {
            throw new CustomError(`Repository lever Error: MotorizacaoRepository deleteByIdSeminovo: ${error.message}`, 500)
        }
    }
}