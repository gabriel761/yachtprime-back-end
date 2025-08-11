SELECT

    (SELECT COUNT(*) FROM motorizacao) AS motorizacao,
    (SELECT COUNT(*) FROM preco) AS preco,
    (SELECT COUNT(*) FROM cabine) AS cabine,
    (SELECT COUNT(*) FROM barco_seminovo) AS barco_seminovo,
    (SELECT COUNT(*) FROM imagem) AS imagem,
    (SELECT COUNT(*) FROM imagem_barco_seminovo) AS imagem_barco_seminovo,
    (SELECT COUNT(*) FROM item_seminovo_barco_seminovo) AS item_seminovo_barco_seminovo,
    
    -- CHARTER
	
    (SELECT COUNT(*) FROM passageiros) AS passageiros,
    (SELECT COUNT(*) FROM taxa_churrasco) AS taxa_churrasco,
    (SELECT COUNT(*) FROM consumo_combustivel) AS consumo_combustivel,
    (SELECT COUNT(*) FROM barco_charter) AS barco_charter,
    (SELECT COUNT(*) FROM roteiro) AS roteiro,
    (SELECT COUNT(*) FROM imagem_barco_charter) AS imagem_barco_charter,
    (SELECT COUNT(*) FROM item_charter_barco_charter) AS item_charter_barco_charter,
    (SELECT COUNT(*) FROM barco_charter_condicoes) AS barco_charter_condicoes;

