import { CustomError } from "../../infra/CustoError.js";
import db from "../../infra/database.js";
import { Condicao } from "../../types/charter/Condicoes.js";

export class CondicoesRepository {
    async getCondicoesByIdCharter(idCharter: number): Promise<Condicao[]> {
        console.log("idCharter na repo:", idCharter);
        const result = await db.query(`
                SELECT 
                    cc.id,
                    cc.opcao
                FROM barco_charter bc
                JOIN barco_charter_condicoes_charter bccc ON bccc.id_barco_charter = bc.id
                JOIN condicoes_charter cc ON bccc.id_condicoes_charter = cc.id
                WHERE bc.id = $1  
        `, [idCharter]).catch((error) => {
            throw new CustomError(`Repository level Error: CondicoesRepository getCondicoesByIdCharter: ${error}`, 500)
        });
       

        return result
    }

    async getCondicoesPadrao() {
        const result = await db.query(`SELECT * FROM condicoes_padrao`).catch((error) => {
            throw new CustomError(`Repository level Error: CondicoesRepository getCondicoesPadrao: ${error}`, 500)
        });
        if (result.length == 0) {
            throw new CustomError("Não foram encontradas condicoes na tabela", 404);
        }

        return result
    }

    async insertCondicaoPadrao(condicao: Condicao) {
        await db.query(`INSERT INTO condicoes_padrao (opcao) VALUES ($1)`, [condicao.opcao]).catch((error) => {
            throw new CustomError(`Repository level Error: CondicoesRepository insertCondicaoPadrao: ${error}`, 500)
        });
    }

    async postCondicaoCharter(condicao: Condicao): Promise<number> {
        const result = await db.query('INSERT INTO condicoes_charter (opcao) VALUES ($1) RETURNING id', [condicao.opcao]).catch((error) => {
            throw new CustomError(`Repository level Error: CondicoesRepository insertCondicaoCharter: ${error}`, 500)
        });
        return result[0].id
    }

    async associateCondicaoCharter(idBarcoCharter: string, idCondicao: number) {
        db.query('INSERT INTO barco_charter_condicoes_charter (id_barco_charter, id_condicoes_charter) VALUES ($1,$2)', [idBarcoCharter, idCondicao]).catch((error) => {
            throw new CustomError(`Repository level Error: CondicoesRepository insertCondicao: ${error}`, 500);
        });
    }

    async deleteCondicoesByCharterId(idCharter: number) {
        await db.query('DELETE FROM barco_charter_condicoes_charter WHERE id_barco_charter = $1', [idCharter]).catch((error) => {
            throw new CustomError(`Repository level Error: CondicoesRepository deleteCondicoesByCharterId: ${error}`, 500)
        });
    }
    async deleteAllCondicoesPadrao() {
        await db.query('DELETE FROM condicoes_padrao').catch((error) => {
            throw new CustomError(`Repository level Error: CondicoesRepository deleteCondicoesByCharterId: ${error}`, 500)
        });
    }
}