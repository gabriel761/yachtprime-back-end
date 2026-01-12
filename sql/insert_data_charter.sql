SET client_encoding TO 'UTF8';


-- === CHarter 1 (UUID) ===

WITH
-- =========================
-- PREMISSAS FIXAS
-- =========================
precos AS (
  INSERT INTO preco (valor, id_moeda) VALUES
    (100, 1),
    (600, 1),
    (3500, 1),
    (9500, 1),
    (9500, 1),
    (10500, 1),
    (11500, 1),
    (1500, 1),
    (1800, 1)
  RETURNING id
),

imagens AS (
  INSERT INTO imagem (id, link, file_name) VALUES
    (1,'https://p2.trrsf.com/image/fget/cf/1200/900/middle/images.terra.com/2014/03/01/0170running1.jpg', 'file-7'),
    (2,'https://mondblu.com.br/wp-content/uploads/2022/05/01d0f1f6-f540-4d71-ba68-b8b69a542651.jpg', 'file-8'),
    (3,'https://i.ytimg.com/vi/AxyUXPHmYxY/maxresdefault.jpg', 'file-9'),
    (4,'https://marealtacharter.com.br/wp-content/uploads/2020/09/Aluguel-de-barco-ferretti-760-em-Angra-dos-Reis-003.jpg', 'file-10'),
    (5,'https://sailica-prod-main.s3.eu-central-1.amazonaws.com/3342868030000104834/large/1b651ac54ce528a2275d681abbd21a41.jpg', 'file-11')
  RETURNING id
),

taxa AS (
  INSERT INTO taxa_churrasco (id_preco, mensagem)
  VALUES (8,'Pagamento no dia do passeio diretamente ao capitão')
  RETURNING id
),

passageiros AS (
  INSERT INTO passageiros (passageiros, passageiros_pernoite, tripulacao)
  VALUES (10, 4, 2)
  RETURNING id
),

consumo AS (
  INSERT INTO consumo_combustivel (litros_hora, id_preco_hora, id_tipo_combustivel)
  VALUES (50, 1, 2)
  RETURNING id
),

proprietario AS (
  INSERT INTO proprietario (nome, email, telefone)
  VALUES ('Alice Almeida', 'alice.almeida@gmail.com', '+55 21 98391-7378')
  RETURNING id
),



-- =========================
-- BARCO CHARTER (UUID)
-- =========================
charter AS (
  INSERT INTO barco_charter (
    modelo,
    nome,
    ano,
    tamanho,
    id_cidade,
    id_preco,
    id_passageiros,
    id_pet_friendly,
    id_consumo,
    id_preco_hora_extra,
    id_preco_aluguel_lancha,
    id_tipo_passeio,
    id_tripulacao_skipper,
    id_taxa_churrasco,
    video_promocional,
    id_proprietario
  )
  VALUES (
    35,
    'Lancha Luxo',
    2022,
    50,
    1,
    9,
    (SELECT id FROM passageiros),
    1,
    (SELECT id FROM consumo),
    2,
    3,
    1,
    2,
    (SELECT id FROM taxa),
    'https://www.youtube.com/watch?v=EZJ-S9RODF0',
    (SELECT id FROM proprietario)
  )
  RETURNING id
),

-- =========================
-- ROTEIROS
-- =========================
roteiros AS (
  INSERT INTO roteiro (id_barco_charter, nome, descricao, id_preco, detalhes_pagamento)
  SELECT
    c.id,
    r.nome,
    r.descricao,
    r.id_preco,
    r.detalhes
  FROM charter c
  JOIN (
    VALUES
      ('Ilhas Paradisíacas lado norte','Piraquara, Laboratório, Pingo de Agua, Paquetá', 4, 'ou 5x de R$2.090'),
      ('Ilhas Paradisíacas lado sul','Botinas, Piedade, Flechas, Praia do Dentista', 5, 'ou 5x de R$2.090'),
      ('Ilha Grande','Lagoa Azul, Lagoa Verde, Bananal, Aripeba, Sitio Forte', 6, 'ou 5x de R$2.310'),
      ('Ilha Grande 2','Abraão, Saco do Céu, Feguesia, Japariz, Lagoa Azul (e arredores)', 7, 'ou 5x de R$2.530')
  ) r(nome, descricao, id_preco, detalhes)
  ON true
),

