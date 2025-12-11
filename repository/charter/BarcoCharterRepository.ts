import config from "../../config.js";
import { CustomError } from "../../infra/CustoError.js";
import db from "../../infra/database.js";
import { BarcoCharterFilters, BarcoCharterInput, BarcoCharterInputWithId, BarcoCharterListDashboardDatabase, BarcoCharterListFrontEndDatabase, BarcoCharterRelatedDB } from "../../types/charter/BarcoCharter.js";

const limit = config.limitQuery || 1

export class BarcoCharterRepository {
    async getBarcoCharter(id: number) {
        const result = await db.oneOrNone(`
SELECT
bc.id,
bc.nome,
modelo.id AS modelo_id,
modelo.modelo AS modelo_modelo,
modelo.marca AS modelo_marca,
bc.ano,
bc.tamanho,
cidade.opcao AS cidade,
preco.valor AS preco_valor,
preco.id AS preco_id,
moeda.simbolo AS preco_moeda,
passageiros.id AS passageiros_id,
passageiros.passageiros AS passageiros_passageiros,
passageiros.passageiros_pernoite,
passageiros.tripulacao AS passageiros_tripulacao,
pet_friendly.id AS pet_friendly_id,
pet_friendly.opcao AS pet_friendly,
cons_comb.litros_hora AS consumo_combustivel_litros,
cons_comb.id AS consumo_combustivel_id,
tipo_combustivel.id AS consumo_combustivel_tipo_combustivel_id,
tipo_combustivel.opcao AS consumo_combustivel_tipo_combustivel,
preco_comb.valor AS consumo_combustivel_valor,
moeda_comb.simbolo AS comsumo_combustivel_moeda,
tipo_passeio.id AS tipo_passeio_id,
tipo_passeio.opcao AS tipo_passeio,
tripulacao_skipper.id AS tripulacao_skipper_id,
tripulacao_skipper.opcao AS tripulacao_skipper,
preco_hora_extra.valor AS preco_hora_extra_valor,
preco_hora_extra.id AS preco_hora_extra_id,
moeda_hora_extra.simbolo AS preco_hora_extra_moeda,
preco_aluguel_lancha.valor AS preco_aluguel_lancha_valor,
preco_aluguel_lancha.id AS preco_aluguel_lancha_id,
moeda_aluguel_lancha.simbolo AS preco_aluguel_lancha_moeda,
preco_churrasco.valor AS taxa_churrasco_valor,
moeda_churrasco.simbolo AS taxa_churrasco_moeda,
taxa_churrasco.id AS taxa_churrasco_id,
taxa_churrasco.mensagem AS taxa_churrasco_mensagem,
video_promocional


FROM barco_charter bc
JOIN modelo_barco modelo ON bc.modelo = modelo.id
JOIN cidade ON bc.id_cidade = cidade.id
JOIN preco ON bc.id_preco = preco.id
JOIN moeda ON preco.id_moeda = moeda.id
JOIN passageiros ON bc.id_passageiros = passageiros.id
JOIN pet_friendly ON bc.id_pet_friendly = pet_friendly.id
JOIN consumo_combustivel cons_comb ON bc.id_consumo = cons_comb.id
JOIN tipo_combustivel ON cons_comb.id_tipo_combustivel = tipo_combustivel.id
JOIN preco preco_comb ON cons_comb.id_preco_hora = preco_comb.id
JOIN moeda moeda_comb ON preco_comb.id_moeda = moeda_comb.id
JOIN tipo_passeio ON id_tipo_passeio = tipo_passeio.id
JOIN tripulacao_skipper ON id_tripulacao_skipper = tripulacao_skipper.id
JOIN preco preco_hora_extra ON bc.id_preco_hora_extra = preco_hora_extra.id
JOIN moeda moeda_hora_extra ON preco_hora_extra.id_moeda = moeda_hora_extra.id
JOIN preco preco_aluguel_lancha ON bc.id_preco_aluguel_lancha = preco_aluguel_lancha.id
JOIN moeda moeda_aluguel_lancha ON preco_aluguel_lancha.id_moeda = moeda_aluguel_lancha.id
JOIN taxa_churrasco ON bc.id_taxa_churrasco = taxa_churrasco.id
JOIN preco preco_churrasco ON taxa_churrasco.id_preco = preco_churrasco.id
JOIN moeda moeda_churrasco ON preco_churrasco.id_moeda = moeda_churrasco.id
WHERE bc.id = $1 AND ativo = true;
        `, [id]).catch((error) => {
            throw new CustomError(`Repository level error: BarcoCharterRepository:getBarcoCharter: ${error.message}`, 500)
        });

        if (!result) {
            throw new CustomError("barco não existe: id=" + id, 404);
        }
        return result
    }
    async getBarcoCharterDashboard(id: number) {
        const result = await db.oneOrNone(`
SELECT
bc.id,
bc.ativo,
bc.nome,
modelo.id AS modelo_id,
modelo.modelo AS modelo_modelo,
modelo.marca AS modelo_marca,
bc.ano,
bc.tamanho,
cidade.opcao AS cidade,
preco.valor AS preco_valor,
preco.id AS preco_id,
moeda.simbolo AS preco_moeda,
passageiros.id AS passageiros_id,
passageiros.passageiros AS passageiros_passageiros,
passageiros.passageiros_pernoite,
passageiros.tripulacao AS passageiros_tripulacao,
pet_friendly.id AS pet_friendly_id,
pet_friendly.opcao AS pet_friendly,
cons_comb.litros_hora AS consumo_combustivel_litros,
cons_comb.id AS consumo_combustivel_id,
tipo_combustivel.id AS consumo_combustivel_tipo_combustivel_id,
tipo_combustivel.opcao AS consumo_combustivel_tipo_combustivel,
proprietario.id AS proprietario_id,
proprietario.nome AS proprietario_nome,
proprietario.email AS proprietario_email,
proprietario.telefone AS proprietario_telefone,
preco_comb.valor AS consumo_combustivel_valor,
moeda_comb.simbolo AS comsumo_combustivel_moeda,
tipo_passeio.id AS tipo_passeio_id,
tipo_passeio.opcao AS tipo_passeio,
tripulacao_skipper.id AS tripulacao_skipper_id,
tripulacao_skipper.opcao AS tripulacao_skipper,
preco_hora_extra.valor AS preco_hora_extra_valor,
preco_hora_extra.id AS preco_hora_extra_id,
moeda_hora_extra.simbolo AS preco_hora_extra_moeda,
preco_aluguel_lancha.valor AS preco_aluguel_lancha_valor,
preco_aluguel_lancha.id AS preco_aluguel_lancha_id,
moeda_aluguel_lancha.simbolo AS preco_aluguel_lancha_moeda,
preco_churrasco.valor AS taxa_churrasco_valor,
moeda_churrasco.simbolo AS taxa_churrasco_moeda,
taxa_churrasco.id AS taxa_churrasco_id,
taxa_churrasco.mensagem AS taxa_churrasco_mensagem,
video_promocional


FROM barco_charter bc
JOIN modelo_barco modelo ON bc.modelo = modelo.id
JOIN cidade ON bc.id_cidade = cidade.id
JOIN preco ON bc.id_preco = preco.id
JOIN moeda ON preco.id_moeda = moeda.id
JOIN passageiros ON bc.id_passageiros = passageiros.id
JOIN pet_friendly ON bc.id_pet_friendly = pet_friendly.id
JOIN consumo_combustivel cons_comb ON bc.id_consumo = cons_comb.id
JOIN tipo_combustivel ON cons_comb.id_tipo_combustivel = tipo_combustivel.id
JOIN proprietario ON bc.id_proprietario = proprietario.id
JOIN preco preco_comb ON cons_comb.id_preco_hora = preco_comb.id
JOIN moeda moeda_comb ON preco_comb.id_moeda = moeda_comb.id
JOIN tipo_passeio ON id_tipo_passeio = tipo_passeio.id
JOIN tripulacao_skipper ON id_tripulacao_skipper = tripulacao_skipper.id
JOIN preco preco_hora_extra ON bc.id_preco_hora_extra = preco_hora_extra.id
JOIN moeda moeda_hora_extra ON preco_hora_extra.id_moeda = moeda_hora_extra.id
JOIN preco preco_aluguel_lancha ON bc.id_preco_aluguel_lancha = preco_aluguel_lancha.id
JOIN moeda moeda_aluguel_lancha ON preco_aluguel_lancha.id_moeda = moeda_aluguel_lancha.id
JOIN taxa_churrasco ON bc.id_taxa_churrasco = taxa_churrasco.id
JOIN preco preco_churrasco ON taxa_churrasco.id_preco = preco_churrasco.id
JOIN moeda moeda_churrasco ON preco_churrasco.id_moeda = moeda_churrasco.id
WHERE bc.id = $1;
        `, [id]).catch((error) => {
            throw new CustomError(`Repository level error: BarcoCharterRepository:getBarcoCharter: ${error.message}`, 500)
        });

        if (!result) {
            throw new CustomError("barco não existe: id=" + id, 404);
        }
        return result
    }

