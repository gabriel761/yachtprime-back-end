import { CustomError } from "../infra/CustoError.ts";
import db from "../infra/database.ts";
import { BarcoSeminovoClient } from "../types/BarcoSeminovoClient.ts";


class BarcoSeminovoRepository {
    async getBarcoSeminovo(id: number) {
        const result = await db.oneOrNone(`
SELECT
    bs.id AS barco_id,
    bs.nome AS nome_barco,
    bs.ano AS ano_barco,
    bs.tamanho AS tamanho_barco,
    mc.marca AS marca_modelo,
    mc.modelo AS modelo_modelo,
    m.quantidade AS quantidade_motorizacao,
    m.potencia AS potencia_motorizacao,
    bs.potencia_total AS potencia_total,
    m.horas AS horas_motorizacao,
    m.ano AS ano_motorizacao,
    m.observacoes AS observacoes_motorizacao,
    mc_motor.marca AS marca_motor,
    mc_motor.modelo AS modelo_motor,
    tc.opcao AS tipo_combustivel,
    p.opcao AS tipo_propulsao,
    c.passageiro AS capacidade_passageiro,
    c.tripulacao AS capacidade_tripulacao,
    bs.procedencia,
    bs.destaque,
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
    bs.id = 1;


`, [id]);
        if (!result) {
            throw new CustomError("barco não existe", 404)
        }
        return result
    }

    async insertBarcoSeminovo(barcoSeminovoDTO: BarcoSeminovoClient, idMotorizacao: number, idCabine: number, idPreco: number, idCombustivel: number, idModelo: number, idPropulsao: number) {
        const idBarco = await db.one("INSERT INTO barco_seminovo (modelo_id, nome, ano, tamanho, motorizacao_id, potencia_total, combustivel, propulsao, cabine, procedencia, destaque, preco_id, video) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12, $13) RETURNING id", [idModelo,barcoSeminovoDTO.nome, barcoSeminovoDTO.ano, barcoSeminovoDTO.tamanho, idMotorizacao, barcoSeminovoDTO.potenciaTotal, idCombustivel, idPropulsao, idCabine, barcoSeminovoDTO.procedencia, barcoSeminovoDTO.destaque, idPreco, barcoSeminovoDTO.videoPromocional])
        return idBarco.id
    }
}




export default BarcoSeminovoRepository