-- =========================
-- ITENS CHARTER
-- =========================
itens AS (
  INSERT INTO item_charter_barco_charter (id_barco_charter, id_item_charter, quantidade)
  SELECT c.id, i.item, i.qtd
  FROM charter c
  JOIN (
    VALUES (8,1),(10,2),(12,1)
  ) i(item, qtd)
  ON true
)

-- =========================
-- IMAGENS
-- =========================
INSERT INTO imagem_barco_charter (id_barco_charter, id_imagem)
SELECT c.id, img.id
FROM charter c
JOIN (
  VALUES (1),(2),(3),(4),(5)
) img(id)
ON true;


-- === CHARTER 2 (UUID) ===

WITH
-- =========================
-- PREMISSAS FIXAS
-- =========================
precos AS (
  INSERT INTO preco (valor, id_moeda) VALUES
    (200, 2),
    (500, 2),
    (4500, 2),
    (19500, 2),
    (19500, 2),
    (12500, 2),
    (10500, 2),
    (500, 2),
    (800, 2)
  RETURNING id
),

imagens AS (
  INSERT INTO imagem (id, link, file_name) VALUES
    (6,'https://scontent.fsdu36-1.fna.fbcdn.net/v/t39.30808-6/475994102_10162344623275586_8434066515083635501_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=WRvM6uM69DwQ7kNvwEyDZAi&_nc_oc=AdljSCzU8nDZ8W8XgF2LLujrOHrpg7RNrSGprfuIrXTJkZzfHM_ENtl7XAydbIZ-Hf8&_nc_zt=23&_nc_ht=scontent.fsdu36-1.fna&_nc_gid=1iazIAloJE9QTwuISvuxxQ&oh=00_AfRdq3XYMXWyrb908C_wvc2mSl1XOedeQnGg5agl_rIXDw&oe=68930F89','file-7'),
    (7,'https://static.wixstatic.com/media/762819_769fb8df778045b396e1eee22400efce~mv2.jpg/v1/fill/w_960,h_1280,al_c/762819_769fb8df778045b396e1eee22400efce~mv2.jpg','file-8'),
    (8,'https://storage-pn.sfo3.digitaloceanspaces.com/img/class/23/06/9331_9b49a07b-c8ee-4524-9545-b3ff77749e9c.jpg','file-9'),
    (9,'https://static1.clickandboat.com/v1/p/NJN0vS9qjxuADkN5EiuIYrO07Va3ZHqP.big.jpg','file-10'),
    (10,'https://thebestboats.com.br/wp-content/uploads/2022/11/ferretti60_1-80.jpg','file-11')
  RETURNING id
),

taxa AS (
  INSERT INTO taxa_churrasco (id_preco, mensagem)
  VALUES (17,'Pagamento no dia do passeio diretamente ao capitão')
  RETURNING id
),

passageiros AS (
  INSERT INTO passageiros (passageiros, passageiros_pernoite, tripulacao)
  VALUES (10,4,2)
  RETURNING id
),

consumo AS (
  INSERT INTO consumo_combustivel (litros_hora, id_preco_hora, id_tipo_combustivel)
  VALUES (50,10,2)
  RETURNING id
),

proprietario AS (
  INSERT INTO proprietario (nome,email,telefone)
  VALUES ('Paulo André','broder2208@gmail.com','+55 21 98238-6051')
  RETURNING id
),

