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
WHERE bc.id = 1;