import { CustomError } from "../../infra/CustoError.js";
import db from "../../infra/database.js";
import { PasseioDb, PasseioInput } from "../../types/charter/Passeio.js";

export class PasseioRepository {
    async getPasseioById(idPasseio: number):Promise<PasseioDb> {
        const result = await db.oneOrNone(`
            SELECT
            p.id,
            p.duracao_passeio,
            tp.opcao AS tipo_passeio,
            ts.opcao AS tripulacao_skipper,
            le.nome_local AS embarque_principal_local,
            le.ponto_encontro AS embarque_principal_ponto_encontro,
            le.id AS embarque_principal_id,
            le.id_passeio AS embarque_principal_id_passeio

            FROM passeio p 
            JOIN tipo_passeio tp ON p.id_tipo_passeio = tp.id
            JOIN tripulacao_skipper ts ON p.id_tripulacao_skipper = ts.id
            JOIN local_embarque le ON le.id_passeio = p.id

            WHERE p.id = $1 AND le.principal = true
            `, [idPasseio])
        .catch((error)=> {
            throw new CustomError(`Repository lever Error: PasseioRepository getPasseioByIdCharter: ${error}`, 500)
        })
        if (!result){
            throw new CustomError("Não foi encontrado nenhum passeio associado a este barco idCharter="+idPasseio,400)
        }
        return result
    }

    async postPasseio(passeio:PasseioInput, idTipoPasseio: number, idTripulacaoSkipper: number){
        const idPasseio = await db.query("INSERT INTO passeio (id_tipo_passeio, duracao_passeio, id_tripulacao_skipper) VALUES ($1,$2,$3) RETURNING id" , [idTipoPasseio,  passeio.duracaoPasseio,  idTripulacaoSkipper] ).catch((error) => {
            throw new CustomError(`Repository lever Error: PasseioRepository postPasseio:  ${error}`, 500)
        })
        return idPasseio[0].id
    }
    
}