    async listBarcoCharterDashboard(): Promise<BarcoCharterListDashboardDatabase[]> {
        const result = await db.query(`
            SELECT
                bc.id,
                bc.ativo,
				im.link AS imagem,
                bc.nome,
                mb.modelo,
                tamanho,
                md.simbolo AS preco_moeda,
                pr.valor AS preco_valor,
                pa.passageiros

                FROM barco_charter AS bc
                JOIN modelo_barco AS mb ON bc.modelo = mb.id 
                JOIN preco AS pr ON bc.id_preco = pr.id
                JOIN moeda AS md ON pr.id_moeda = md.id
                JOIN passageiros AS pa ON bc.id_passageiros = pa.id
                LEFT JOIN imagem_barco_charter ibc ON bc.id = ibc.id_barco_charter
                LEFT JOIN imagem im ON ibc.id_imagem = im.id
            WHERE 
                ibc.id = (SELECT MIN(ibc2.id) 
                FROM imagem_barco_charter ibc2 
                WHERE ibc2.id_barco_charter = bc.id) 
            ORDER BY
                mb.modelo;
            `)
            .catch((error) => {
                throw new CustomError(`Repository level error: BarcoChaterRepository:listBarcoCharterDashboard: ${error.message}`, 500)
            })
        if (!result) {
            throw new CustomError("Erro ao listar barco charters. Nenhum barco encontrado" + result, 404);
        }
        return result
    }

    