-- =========================
-- BARCO CHARTER (UUID)
-- =========================
charter AS (
  INSERT INTO barco_charter (
    modelo,
    nome,
    ano,
    tamanho,
    id_cidade,
    id_preco,
    id_passageiros,
    id_pet_friendly,
    id_consumo,
    id_preco_hora_extra,
    id_preco_aluguel_lancha,
    id_tipo_passeio,
    id_tripulacao_skipper,
    id_taxa_churrasco,
    video_promocional,
    id_proprietario
  )
  VALUES (
    223,
    'Black Pearl',
    2020,
    40,
    1,
    18,
    (SELECT id FROM passageiros),
    1,
    (SELECT id FROM consumo),
    11,
    12,
    1,
    2,
    (SELECT id FROM taxa),
    'https://www.youtube.com/watch?v=FyQivMjb3_8',
    (SELECT id FROM proprietario)
  )
  RETURNING id
),

-- =========================
-- ROTEIROS
-- =========================
roteiros AS (
  INSERT INTO roteiro (id_barco_charter, nome, descricao, id_preco, detalhes_pagamento)
  SELECT
    c.id,
    r.nome,
    r.descricao,
    r.id_preco,
    r.detalhes
  FROM charter c
  JOIN (
    VALUES
      ('Roteiro Histórico Cultural','Centro Histórico de Paraty, Forte Defensor Perpétuo, Praia do Pontal',13,'ou 4x de R$1.750'),
      ('Ilhas Secretas','Ilha dos Meros, Ilhote do Medo, Enseada do Saco do Fundão',14,'ou 6x de R$1.980'),
      ('Tour das Águas Cristalinas','Ilha Comprida, Praia da Lula, Ilha do Algodão',15,'ou 3x de R$2.120'),
      ('Costa Selvagem','Praia do Sono, Antigos, Antiguinhos, Ponta Negra',16,'ou 5x de R$2.300')
  ) r(nome, descricao, id_preco, detalhes)
  ON true
),

-- =========================
-- ITENS CHARTER
-- =========================
itens AS (
  INSERT INTO item_charter_barco_charter (id_barco_charter, id_item_charter, quantidade)
  SELECT c.id, i.item, i.qtd
  FROM charter c
  JOIN (
    VALUES (6,2),(9,1),(11,2)
  ) i(item, qtd)
  ON true
)

-- =========================
-- IMAGENS
-- =========================
INSERT INTO imagem_barco_charter (id_barco_charter, id_imagem)
SELECT c.id, img.id
FROM charter c
JOIN (
  VALUES (6),(7),(8),(9),(10)
) img(id)
ON true;






-- === CHARTER 3 (UUID) ===



WITH
-- =========================
-- PREMISSAS FIXAS
-- =========================
precos AS (
  INSERT INTO preco (valor, id_moeda) VALUES
    (200, 1),
    (500, 1),
    (4500, 1),
    (19500, 1),
    (19500, 1),
    (12500, 1),
    (10500, 1),
    (500, 1),
    (800, 1)
  RETURNING id
),

imagens AS (
  INSERT INTO imagem (id, link, file_name) VALUES
    (11,'https://i.ytimg.com/vi/K8I4yYPabng/maxresdefault.jpg','file-12'),
    (12,'https://nautica.com.br/wp-content/uploads/2023/08/intermarine-640.BX_.jpg','file-13'),
    (13,'https://nautica.com.br/wp-content/uploads/2023/08/INTERMARINE-70_leak_preview-1-1.jpg','file-14'),
    (14,'https://www.portalin.com.br/wp-content/uploads/2022/09/embarcacoes.jpg','file-15'),
    (15,'https://cdn.bombarco.com.br/catalogs/intermarine-im-70-f7ec4a206ce0a97456e65410.jpg','file-16')
  RETURNING id
),

taxa AS (
  INSERT INTO taxa_churrasco (id_preco, mensagem)
  VALUES (26,'Pagamento no dia do passeio diretamente ao capitão')
  RETURNING id
),

passageiros AS (
  INSERT INTO passageiros (passageiros, passageiros_pernoite, tripulacao)
  VALUES (24,16,4)
  RETURNING id
),

consumo AS (
  INSERT INTO consumo_combustivel (litros_hora, id_preco_hora, id_tipo_combustivel)
  VALUES (40,19,1)
  RETURNING id
),

proprietario AS (
  INSERT INTO proprietario (nome,email,telefone)
  VALUES ('Eduardo Omar','eduardo7777@gmail.com','+55 21 96015-3337')
  RETURNING id
),

