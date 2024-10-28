INSERT INTO preco(valor, moeda_id)
VALUES
    (200, 1),
    (500, 1),
    (100, 1),
    (600, 1),
    (3500, 1),
    (500, 1),
    (800, 1),
    (1500, 1),
    (1800, 1);

INSERT INTO
    imagem(link)
VALUES
    ('https://http2.mlstatic.com/D_NQ_NP_849607-MLB74800340111_022024-O.webp'),
    ('https://www.thiagolanchas.com.br/admin/image/lancha/401/7435lg.jpg'),
    ('https://www.thiagolanchas.com.br/admin/image/lancha/401/7440lg.jpg'),
    ('https://naveguetemporada.com/wp-content/uploads/2023/09/Lancha-Alternativa-21-JGFISHERS-3.jpg'),
    ('https://www.thiagolanchas.com.br/admin/image/lancha/401/7437md.jpg');

INSERT INTO
    taxa_churrasco(preco, mensagem)
VALUES
(2, 'Pagar durante o embarque');



INSERT INTO
    consumo_combustivel(litros_hora, preco_hora, tipo_combustivel)
VALUES
    (70,4,1);

INSERT INTO
    endereco(nome_local, rua, numero, bairro, cidade, uf, cep)
VALUES
    ('Marina da Glória', 'Av. Infante Dom Henrique', 'S/N', 'Glória', 'Rio de Janeiro', 'RJ', '20021-140'),
    ('Iate Clube Icaraí', 'Estrada Leopoldo Fróes', '450', 'São Francisco', 'Niterói', 'RJ', '24360-005'),
    ('Marina da Glória', 'Av. Infante Dom Henrique', 'S/N', 'Glória', 'Rio de Janeiro', 'RJ', '20021-140');



INSERT INTO
    barco_charter(
        modelo_id,
        nome,
        ano,
        tamanho,
        preco,
        passageiros,
        passageiros_pernoite,
        tripulacao,
        duracao_passeio,
        tipo_passeio,
        embarque_principal,
        embarque_alternativo,
        ponto_encontro,
        tripulacao_skipper,
        consumo_combustivel,
        hora_extra,
        aluguel_lancha,
        taxa_churrasco,
        video
    )
VALUES
    (6,'Peaceful Life', '2015', 40, 3, 15, 6, 1, 5, 2, 1, 2, 3, 1, 1, 4, 5, 1, null);

INSERT INTO
    horario_disponivel_passeio(horario_inicio, horario_fim, barco_charter_id)
VALUES
    ('8:00', '13:00', 1),
    ('14:00', '20:00', 1);

INSERT INTO
    item_charter_barco_charter(barco_charter_id, item_seminovo_id, quantidade)
VALUES
    (1,1,2),
    (1,2,3),
    (1,3,3),
    (1,4,1),
    (1,5,1),
    (1,6,1),
    (1,14,1),
    (1,15,1),
    (1,16,1),
    (1,17,1),
    (1,7,1);

INSERT INTO
    imagem_barco_charter(barco_charter_id, imagem_id)
VALUES
    (1, 6),
    (1, 7),
    (1, 8),
    (1, 9),
    (1, 10);

INSERT INTO
    roteiro_prefixado(nome, preco, dias, barco_charter_id)
VALUES
    ('Urca e Praia Vermelha', 6, 1, 1),
    ('Cagarras ou Itaipu', 7, 2, 1),
    ('Urca e Praia Vermelha', 8, 1, 1),
    ('Cagarras ou Itaipu', 9, 2, 1);

INSERT INTO
    condicao_barco_charter(barco_charter_id, condicao_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5);

INSERT INTO
    embarque_alternativo(barco_charter_id, endereco_id, taxa_extra)
VALUES
    (1, 2, 4);