    async listBarcoCharterFrontEnd(filters: BarcoCharterFilters): Promise<BarcoCharterListFrontEndDatabase[]> {
        const { cidade, tipoPasseio, capacidade, page = 1 } = filters;
     
        // Array para armazenar as condições
        const whereConditions: string[] = [];
        const params: any[] = []; // Valores para os placeholders do query

        // Adiciona a condição para 'modelo', se existir
        if (cidade) {
            whereConditions.push(`cd.opcao ILIKE $${params.length + 1}`);
            params.push(cidade); // Adiciona os wildcards
        }


       
        if (tipoPasseio) {
            whereConditions.push(`tp.opcao = $${params.length + 1}`);
            params.push(tipoPasseio);
        }

        if(capacidade){
            whereConditions.push(`pa.passageiros >= $${params.length + 1}`)
            params.push(capacidade)
        }

        // Adiciona a condição para pegar a menor imagem, que é sempre fixa
        whereConditions.push(`
         ibc.id = (SELECT MIN(ibc2.id) 
                FROM imagem_barco_charter ibc2 
                WHERE ibc2.id_barco_charter = bc.id)
    `);

        // Constrói a cláusula WHERE final
        const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';
        const offset = (page - 1) * limit;
        // Query final
        const query = `
            SELECT
                bc.id,
				im.link AS imagem,
                cd.opcao AS cidade,
                mb.modelo,
                bc.tamanho,
                md.simbolo AS preco_moeda,
                pr.valor AS preco_valor,
                pa.passageiros,
				pa.passageiros_pernoite AS passageiros_pernoite,
				ts.opcao AS tripulacao_skipper,
				tp.opcao AS tipo_passeio

                FROM barco_charter AS bc
                JOIN modelo_barco AS mb ON bc.modelo = mb.id
				JOIN tripulacao_skipper AS ts ON bc.id_tripulacao_skipper = ts.id
				JOIN cidade AS cd ON bc.id_cidade = cd.id
                JOIN preco AS pr ON bc.id_preco = pr.id
                JOIN moeda AS md ON pr.id_moeda = md.id
                JOIN passageiros AS pa ON bc.id_passageiros = pa.id
				JOIN tipo_passeio AS tp ON bc.id_tipo_passeio = tp.id
                LEFT JOIN imagem_barco_charter ibc ON bc.id = ibc.id_barco_charter
                LEFT JOIN imagem im ON ibc.id_imagem = im.id
            ${whereClause} AND bc.ativo = true
           LIMIT $${params.length + 1} OFFSET $${params.length + 2}
            `;
           
        params.push(limit, offset);

        console.log('Final Query:', query);
        console.log('Query Parameters:', params);
        const result = await db.query(query, params).catch((error) => {
            throw new CustomError(`Repository level error: BarcoChaterRepository:listBarcoCharterFrontEnd: ${error.message}`, 500)
        })
        if (!result) {
            throw new CustomError("Erro ao listar barco charters. Nenhum barco encontrado" + result, 404);
        }
        return result;

    }
    async getTotalPagesForPagination(filters: BarcoCharterFilters): Promise<number> {
        const { cidade, tipoPasseio, capacidade } = filters;

        const whereConditions: string[] = [];
        const params: any[] = [];

        if (cidade) {
            whereConditions.push(`cd.opcao ILIKE $${params.length + 1}`);
            params.push(cidade);
        }

        if (tipoPasseio) {
            whereConditions.push(`tp.opcao = $${params.length + 1}`);
            params.push(tipoPasseio);
        }

        if (capacidade) {
            whereConditions.push(`pa.passageiros >= $${params.length + 1}`);
            params.push(capacidade);
        }

        const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

        const countQuery = `
        SELECT COUNT(*) AS total
        FROM barco_charter AS bc
        JOIN modelo_barco AS mb ON bc.modelo = mb.id
        JOIN tripulacao_skipper AS ts ON bc.id_tripulacao_skipper = ts.id
        JOIN cidade AS cd ON bc.id_cidade = cd.id
        JOIN preco AS pr ON bc.id_preco = pr.id
        JOIN moeda AS md ON pr.id_moeda = md.id
        JOIN passageiros AS pa ON bc.id_passageiros = pa.id
        JOIN tipo_passeio AS tp ON bc.id_tipo_passeio = tp.id
        ${whereClause}
    `;

        const countResult = await db.query(countQuery, params);
        const totalItems = parseInt(countResult[0].total, 10);
        return Math.ceil(totalItems / limit);
    }


