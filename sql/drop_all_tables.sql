SET client_encoding TO 'UTF8';

-- Desativar restrições temporariamente
SET session_replication_role = 'replica';
DROP TABLE IF EXISTS 
    passeio_condicoes,
    item_charter_barco_charter,
    imagens_barco_charter,
    barco_charter,
    passeio,
    consumo_combustivel,
    roteiros_prefixados,
    taxa_churrasco,
    tripulacao_skipper,
    tipo_passeio,
    horarios_disponiveis,
    opcoes_de_dias,
    roteiros_livres,
    passageiros,
    condicao,
    local_embarque,
    item_charter,
    pet_friendly,
    item_seminovo_barco_seminovo,
    imagem_barco_seminovo,
    imagem,
    barco_seminovo,
    propulsao,
    cabine,
    tipo_combustivel,
    modelo_barco,
    item_seminovo,
    preco,
    moeda,
    motorizacao,
    motor_cadastrado 
CASCADE;


-- Reativar restrições
SET session_replication_role = 'origin';