-- =========================
-- BARCO CHARTER (UUID)
-- =========================
charter AS (
  INSERT INTO barco_charter (
    modelo,
    nome,
    ano,
    tamanho,
    id_cidade,
    id_preco,
    id_passageiros,
    id_pet_friendly,
    id_consumo,
    id_preco_hora_extra,
    id_preco_aluguel_lancha,
    id_tipo_passeio,
    id_tripulacao_skipper,
    id_taxa_churrasco,
    video_promocional,
    id_proprietario
  )
  VALUES (
    224,
    'Wave Beat',
    2023,
    70,
    1,
    27,
    (SELECT id FROM passageiros),
    1,
    (SELECT id FROM consumo),
    20,
    21,
    1,
    2,
    (SELECT id FROM taxa),
    'https://www.youtube.com/watch?v=ndqX4vbR7Rc',
    (SELECT id FROM proprietario)
  )
  RETURNING id
),

-- =========================
-- ROTEIROS
-- =========================
roteiros AS (
  INSERT INTO roteiro (id_barco_charter, nome, descricao, id_preco, detalhes_pagamento)
  SELECT
    c.id,
    r.nome,
    r.descricao,
    r.id_preco,
    r.detalhes
  FROM charter c
  JOIN (
    VALUES
      ('Expedição Azul-Turquesa','Ilha do Japonês, Praia Secreta, Enseada das Águas Claras',22,'ou 4x de R$2.150'),
      ('Oeste Selvagem','Ilha do Cedro, Praia de Fora, Caverna do Macaco',23,'ou 6x de R$2.010'),
      ('Encantos Tropicais','Ilha da Cotia, Ilhote da Saudade, Baía do Engenho',24,'ou 5x de R$2.390'),
      ('Rota dos Pescadores','Saco do Mamanguá, Enseada do Engenho, Ilha do Ventura',25,'ou 3x de R$2.200')
  ) r(nome, descricao, id_preco, detalhes)
  ON true
),

-- =========================
-- ITENS CHARTER
-- =========================
itens AS (
  INSERT INTO item_charter_barco_charter (id_barco_charter, id_item_charter, quantidade)
  SELECT c.id, i.item, i.qtd
  FROM charter c
  JOIN (
    VALUES (2,3),(12,1),(16,2)
  ) i(item, qtd)
  ON true
)

-- =========================
-- IMAGENS
-- =========================
INSERT INTO imagem_barco_charter (id_barco_charter, id_imagem)
SELECT c.id, img.id
FROM charter c
JOIN (
  VALUES (11),(12),(13),(14),(15)
) img(id)
ON true;


WITH
-- =========================
-- PREMISSAS FIXAS
-- =========================
precos AS (
  INSERT INTO preco (valor, id_moeda) VALUES
    (250, 1),
    (600, 1),
    (4800, 1),
    (14500, 1),
    (16500, 1),
    (12000, 1),
    (10000, 1),
    (850, 1),
    (1000, 1)
  RETURNING id
),

imagens AS (
  INSERT INTO imagem (id, link, file_name) VALUES
    (21,'http://www.croatiacharterholidays.com/tolteam/upload/brod/951/v30335jpeg','file-22'),
    (22,'https://cdn.yachtbroker.org/images/highdef/2813616_448d7813_1.jpg','file-23'),
    (23,'https://image.yachtall.com/image/sboat/0/175/743/huge-82c39bfc97.jpg','file-24'),
    (24,'https://tripyacht.com/_next/image/?url=https%3A%2F%2Ftripyacht-yacht-images.s3.amazonaws.com%2Fn10176911%2F6b049f8d53644652fea811fe49684434.jpeg&w=1920&q=75','file-25'),
    (25,'https://day-charter.fr/wp-content/uploads/2017/04/princess-42-charter.jpg','file-26')
  RETURNING id
),

taxa AS (
  INSERT INTO taxa_churrasco (id_preco, mensagem)
  VALUES (28,'Taxa extra para uso da churrasqueira — pagar direto ao capitão')
  RETURNING id
),

