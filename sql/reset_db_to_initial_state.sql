TRUNCATE TABLE
    -- tabelas filhas primeiro
    imagem_barco_seminovo,
    item_seminovo_barco_seminovo,
    imagem_barco_charter,
    item_charter_barco_charter,
    barco_charter_condicoes,
    roteiro,
    proprietario,

    -- tabelas principais
    barco_seminovo,
    barco_charter,

    motorizacao,
    consumo_combustivel,
    taxa_churrasco,
    preco,
    imagem,
    cabine,
    passageiros

RESTART IDENTITY CASCADE;
