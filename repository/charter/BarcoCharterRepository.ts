import { CustomError } from "../../infra/CustoError.js";
import db from "../../infra/database.js";
import { BarcoCharterInput, BarcoCharterInputWithId } from "../../types/charter/BarcoCharter.js";

export class BarcoCharterRepository {
    async getBarcoCharter(id: number) {
        const result = await db.oneOrNone(`
SELECT
bc.id,
bc.nome,
modelo.modelo AS modelo_modelo,
modelo.marca AS modelo_marca,
bc.ano,
bc.tamanho,
preco.valor AS preco_valor,
moeda.simbolo AS preco_moeda,
passageiros.passageiros AS passageiros_passageiros,
passageiros.passageiros_pernoite,
passageiros.tripulacao AS passageiros_tripulacao,
pet_friendly.id AS pet_friendly_id,
pet_friendly.opcao AS pet_friendly,
cons_comb.litros_hora AS consumo_combustivel_litros,
tipo_combustivel.id AS consumo_combustivel_tipo_combustivel_id,
tipo_combustivel.opcao AS consumo_combustivel_tipo_combustivel,
preco_comb.valor AS consumo_combustivel_valor,
moeda_comb.simbolo AS comsumo_combustivel_moeda,
tipo_passeio.id AS tipo_passeio_id,
tipo_passeio.opcao AS tipo_passeio,
tripulacao_skipper.id AS tripulacao_skipper_id,
tripulacao_skipper.opcao AS tripulacao_skipper,
preco_hora_extra.valor AS preco_hora_extra_valor,
moeda_hora_extra.simbolo AS preco_hora_extra_moeda,
preco_aluguel_lancha.valor AS preco_aluguel_lancha_valor,
moeda_aluguel_lancha.simbolo AS preco_aluguel_lancha_moeda,
preco_churrasco.valor AS taxa_churrasco_valor,
moeda_churrasco.simbolo AS taxa_churrasco_moeda,
taxa_churrasco.mensagem AS taxa_churrasco_mensagem,
video_promocional


FROM barco_charter bc
JOIN modelo_barco modelo ON bc.modelo = modelo.id
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
WHERE bc.id = $1;

        `, [id]).catch((error) => {
            throw new CustomError(`Repository level error: BarcoCharterRepository:getBarcoCharter: ${error.message}`, 500)
        });

        if (!result) {
            throw new CustomError("barco não existe: id=" + id, 404);
        }
        return result
    }

    async getIdsByIdCharter(idChater: number) {

        const result = await db.oneOrNone(`
             SELECT
               bc.id_preco,
                id_passageiros,
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
                bc.id = 1
            `, [idChater])
            .catch((error) => {
                throw new CustomError(`Repository level error: BarcoChaterRepository:getIdsByIdChater: ${error.message}`, 500)
            })
        if (!result) {
            throw new CustomError("Erro ao pegar ids de barco charter. Barco não encontrado: id=" + result, 404);
        }
        return result
    }

    async insertBarcoCharter(barcoCharter: BarcoCharterInput, idModel?: number, idPreco?: number, idPassageiros?: number, idPetFriendly?: number, idConsumo?: number, idTipoPasseio?: number, idTripulacaoSkipper?: number, idPrecoHora?: number, idPrecoAluguel?: number, idTaxaChurrasco?: number) {
        const result = await db.query(`
    INSERT INTO barco_charter (
    modelo, nome, ano, tamanho, id_preco, id_passageiros, 
    id_pet_friendly, id_consumo, id_tipo_passeio, id_tripulacao_skipper,
    id_preco_hora_extra, id_preco_aluguel_lancha, id_taxa_churrasco, video_promocional
    ) VALUES (
    $1, $2, $3, $4, $5, $6, 
    $7, $8, $9, $10, $11, $12, $13, $14
    ) 
    RETURNING id;
    `, [idModel, barcoCharter.nome, barcoCharter.ano, barcoCharter.tamanho, idPreco, idPassageiros, idPetFriendly, idConsumo, idTipoPasseio, idTripulacaoSkipper, idPrecoHora, idPrecoAluguel, idTaxaChurrasco, barcoCharter.videoPromocional])
            .catch((error) => {
                throw new CustomError(`Repository level error: BarcoCharterRepository:insertBarcoCharter: ${error.message}`, 500)
            })

        return result[0].id
    }

    async updateBarcoCharter(barcoCharter: BarcoCharterInputWithId, idModel?: number, idPreco?: number, idPassageiros?: number,  idConsumo?: number,  idPrecoHora?: number, idPrecoAluguel?: number, idTaxaChurrasco?: number) {
        await db.query(`
    UPDATE barco_charter SET
    modelo=$1, nome=$2, ano=$3, tamanho=$4, id_preco=$5, id_passageiros=$6, 
    id_pet_friendly=$7, id_consumo=$8, id_tipo_passeio=$9, id_tripulacao_skipper=$10,
    id_preco_hora_extra=$11, id_preco_aluguel_lancha=$12, id_taxa_churrasco=$13, video_promocional=$14 WHERE id=$15;
    `, [idModel, barcoCharter.nome, barcoCharter.ano, barcoCharter.tamanho, idPreco, idPassageiros, barcoCharter.petFriendly.id, idConsumo, barcoCharter.tipoPasseio.id, barcoCharter.tripulacaoSkipper.id, idPrecoHora, idPrecoAluguel, idTaxaChurrasco, barcoCharter.videoPromocional, barcoCharter.id])
            .catch((error) => {
                throw new CustomError(`Repository level error: BarcoCharterRepository:updateBarcoCharter: ${error.message}`, 500)
            })

    }



}