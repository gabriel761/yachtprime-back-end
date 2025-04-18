import { CustomError } from "../../infra/CustoError.js";
import db from "../../infra/database.js"
import { RoteiroDataBase, RoteiroOutput } from "../../types/charter/Roteiro.js";

export class RoteiroRepository {
    async getRoteirosByIdCharter(idCharter: number): Promise<RoteiroDataBase[]> {
        const result = await db.query(`SELECT
                    r.nome,
                    r.descricao,
                    preco.valor AS preco_valor,
                    moeda.simbolo AS preco_moeda,
                    r.detalhes_pagamento AS detalhes_pagamento
                FROM
                    roteiro r
                    JOIN preco ON id_preco = preco.id
                    JOIN moeda ON preco.id_moeda = moeda.id
                `, [idCharter]).catch((error) => {
            throw new CustomError(`Repository level error: RoteiroRepository:getRoteirosByIdCharter: ${error.message}`, 500)
        });
        if (!result) {
            throw new CustomError("Não há roteiros relacionados a este barco", 404);
        }
        return result
    }

    async insertRoteiro(nome: string, descricao: string, idPreco: number, detalhesPagamento: string, idCharter: number): Promise<number> {
        try {
            const idRoteiro = await db.one(`INSERT INTO roteiro (
                nome,
                descricao,
                id_preco,
                detalhes_pagamento,
                id_barco_charter
            )
            VALUES
            ($1,$2,$3,$4,$5)   
            RETURNING id          
            `, [nome, descricao, idPreco, detalhesPagamento, idCharter])

            return idRoteiro
        } catch (error: any) {
            throw new CustomError(`Repository level error: RoteiroRepository:insertRoteiro: ${error.message}`, 500)
        }
    }

    async deleteAllRoteirosByIdCharter(idCharter:number){
      await  db.none(`DELETE FROM roteiro WHERE id_barco_charter=$1`,[idCharter])
    }
}