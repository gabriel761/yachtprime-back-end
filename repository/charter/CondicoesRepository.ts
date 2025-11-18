import { CustomError } from "../../infra/CustoError.js";
import db from "../../infra/database.js";
import { Condicao } from "../../types/charter/Condicoes.js";

export class CondicoesRepository {
    async getCondicoesByIdPasseio(idPasseio: number):Promise<Condicao[]> {
        const result = await db.query(`
        SELECT c.id, c.opcao
        FROM passeio_condicoes pc
        JOIN condicao c ON pc.id_condicao = c.id
        WHERE pc.id_passeio = $1;
        `,[idPasseio]).catch((error) => {
            throw new CustomError(`Repository level Error: CondicoesRepository getCondicoesCharterByIdPasseio: ${error}`, 500)
        });
        if (result.length == 0) {
            throw new CustomError("Não foram encontrados condicoes associados a este barco idPasseio=" + idPasseio, 404)
        }
        
        return result
    }

    async getAllCondicoes(){
        const result = await db.query(`SELECT * FROM condicao`).catch((error) => {
            throw new CustomError(`Repository level Error: CondicoesRepository getAllCondicoes: ${error}`, 500)
        });
        if (result.length == 0) {
            throw new CustomError("Não foram encontradas condicoes na tabela", 404)
        }

        return result
    }

    async associateCondicaoPasseio (idPasseio: number, idCondicao: number){
        db.query('INSERT INTO passeio_condicoes (id_passeio, id_condicao) VALUES ($1,$2)', [idPasseio, idCondicao]).catch((error) => {
            throw new CustomError(`Repository level Error: CondicoesRepository insertCondicao: ${error}`, 500)
        });
    }

    async deleteAllAssociationCondicaoPasseio(idPasseio: number){
        db.query('DELETE FROM passeio_condicoes WHERE id_passeio = $1', [idPasseio]).catch((error) => {
            throw new CustomError(`Repository level Error: CondicoesRepository deleteAllAssociationCondicaoPasseio: ${error}`, 500)
        });
    }
}