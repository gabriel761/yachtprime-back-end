import { CustomError } from "../infra/CustoError.ts";
import db from "../infra/database.ts";
import { BarcoSeminovoDatabase, BarcoSeminovoInput, BarcoSeminovoInputWithId } from "../types/BarcoSeminovo.ts";


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
    bs.video AS video_barco
FROM
    barco_seminovo bs
    JOIN modelo_barco mc ON bs.modelo_id = mc.id
    JOIN motorizacao m ON bs.motorizacao_id = m.id
    JOIN motor_cadastrado mc_motor ON m.motor_id = mc_motor.id
    JOIN tipo_combustivel tc ON bs.combustivel = tc.id
    JOIN propulsao p ON bs.propulsao = p.id
    JOIN cabine c ON bs.cabine = c.id
    JOIN preco pr ON bs.preco_id = pr.id
    JOIN moeda mo ON pr.moeda_id = mo.id
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
    async listBarcoSeminovo() {
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
            LEFT JOIN modelo_barco mb ON bs.modelo_id = mb.id
            LEFT JOIN preco pr ON bs.preco_id = pr.id
            LEFT JOIN moeda mo ON pr.moeda_id = mo.id
            LEFT JOIN imagem_barco_seminovo ibs ON bs.id = ibs.barco_seminovo_id
            LEFT JOIN imagem im ON ibs.imagem_id = im.id
        WHERE 
             ibs.id = (SELECT MIN(ibs2.id) 
              FROM imagem_barco_seminovo ibs2 
              WHERE ibs2.barco_seminovo_id = bs.id);
`)
        return result
    }

    async insertBarcoSeminovo(barcoSeminovoDTO: BarcoSeminovoInput, idMotorizacao: number, idCabine: number, idPreco: number) {
        const idBarco = await db.one(`
            INSERT INTO barco_seminovo (
                modelo_id,
                nome,
                ano,
                tamanho,
                motorizacao_id,
                potencia_total,
                combustivel,
                propulsao,
                cabine,
                procedencia,
                destaque,
                preco_id,
                video
                ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12, $13) RETURNING id`,
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
                barcoSeminovoDTO.videoPromocional
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
                modelo_id = $1,
                nome = $2,
                ano = $3,
                tamanho = $4,
                potencia_total = $5,
                combustivel = $6,
                propulsao = $7,
                procedencia = $8,
                destaque = $9,
                video = $10
            WHERE
                id = $11
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
                barcoSeminovoDTO.id
            ])
            .catch((error) => {
                throw new CustomError(`Repository level error: BarcoSeminovoRepository:updateBarcoSeminovo: ${error.message}`, 500)
            });
        return idBarco.id
    }

    async getIdsByIdSeminovo(idSeminovo: number){
        const result = await db.oneOrNone(`
            SELECT
                motorizacao_id AS id_motorizacao,
                preco_id AS id_preco,
                cabine AS id_cabine
            FROM 
                barco_seminovo 
            WHERE 
                id = $1
            `,[idSeminovo])
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