    async getIdsByIdCharter(idChater: number) {

        const result = await db.oneOrNone(`
             SELECT
               bc.id_preco,
                id_passageiros,
                id_cidade,
                id_preco_hora_extra,
                id_preco_aluguel_lancha,
                id_taxa_churrasco,
				taxa_churrasco.id_preco AS taxa_churrasco_id_preco,
                id_pet_friendly,
	            id_consumo,
                id_tipo_passeio,
                id_tripulacao_skipper
            FROM 
                barco_charter bc
				JOIN taxa_churrasco ON id_taxa_churrasco = taxa_churrasco.id
            WHERE 
                bc.id = $1
            `, [idChater])
            .catch((error) => {
                throw new CustomError(`Repository level error: BarcoChaterRepository:getIdsByIdChater: ${error.message}`, 500)
            })
        if (!result) {
            throw new CustomError("Erro ao pegar ids de barco charter. Barco não encontrado: id=" + result, 404);
        }
        return result
    }

    async getRelatedCharters(idCharter: number): Promise<BarcoCharterRelatedDB[]> {
        try {
            const result = await db.query(`
            SELECT 
                bc.id,
                p.valor AS preco_valor,
				mo.simbolo AS preco_moeda,
                m.modelo AS modelo,
                im.link AS imagem
            FROM 
                barco_charter bc
            JOIN 
                preco p ON bc.id_preco = p.id
			JOIN
				moeda mo ON p.id_moeda = mo.id
            JOIN
                modelo_barco m ON bc.modelo = m.id
            JOIN 
                imagem_barco_charter ibc ON bc.id = ibc.id_barco_charter
            JOIN 
                imagem im ON ibc.id_imagem = im.id 
				
            WHERE 
                ibc.id = (
                SELECT MIN(ibc2.id) 
                FROM imagem_barco_charter ibc2 
                WHERE ibc2.id_barco_charter = bc.id
            )
			AND bc.id <> $1 -- exclui o barco base
            AND bc.ativo = true
            ORDER BY 
                ABS(p.valor - (
                    SELECT p2.valor
                    FROM barco_seminovo bc2
                    JOIN preco p2 ON bc2.id_preco = p2.id
                    WHERE bc2.id = $1
                )) ASC
            LIMIT 3;
            `, [idCharter])
            return result
        } catch (error: any) {
            throw new CustomError(`Repository level error: BarcoCharterRepository:getRelatedCharter: ${error.message}`, 500)
        }

    }


