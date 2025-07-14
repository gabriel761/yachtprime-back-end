import { CustomError } from "../../infra/CustoError.js";
import db from "../../infra/database.js";
import { BarcoSeminovoDashboardList, BarcoSeminovoDatabase, BarcoSeminovoFilters, BarcoSeminovoInput, BarcoSeminovoInputWithId, BarcoSeminovoRelated } from "../../types/seminovo/BarcoSeminovo.js";
import config from "../../config.js";

type ListBarcoSeminovoFrontEndDB = {
    id: number,
    modelo: string,
    motor_quantidade: number,
    motor_modelo: string,
    combustivel: string
    potencia_total: number,
    tamanho: number,
    imagem: string,
    ano: number
}


const limit = config.limitQuery || 1

class BarcoSeminovoRepository {
    async getBarcoSeminovo(id: number): Promise<BarcoSeminovoDatabase> {
        const result = await db.oneOrNone(`
SELECT
    bs.id AS barco_id,
    bs.nome AS nome_barco,
    bs.ano AS ano_barco,
    bs.tamanho AS tamanho_barco,
	mc.id AS id_modelo,
    mc.marca AS marca_modelo,
    mc.modelo AS modelo_modelo,
    m.quantidade AS quantidade_motorizacao,
    m.potencia AS potencia_motorizacao,
    bs.potencia_total AS potencia_total,
    m.horas AS horas_motorizacao,
    m.ano AS ano_motorizacao,
    m.observacoes AS observacoes_motorizacao,
	m.id AS motorizacao_id,
    mc_motor.marca AS marca_motor,
    mc_motor.modelo AS modelo_motor,
	tc.id AS id_combustivel,
    tc.opcao AS tipo_combustivel,
	p.id AS id_propulsao,
    p.opcao AS tipo_propulsao,
	c.id AS capacidade_id,
    c.passageiro AS capacidade_passageiro,
    c.tripulacao AS capacidade_tripulacao,
    bs.procedencia,
    bs.destaque,
	pr.id AS preco_id,
    pr.valor AS preco,
    mo.nome AS moeda_nome,
    mo.simbolo AS moeda_simbolo,
    bs.video AS video_barco,
    bs.oportunidade
FROM
    barco_seminovo bs
    JOIN modelo_barco mc ON bs.id_modelo = mc.id
    JOIN motorizacao m ON bs.id_motorizacao = m.id
    JOIN motor_cadastrado mc_motor ON m.id_motor = mc_motor.id
    JOIN tipo_combustivel tc ON bs.id_combustivel = tc.id
    JOIN propulsao p ON bs.id_propulsao = p.id
    JOIN cabine c ON bs.id_cabine = c.id
    JOIN preco pr ON bs.id_preco = pr.id
    JOIN moeda mo ON pr.id_moeda = mo.id
WHERE
    bs.id = $1;


`, [id])
            .catch((error) => {
                throw new CustomError(`Repository level error: BarcoSeminovoRepository:getBarcoSeminovo: ${error.message}`, 500)
            });
        if (!result) {
            throw new CustomError("barco não existe: id=" + id, 404);
        }
        return result
    }
    async listBarcoSeminovoDashboard(): Promise<any[]> {
        const result = await db.query(`
        SELECT 
            bs.id AS id,
            mb.modelo AS modelo,
            bs.nome AS nome,
            bs.tamanho AS tamanho,
            im.link AS imagem,
            bs.ano AS ano,
            mo.simbolo AS moeda,
            pr.valor AS valor
        FROM 
            barco_seminovo bs
            LEFT JOIN modelo_barco mb ON bs.id_modelo = mb.id
            LEFT JOIN preco pr ON bs.id_preco = pr.id
            LEFT JOIN moeda mo ON pr.id_moeda = mo.id
            LEFT JOIN imagem_barco_seminovo ibs ON bs.id = ibs.id_barco_seminovo
            LEFT JOIN imagem im ON ibs.id_imagem = im.id
        WHERE 
             ibs.id = (SELECT MIN(ibs2.id) 
              FROM imagem_barco_seminovo ibs2 
              WHERE ibs2.id_barco_seminovo = bs.id);
`)
        return result
    }