passageiros AS (
  INSERT INTO passageiros (passageiros, passageiros_pernoite, tripulacao)
  VALUES (12,4,2)
  RETURNING id
),

consumo AS (
  INSERT INTO consumo_combustivel (litros_hora, id_preco_hora, id_tipo_combustivel)
  VALUES (45,29,1)
  RETURNING id
),

proprietario AS (
  INSERT INTO proprietario (nome,email,telefone)
  VALUES ('Ana Broder','anabroder@gmail.com','+55 21 99629-1858')
  RETURNING id
),

-- =========================
-- BARCO CHARTER (UUID)
-- =========================
charter AS (
  INSERT INTO barco_charter (
    modelo,
    nome,
    ano,
    tamanho,
    id_cidade,
    id_preco,
    id_passageiros,
    id_pet_friendly,
    id_consumo,
    id_preco_hora_extra,
    id_preco_aluguel_lancha,
    id_tipo_passeio,
    id_tripulacao_skipper,
    id_taxa_churrasco,
    video_promocional,
    id_proprietario
  )
  VALUES (
    389,
    'Princess 42 Fly',
    2022,
    42,
    1,
    32,
    (SELECT id FROM passageiros),
    1,
    (SELECT id FROM consumo),
    30,
    31,
    2,
    2,
    (SELECT id FROM taxa),
    'https://www.youtube.com/watch?v=tbqKlcConIY',
    (SELECT id FROM proprietario)
  )
  RETURNING id
),

-- =========================
-- ROTEIROS
-- =========================
roteiros AS (
  INSERT INTO roteiro (id_barco_charter, nome, descricao, id_preco, detalhes_pagamento)
  SELECT
    c.id,
    r.nome,
    r.descricao,
    r.id_preco,
    r.detalhes
  FROM charter c
  JOIN (
    VALUES
      ('Ilha dos Sonhos','Tour pela Ilha do Pelado, Praia da Conceição e Lagoa Azul',33,'ou 4x de R$2.250'),
      ('Caminhos Tropicais','Visita à Ilha do Algodão, Ilha Grande e Freguesia de Santana',34,'ou 5x de R$2.450'),
      ('Litoral Selvagem','Exploração de praias isoladas e natureza intocada em Paraty',35,'ou 3x de R$2.180'),
      ('Passeio VIP ao Entardecer','Navegação com vista para o pôr do sol, música ambiente e drinques a bordo',36,'ou 3x de R$1.980')
  ) r(nome, descricao, id_preco, detalhes)
  ON true
),

-- =========================
-- ITENS CHARTER
-- =========================
itens AS (
  INSERT INTO item_charter_barco_charter (id_barco_charter, id_item_charter, quantidade)
  SELECT c.id, i.item, i.qtd
  FROM charter c
  JOIN (
    VALUES (4,1),(6,2),(10,1)
  ) i(item, qtd)
  ON true
)

-- =========================
-- IMAGENS
-- =========================
INSERT INTO imagem_barco_charter (id_barco_charter, id_imagem)
SELECT c.id, img.id
FROM charter c
JOIN (
  VALUES (21),(22),(23),(24),(25)
) img(id)
ON true;



WITH
-- =========================
-- PREMISSAS FIXAS
-- =========================
precos AS (
  INSERT INTO preco (valor, id_moeda) VALUES
    (300, 1),
    (700, 1),
    (5000, 1),
    (13000, 1),
    (15000, 1),
    (11000, 1),
    (9500, 1),
    (800, 1),
    (950, 1)
  RETURNING id
),

