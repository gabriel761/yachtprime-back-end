import db from "../infra/database.ts";

class BarcoSeminovoRepository {
    async getBarcoSeminovo() {
        const result = await db.query(`
SELECT
    bs.id AS barco_id,
    bs.nome AS nome_barco,
    bs.ano AS ano_barco,
    bs.tamanho AS tamanho_barco,
    mc.marca AS marca_modelo,
    mc.modelo AS modelo_modelo,
    m.quantidade AS quantidade_motor,
    m.potencia AS potencia_motor,
    m.horas AS horas_motor,
    m.ano AS ano_motor,
    m.observacoes AS observacoes_motor,
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
    JOIN modelo_cadastrado mc ON bs.modelo_id = mc.id
    JOIN motor m ON bs.motor_id = m.id
    JOIN tipo_combustivel tc ON bs.combustivel = tc.id
    JOIN propulsao p ON bs.propulsao = p.id
    JOIN cabine c ON bs.cabine = c.id
    JOIN preco pr ON bs.preco_id = pr.id
    JOIN moeda mo ON pr.moeda_id = mo.id
WHERE
    bs.id = 1;
`);
        return result
    }
}


export default BarcoSeminovoRepository