    async listBarcoSeminovoFrontEnd(filters: BarcoSeminovoFilters): Promise<ListBarcoSeminovoFrontEndDB[]> {
        const { modelo, oportunidade, page = 1 } = filters;

        // Array para armazenar as condições
        const whereConditions: string[] = [];
        const params: any[] = []; // Valores para os placeholders do query

        // Adiciona a condição para 'modelo', se existir
        if (modelo) {
            whereConditions.push(`mb.modelo ILIKE $${params.length + 1}`);
            params.push(`%${modelo}%`); // Adiciona os wildcards
        }


        // Adiciona a condição para 'oportunidade', se existir
        if (typeof oportunidade === 'boolean') {
            whereConditions.push(`bs.oportunidade = $${params.length + 1}`);
            params.push(oportunidade);
        }

        // Adiciona a condição para pegar a menor imagem, que é sempre fixa
        whereConditions.push(`
        ibs.id = (
            SELECT MIN(ibs2.id) 
            FROM imagem_barco_seminovo ibs2 
            WHERE ibs2.id_barco_seminovo = bs.id
        )
    `);

        // Constrói a cláusula WHERE final
        const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';
        const offset = (page - 1) * limit;
        // Query final
        const query = `
        SELECT 
            bs.id AS id,
            mb.modelo AS modelo,
            mtrz.quantidade AS motor_quantidade,
            mt.modelo AS motor_modelo,
            cb.opcao AS combustivel,
            bs.potencia_total AS potencia_total,
            bs.tamanho AS tamanho,
            im.link AS imagem,
            bs.ano AS ano
        FROM 
            barco_seminovo bs
            LEFT JOIN modelo_barco mb ON bs.id_modelo = mb.id
            LEFT JOIN motorizacao mtrz ON bs.id_motorizacao = mtrz.id
            LEFT JOIN tipo_combustivel cb ON bs.id_combustivel = cb.id
            LEFT JOIN motor_cadastrado mt ON mtrz.id_motor = mt.id
            LEFT JOIN imagem_barco_seminovo ibs ON bs.id = ibs.id_barco_seminovo
            LEFT JOIN imagem im ON ibs.id_imagem = im.id
        ${whereClause}
        LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;
        params.push(limit, offset);

        const result = await db.query(query, params);

        return result
    }


    async getTotalPagesForPagination(): Promise<number> {
        const countQuery = `
            SELECT COUNT(*) AS total
            FROM barco_seminovo 
        `;

        const countResult = await db.query(countQuery);
        const totalItems = parseInt(countResult[0].total, 10);
        const totalPages = Math.ceil(totalItems / limit);
        return totalPages
    }

    async getRelatedSeminovos(idSeminovo: number):Promise<BarcoSeminovoRelated[]> {
        try {
            const result = await db.query(`
            SELECT 
                bs.id,
                p.valor AS preco,
                m.modelo AS modelo,
                im.link AS imagem
            FROM 
                barco_seminovo bs
            JOIN 
                preco p ON bs.id_preco = p.id
            JOIN
                modelo_barco m ON bs.id_modelo = m.id
            JOIN 
                imagem_barco_seminovo ibs ON bs.id = ibs.id_barco_seminovo
            JOIN 
                imagem im ON ibs.id_imagem = im.id
            WHERE 
                ibs.id = (
                SELECT MIN(ibs2.id) 
                FROM imagem_barco_seminovo ibs2 
                WHERE ibs2.id_barco_seminovo = bs.id
            )
			AND bs.id <> $1 -- exclui o barco base
            ORDER BY 
                ABS(p.valor - (
                    SELECT p2.valor
                    FROM barco_seminovo bs2
                    JOIN preco p2 ON bs2.id_preco = p2.id
                    WHERE bs2.id = $1
                )) ASC
            LIMIT 3;
            `, [idSeminovo])
            return result
        } catch (error: any) {
            throw new CustomError(`Repository level error: BarcoSeminovoRepository:getRelatedSeminovos: ${error.message}`, 500)
        }

    }


    async insertBarcoSeminovo(barcoSeminovoDTO: BarcoSeminovoInput, idMotorizacao: number, idCabine: number, idPreco: number) {
        const idBarco = await db.one(`
            INSERT INTO barco_seminovo (
                id_modelo,
                nome,
                ano,
                tamanho,
                id_motorizacao,
                potencia_total,
                id_combustivel,
                id_propulsao,
                id_cabine,
                procedencia,
                destaque,
                id_preco,
                video,
                oportunidade
                ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12, $13, $14) RETURNING id`,
            [
                barcoSeminovoDTO.modelo.id,
                barcoSeminovoDTO.nome,
                barcoSeminovoDTO.ano,
                barcoSeminovoDTO.tamanho,
                idMotorizacao,
                barcoSeminovoDTO.potenciaTotal,
                barcoSeminovoDTO.combustivel.id,
                barcoSeminovoDTO.propulsao.id,
                idCabine, barcoSeminovoDTO.procedencia,
                barcoSeminovoDTO.destaque,
                idPreco,
                barcoSeminovoDTO.videoPromocional,
                barcoSeminovoDTO.oportunidade
            ])
            .catch((error) => {
                throw new CustomError(`Repository level error: BarcoSeminovoRepository:insertBarcoSeminovo: ${error.message}`, 500)
            });
        return idBarco.id
    }

    async updateBarcoSeminovo(barcoSeminovoDTO: BarcoSeminovoInputWithId) {
        const idBarco = await db.query(`
            UPDATE 
                barco_seminovo
            SET 
                id_modelo = $1,
                nome = $2,
                ano = $3,
                tamanho = $4,
                potencia_total = $5,
                id_combustivel = $6,
                id_propulsao = $7,
                procedencia = $8,
                destaque = $9,
                video = $10,
                oportunidade = $11
            WHERE
                id = $12
                `,
            [
                barcoSeminovoDTO.modelo.id,
                barcoSeminovoDTO.nome,
                barcoSeminovoDTO.ano,
                barcoSeminovoDTO.tamanho,
                barcoSeminovoDTO.potenciaTotal,
                barcoSeminovoDTO.combustivel.id,
                barcoSeminovoDTO.propulsao.id,
                barcoSeminovoDTO.procedencia,
                barcoSeminovoDTO.destaque,
                barcoSeminovoDTO.videoPromocional,
                barcoSeminovoDTO.oportunidade,
                barcoSeminovoDTO.id
            ])
            .catch((error) => {
                throw new CustomError(`Repository level error: BarcoSeminovoRepository:updateBarcoSeminovo: ${error.message}`, 500)
            });
        return idBarco.id
    }

    async getIdsByIdSeminovo(idSeminovo: number) {
        const result = await db.oneOrNone(`
            SELECT
                id_motorizacao AS id_motorizacao,
                id_preco AS id_preco,
                id_cabine AS id_cabine
            FROM 
                barco_seminovo 
            WHERE 
                id = $1
            `, [idSeminovo])
            .catch((error) => {
                throw new CustomError(`Repository level error: BarcoSeminovoRepository:getIdsByIdSeminovo: ${error.message}`, 500)
            })
        if (!result) {
            throw new CustomError("Erro ao pegar id de preço. Barco não encontrado: id=" + result, 404);
        }
        return result
    }

    async deleteBarcoSeminovo(idBarcoSeminovo: number) {
        await db.query("DELETE FROM barco_seminovo WHERE id = $1", [idBarcoSeminovo])
            .catch((error) => {
                throw new CustomError(`Repository level error: BarcoSeminovoRepository:deleteBarcoSeminovo: ${error.message}`, 500)
            })
    }
}




export default BarcoSeminovoRepository