    async insertBarcoCharter(barcoCharter: BarcoCharterInput, idModel?: number, idPreco?: number, idPassageiros?: number, idCidade?:number, idPetFriendly?: number, idConsumo?: number, idProprietario?: number, idTipoPasseio?: number, idTripulacaoSkipper?: number, idPrecoHora?: number, idPrecoAluguel?: number, idTaxaChurrasco?: number) {
        
        const result = await db.query(`
    INSERT INTO barco_charter (
    modelo, nome, ano, tamanho, id_preco, id_passageiros, id_cidade,
    id_pet_friendly, id_consumo, id_proprietario, id_tipo_passeio, id_tripulacao_skipper,
    id_preco_hora_extra, id_preco_aluguel_lancha, id_taxa_churrasco, video_promocional
    ) VALUES (
    $1, $2, $3, $4, $5, $6, 
    $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
    ) 
    RETURNING id;
    `, [idModel, barcoCharter.nome, barcoCharter.ano, barcoCharter.tamanho, idPreco, idPassageiros, idCidade, idPetFriendly, idConsumo, idProprietario, idTipoPasseio, idTripulacaoSkipper, idPrecoHora, idPrecoAluguel, idTaxaChurrasco, barcoCharter.videoPromocional])
            .catch((error) => {
                throw new CustomError(`Repository level error: BarcoCharterRepository:insertBarcoCharter: ${error.message}`, 500)
            })

        return result[0].id
    }

    async updateBarcoCharter(barcoCharter: BarcoCharterInputWithId, idModel?: number, idCidade?:number, idProprietario?: number) {
        console.log("barco charter repository:", barcoCharter)
        await db.query(`
    UPDATE barco_charter SET
    ativo=$1,
    modelo=$2, 
    nome=$3, 
    ano=$4, 
    tamanho=$5,
    id_cidade=$6,
    id_proprietario=$7, 
    id_pet_friendly=$8, 
    id_tipo_passeio=$9, 
    id_tripulacao_skipper=$10,
    video_promocional=$11 WHERE id=$12;
    `, [barcoCharter.ativo ,idModel, barcoCharter.nome, barcoCharter.ano, barcoCharter.tamanho, idCidade, idProprietario, barcoCharter.petFriendly.id,barcoCharter.tipoPasseio.id, barcoCharter.tripulacaoSkipper.id, barcoCharter.videoPromocional, barcoCharter.id])
            .catch((error) => {
                throw new CustomError(`Repository level error: BarcoCharterRepository:updateBarcoCharter: ${error.message}`, 500)
            })

    }

    async deleteBarcoCharter(idBarcoCharter: number){
        await db.query("DELETE FROM barco_charter WHERE id=$1", [idBarcoCharter]).catch((error) => {
            throw new CustomError(`Repository level error: BarcoCharterRepository:deleteBarcoCharter: ${error.message}`, 500)
        })
    }

}