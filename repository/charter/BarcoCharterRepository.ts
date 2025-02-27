import { CustomError } from "../../infra/CustoError.js";
import db from "../../infra/database.js";

export class BarcoCharterRepository {
    async getBarcoCharter(id:number){
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
pet_friendly.opcao AS pet_friendly,
cons_comb.litros_hora AS consumo_combustivel_litros,
tipo_combustivel.opcao AS consumo_combustivel_tipo_combustivel,
preco_comb.valor AS consumo_combustivel_valor,
moeda_comb.simbolo AS comsumo_combustivel_moeda,
tipo_passeio.opcao AS passeio_tipo_passeio,
passeio.duracao_passeio AS passeio_duracao_passeio,
passeio.id AS passeio_id_passeio,
tripulacao_skipper.opcao AS passeio_tripulacao_skipper,
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
JOIN passeio ON bc.id_passeio = passeio.id 
JOIN tipo_passeio ON passeio.id_tipo_passeio = tipo_passeio.id
JOIN tripulacao_skipper ON passeio.id_tripulacao_skipper = tripulacao_skipper.id
JOIN preco preco_hora_extra ON bc.id_preco_hora_extra = preco_hora_extra.id
JOIN moeda moeda_hora_extra ON preco_hora_extra.id_moeda = moeda_hora_extra.id
JOIN preco preco_aluguel_lancha ON bc.id_preco_aluguel_lancha = preco_aluguel_lancha.id
JOIN moeda moeda_aluguel_lancha ON preco_aluguel_lancha.id_moeda = moeda_aluguel_lancha.id
JOIN taxa_churrasco ON bc.id_taxa_churrasco = taxa_churrasco.id
JOIN preco preco_churrasco ON taxa_churrasco.id_preco = preco_churrasco.id
JOIN moeda moeda_churrasco ON preco_churrasco.id_moeda = moeda_churrasco.id;


        `, [id]) .catch((error) => {
                        throw new CustomError(`Repository level error: BarcoCharterRepository:getBarcoCharter: ${error.message}`, 500)
                    });
                if (!result) {
                    throw new CustomError("barco não existe: id=" + id, 404);
                }
                return result
    }
}