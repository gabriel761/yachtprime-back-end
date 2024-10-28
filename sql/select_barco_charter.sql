SELECT
    bc.id AS barco_charter_id,
    bc.nome AS nome_barco_charter,
    bc.ano AS ano_barco_charter,
    bc.tamanho AS tamanho_barco_charter,
    mc.marca AS marca_modelo,
    mc.modelo AS modelo_modelo,
    bc.passageiros AS quantidade_passageiros,
    bc.passageiros_pernoite AS quantidade_passageiros_pernoite,
    bc.tripulacao AS tripulacao,
    bc.duracao_passeio AS duracao_passeio,
    pr.valor AS preco,
    mo.nome AS moeda_nome,
    mo.simbolo AS moeda_simbolo,
    bc.video AS video_barco_charter,
    tp.opcao AS tipo_passeio,
    ed.nome_local AS embarque_principal_local,
    ed.rua AS embarque_principal_rua,
    ed.numero AS embarque_principal_numero,
    ed.bairro AS embarque_principal_bairro,
    ed.cidade AS embarque_principal_cidade,
    ed.uf AS embarque_principal_uf,
    ed.cep AS embarque_principal_cep,
    tc.opcao AS tripulacao_skipper_opcao,
    cc.litros_hora AS consumo_litros_hora,
    cc.preco_hora AS preco_consumo_hora,
    bc.hora_extra AS valor_hora_extra,
    bc.aluguel_lancha AS valor_aluguel_lancha,
    tc2.mensagem AS taxa_churrasco_mensagem 
FROM
    barco_charter bc
    JOIN modelo_cadastrado mc ON bc.modelo_id = mc.id
    JOIN preco pr ON bc.preco = pr.id
    JOIN moeda mo ON pr.moeda_id = mo.id
    JOIN tipo_passeio tp ON bc.tipo_passeio = tp.id
    JOIN endereco ed ON bc.embarque_principal = ed.id
    JOIN tripulacao_skipper tc ON bc.tripulacao_skipper = tc.id
    JOIN consumo_combustivel cc ON bc.consumo_combustivel = cc.id
    LEFT JOIN taxa_churrasco tc2 ON bc.taxa_churrasco = tc2.id
WHERE
    bc.id = 1;