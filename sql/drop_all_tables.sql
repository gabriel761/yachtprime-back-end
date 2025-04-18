SET client_encoding TO 'UTF8';

-- Desativar restrições temporariamente
SET session_replication_role = 'replica';
DROP TABLE IF EXISTS 
    item_charter_barco_charter,
    barco_charter_condicoes,
    imagem_barco_charter,
    barco_charter,
    consumo_combustivel,
    roteiro,
    taxa_churrasco,
    tripulacao_skipper,
    tipo_passeio,
    passageiros,
    condicao,
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
