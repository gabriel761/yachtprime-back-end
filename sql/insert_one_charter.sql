SET client_encoding TO 'UTF8';

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
  INSERT INTO imagem (link, file_name) VALUES
    ('https://p2.trrsf.com/image/fget/cf/1200/900/middle/images.terra.com/2014/03/01/0170running1.jpg', 'file-7'),
    ('https://mondblu.com.br/wp-content/uploads/2022/05/01d0f1f6-f540-4d71-ba68-b8b69a542651.jpg', 'file-8'),
    ('https://i.ytimg.com/vi/AxyUXPHmYxY/maxresdefault.jpg', 'file-9'),
    ('https://marealtacharter.com.br/wp-content/uploads/2020/09/Aluguel-de-barco-ferretti-760-em-Angra-dos-Reis-003.jpg', 'file-10'),
    ('https://sailica-prod-main.s3.eu-central-1.amazonaws.com/3342868030000104834/large/1b651ac54ce528a2275d681abbd21a41.jpg', 'file-11')
  RETURNING id
),

taxa AS (
  INSERT INTO taxa_churrasco (id_preco, mensagem)
  VALUES (
    (SELECT id FROM precos OFFSET 7 LIMIT 1),
    'Pagamento no dia do passeio diretamente ao capitão'
  )
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
    (SELECT id FROM precos OFFSET 8 LIMIT 1),
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
  RETURNING id -- UUID
),

-- =========================
-- ROTEIROS
-- =========================
roteiros AS (
  INSERT INTO roteiro (
    id_barco_charter,
    nome,
    descricao,
    id_preco,
    detalhes_pagamento
  )
  SELECT
    c.id,
    r.nome,
    r.descricao,
    r.id_preco,
    r.detalhes
  FROM charter c
  CROSS JOIN (
    VALUES
      ('Ilhas Paradisíacas lado norte','Piraquara, Laboratório, Pingo de Agua, Paquetá', 4, 'ou 5x de R$2.090'),
      ('Ilhas Paradisíacas lado sul','Botinas, Piedade, Flechas, Praia do Dentista', 5, 'ou 5x de R$2.090'),
      ('Ilha Grande','Lagoa Azul, Lagoa Verde, Bananal, Aripeba, Sitio Forte', 6, 'ou 5x de R$2.310'),
      ('Ilha Grande 2','Abraão, Saco do Céu, Feguesia, Japariz, Lagoa Azul (e arredores)', 7, 'ou 5x de R$2.530')
  ) r(nome, descricao, id_preco, detalhes)
),

-- =========================
-- ITENS CHARTER
-- =========================
itens AS (
  INSERT INTO item_charter_barco_charter (
    id_barco_charter,
    id_item_charter,
    quantidade
  )
  SELECT
    c.id,
    i.id_item,
    i.quantidade
  FROM charter c
  CROSS JOIN (
    VALUES
      (8, 1),
      (10, 2),
      (12, 1)
  ) i(id_item, quantidade)
)

-- =========================
-- IMAGENS
-- =========================
INSERT INTO imagem_barco_charter (
  id_barco_charter,
  id_imagem
)
SELECT
  c.id,
  i.id
FROM charter c
CROSS JOIN imagens i;


-- =========================
-- CONDIÇÕES
-- =========================

INSERT INTO condicoes_charter (
    opcao
  )
  SELECT
    cp.opcao
  FROM   condicoes_padrao cp;

  INSERT INTO barco_charter_condicoes_charter(
    id_barco_charter,
    id_condicoes_charter
  )
  SELECT 
    c.id,
    cc.id
  FROM barco_charter c
  CROSS JOIN condicoes_charter cc;