imagens AS (
  INSERT INTO imagem (id, link, file_name) VALUES
    (26,'https://marealtacharter.com.br/wp-content/uploads/2017/12/ALUGUEL-DE-LANCHA-PHANTOM-360-%E2%80%93-CARAGUATATUBA-1.png','file-27'),
    (27,'https://marealtacharter.com.br/wp-content/uploads/2017/12/Aluguel-de-lancha-phantom-360-em-Ilhabela-e-S%C3%A3o-Sebasti%C3%A3o-003.jpg','file-28'),
    (28,'https://marealtacharter.com.br/wp-content/uploads/2017/12/Aluguel-de-lancha-phantom-360-em-Ilhabela-e-S%C3%A3o-Sebasti%C3%A3o-006.jpg','file-29'),
    (29,'https://marealtacharter.com.br/wp-content/uploads/2017/12/lancha-Phantom-5.png','file-30'),
    (30,'https://marealtacharter.com.br/wp-content/uploads/2017/12/lancha-Phantom-2.png','file-31')
  RETURNING id
),

taxa AS (
  INSERT INTO taxa_churrasco (id_preco, mensagem)
  VALUES (37,'Taxa adicional para uso da churrasqueira — pagamento direto ao capitão')
  RETURNING id
),

passageiros AS (
  INSERT INTO passageiros (passageiros, passageiros_pernoite, tripulacao)
  VALUES (10,0,2)
  RETURNING id
),

consumo AS (
  INSERT INTO consumo_combustivel (litros_hora, id_preco_hora, id_tipo_combustivel)
  VALUES (38,38,1)
  RETURNING id
),

proprietario AS (
  INSERT INTO proprietario (nome,email,telefone)
  VALUES ('Alice Almeida','alice.almeida@gmail.com','+55 21 98391-7378')
  RETURNING id
),

-- =========================
-- BARCO CHARTER (UUID)
-- =========================
charter AS (
  INSERT INTO barco_charter (
    modelo,
    nome,
    ano,
    tamanho,
    id_cidade,
    id_preco,
    id_passageiros,
    id_pet_friendly,
    id_consumo,
    id_preco_hora_extra,
    id_preco_aluguel_lancha,
    id_tipo_passeio,
    id_tripulacao_skipper,
    id_taxa_churrasco,
    video_promocional,
    id_proprietario
  )
  VALUES (
    499,
    'Phantom 360',
    2021,
    36,
    1,
    41,
    (SELECT id FROM passageiros),
    1,
    (SELECT id FROM consumo),
    39,
    40,
    2,
    2,
    (SELECT id FROM taxa),
    'https://www.youtube.com/watch?v=miTpJmMt7uo',
    (SELECT id FROM proprietario)
  )
  RETURNING id
),

-- =========================
-- ROTEIROS
-- =========================
roteiros AS (
  INSERT INTO roteiro (id_barco_charter, nome, descricao, id_preco, detalhes_pagamento)
  SELECT
    c.id,
    r.nome,
    r.descricao,
    r.id_preco,
    r.detalhes
  FROM charter c
  JOIN (
    VALUES
      ('Ilha dos Macacos','Passeio por Ilha dos Macacos, Lagoa Azul e Saco da Velha',42,'ou 5x de R$2.200'),
      ('Costa Verde Exuberante','Trilha costeira entre enseadas e praias selvagens de Angra',43,'ou 4x de R$2.100'),
      ('Baía Histórica','Navegação pelas águas tranquilas da Baía de Paraty e visita a vilas coloniais',44,'ou 3x de R$1.850'),
      ('Pôr do Sol na Enseada','Roteiro breve ao entardecer com música e coquetel de boas-vindas',45,'ou 2x de R$1.500')
  ) r(nome, descricao, id_preco, detalhes)
  ON true
),

-- =========================
-- ITENS CHARTER
-- =========================
itens AS (
  INSERT INTO item_charter_barco_charter (id_barco_charter, id_item_charter, quantidade)
  SELECT c.id, i.item, i.qtd
  FROM charter c
  JOIN (
    VALUES (2,1),(5,2),(9,1)
  ) i(item, qtd)
  ON true
)

-- =========================
-- IMAGENS
-- =========================
INSERT INTO imagem_barco_charter (id_barco_charter, id_imagem)
SELECT c.id, img.id
FROM charter c
JOIN (
  VALUES (26),(27),(28),(29),(30)
) img(id)
ON true;



-- === USUARIO PROPRIETARIO ===

INSERT INTO app_user_proprietario (id_app_user, id_proprietario) VALUES
(1, 1),
(2,1)
