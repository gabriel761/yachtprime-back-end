
SET client_encoding TO 'UTF8';

-- ========== Seminovo 1 -==========


WITH
preco_1 AS (
  INSERT INTO preco (valor, id_moeda)
  VALUES (85000000, 1)
  RETURNING id
),
cabine_1 AS (
  INSERT INTO cabine (passageiro, tripulacao)
  VALUES (5,1)
  RETURNING id
),
motor_1 AS (
  INSERT INTO motorizacao (quantidade, potencia, horas, ano, observacoes, id_motor)
  VALUES (2,1400,150,2016,null,36)
  RETURNING id
),
proprietario_1 AS (
  INSERT INTO proprietario (nome,email,telefone)
  VALUES ('João Gabriel','jg.7651@gmail.com','(21) 96018-3131')
  RETURNING id
),
seminovo_1 AS (
  INSERT INTO barco_seminovo (
    ativo, id_modelo, nome, ano, tamanho,
    id_motorizacao, potencia_total, id_combustivel,
    id_propulsao, id_cabine, procedencia, destaque,
    id_preco, id_proprietario
  )
  SELECT
    true,3,'Sea View',2016,50,
    motor_1.id,2800,1,
    3,cabine_1.id,'Brasil','Guardado no seco por 212 horas',
    preco_1.id,proprietario_1.id
  FROM preco_1, cabine_1, motor_1, proprietario_1
  RETURNING id
),
imagens AS (
  INSERT INTO imagem (link, file_name) VALUES
  ('https://mariattinavalbroker.com/wp-content/uploads/slider/cache/8caa1856fcad21de1ddd3bba95dfcb7d/4-1.jpg','file-1'),
  ('https://www.leobroker.com.br/Seminovo/20231205164521-1520x855.jpg?format=webp&width=1520&height=855','file-2'),
  ('https://www.leobroker.com.br/Seminovo/20231025152927-20230712_110144.jpg?format=webp&width=530&height=298','file-3'),
  ('https://mariattinavalbroker.com/wp-content/uploads/slider/cache/3c93ae14c6c04f09cb9148b6dbc868d5/7-1.jpg','file-4'),
  ('https://orionyachts.com.br/wp-content/uploads/2020/04/8660cc1b-1205-49de-8804-a91b42e568e6-1024x768.jpg','file-5')
  RETURNING id, file_name
),
link_imagens AS (
  INSERT INTO imagem_barco_seminovo (id_imagem, id_barco_seminovo)
  SELECT i.id, s.id
  FROM imagens i
  CROSS JOIN seminovo_1 s
  RETURNING 1
)
INSERT INTO item_seminovo_barco_seminovo (id_barco_seminovo,id_item_seminovo,quantidade)
SELECT id,3,1 FROM seminovo_1
UNION ALL SELECT id,6,2 FROM seminovo_1
UNION ALL SELECT id,7,4 FROM seminovo_1
UNION ALL SELECT id,8,5 FROM seminovo_1
UNION ALL SELECT id,9,1 FROM seminovo_1
UNION ALL SELECT id,10,2 FROM seminovo_1
UNION ALL SELECT id,12,2 FROM seminovo_1
UNION ALL SELECT id,14,3 FROM seminovo_1
UNION ALL SELECT id,15,2 FROM seminovo_1;




-- ========== SEMINOVO 2 (CTE ÚNICO) ==========

WITH
preco_2 AS (
  INSERT INTO preco (valor, id_moeda)
  VALUES (5000000, 2)
  RETURNING id
),
cabine_2 AS (
  INSERT INTO cabine (passageiro, tripulacao)
  VALUES (3,1)
  RETURNING id
),
motor_2 AS (
  INSERT INTO motorizacao (quantidade, potencia, horas, ano, observacoes, id_motor)
  VALUES (1,1200,600,2018,null,32)
  RETURNING id
),
proprietario_2 AS (
  INSERT INTO proprietario (nome, email, telefone)
  VALUES ('Paulo André','broder2208@gmail.com','+55 21 98238-6051')
  RETURNING id
),
seminovo_2 AS (
  INSERT INTO barco_seminovo (
    id_modelo, nome, ano, tamanho,
    id_motorizacao, potencia_total,
    id_combustivel, id_propulsao,
    id_cabine, procedencia, destaque,
    id_preco, id_proprietario
  )
  SELECT
    1,'Peace of Mind',2018,30,
    motor_2.id,1200,
    1,2,
    cabine_2.id,'Brasil','Guardado no seco por 112 horas',
    preco_2.id,proprietario_2.id
  FROM preco_2, cabine_2, motor_2, proprietario_2
  RETURNING id
),
imagens_2 AS (
  INSERT INTO imagem (link, file_name) VALUES
    ('https://marealtacharter.com.br/wp-content/uploads/2023/09/Aluguel-de-Lancha-em-Angra-dos-Reis-Ecomariner-300-2-1.png','file-1'),
    ('https://static1.clickandboat.com/v1/p/Iral8Fk5oTKaYagf4hAP1rI98cSYG0vX.medium.jpg','file-2'),
    ('https://naveguetemporada.com/wp-content/uploads/2023/09/Lancha-Alfa-300-Dom-Pejo-Barco.jpg','file-3'),
    ('https://mariattinavalbroker.com/wp-content/uploads/slider/cache/3c93ae14c6c04f09cb9148b6dbc868d5/7-1.jpg','file-4'),
    ('https://marealtacharter.com.br/wp-content/uploads/2023/09/Aluguel-de-Lancha-em-Angra-dos-Reis-Ecomariner-300-1-1.png','file-5')
  RETURNING id
),
link_imagens_2 AS (
  INSERT INTO imagem_barco_seminovo (id_imagem, id_barco_seminovo)
  SELECT i.id, s.id
  FROM imagens_2 i
  CROSS JOIN seminovo_2 s
  RETURNING 1
)
INSERT INTO item_seminovo_barco_seminovo (id_barco_seminovo, id_item_seminovo, quantidade)
SELECT id,2,1 FROM seminovo_2
UNION ALL SELECT id,7,2 FROM seminovo_2
UNION ALL SELECT id,8,4 FROM seminovo_2
UNION ALL SELECT id,10,5 FROM seminovo_2
UNION ALL SELECT id,11,1 FROM seminovo_2
UNION ALL SELECT id,16,2 FROM seminovo_2
UNION ALL SELECT id,17,2 FROM seminovo_2
UNION ALL SELECT id,19,3 FROM seminovo_2
UNION ALL SELECT id,121,2 FROM seminovo_2;


-- ========== SEMINOVO 3 (CTE ÚNICO) ==========

WITH
preco_3 AS (
  INSERT INTO preco (valor, id_moeda)
  VALUES (18000000, 1)
  RETURNING id
),
cabine_3 AS (
  INSERT INTO cabine (passageiro, tripulacao)
  VALUES (4, 2)
  RETURNING id
),
motor_3 AS (
  INSERT INTO motorizacao (quantidade, potencia, horas, ano, observacoes, id_motor)
  VALUES (2, 1000, 200, 2019, null, 35)
  RETURNING id
),
proprietario_3 AS (
  INSERT INTO proprietario (nome, email, telefone)
  VALUES ('Eduardo Omar','eduardo7777@gmail.com','+55 21 96015-3337')
  RETURNING id
),
seminovo_3 AS (
  INSERT INTO barco_seminovo (
    id_modelo, nome, ano, tamanho,
    id_motorizacao, potencia_total,
    id_combustivel, id_propulsao,
    id_cabine, procedencia, destaque,
    id_preco, id_proprietario
  )
  SELECT
    4,'Blue Horizon',2019,45,
    motor_3.id,2000,
    1,2,
    cabine_3.id,'Brasil','Barco impecável',
    preco_3.id,proprietario_3.id
  FROM preco_3, cabine_3, motor_3, proprietario_3
  RETURNING id
),
imagens_3 AS (
  INSERT INTO imagem (link, file_name) VALUES
    ('https://static.wixstatic.com/media/1efa30_48550c7b6d024d67b5c765f07b61dd2a~mv2.jpg/v1/fill/w_1600,h_970,al_c/1efa30_48550c7b6d024d67b5c765f07b61dd2a~mv2.jpg','boat-file-1'),
    ('https://brokersnauticos.s3.amazonaws.com/upload/Embarcacion/b/o/a/cab12ffa0fb66a59%21boat-rentals-salvador-bahia-altamar-50-processed+%281%29.jpg','boat-file-2'),
    ('https://brokersnauticos.s3.amazonaws.com/upload/Embarcacion/b/o/a/ba75dc730a01da45%21boat-rentals-salvador-bahia-altamar-50-processed.jpg','boat-file-3'),
    ('https://d18mr9iuob0gar.cloudfront.net/media/boats/2018/09/rental-Motor-boat-Altamar-50feet-Miami-FL_lWIOIZe.jpg','boat-file-4'),
    ('https://lanchasvenezuela.com/wp-content/uploads/2023/07/ALTAMAR-50-VENTA-DE-ALTAMAR-50-ALTAMAR-50-DE-TUCACAS-7.jpg','boat-file-5')
  RETURNING id
),
link_imagens_3 AS (
  INSERT INTO imagem_barco_seminovo (id_imagem, id_barco_seminovo)
  SELECT i.id, s.id
  FROM imagens_3 i
  CROSS JOIN seminovo_3 s
  RETURNING 1
)
INSERT INTO item_seminovo_barco_seminovo (id_barco_seminovo, id_item_seminovo, quantidade)
SELECT id,2,1 FROM seminovo_3
UNION ALL SELECT id,6,2 FROM seminovo_3
UNION ALL SELECT id,8,3 FROM seminovo_3
UNION ALL SELECT id,11,4 FROM seminovo_3
UNION ALL SELECT id,14,2 FROM seminovo_3;


-- ========== SEMINOVO 4 (CTE ÚNICO) ==========

WITH
preco_4 AS (
  INSERT INTO preco (valor, id_moeda)
  VALUES (35000000, 2)
  RETURNING id
),
cabine_4 AS (
  INSERT INTO cabine (passageiro, tripulacao)
  VALUES (6, 2)
  RETURNING id
),
motor_4 AS (
  INSERT INTO motorizacao (quantidade, potencia, horas, ano, observacoes, id_motor)
  VALUES (3, 1500, 300, 2020, null, 37)
  RETURNING id
),
proprietario_4 AS (
  INSERT INTO proprietario (nome, email, telefone)
  VALUES ('Ana Broder','anabroder@gmail.com','+55 21 99629-1858')
  RETURNING id
),
seminovo_4 AS (
  INSERT INTO barco_seminovo (
    id_modelo, nome, ano, tamanho,
    id_motorizacao, potencia_total,
    id_combustivel, id_propulsao,
    id_cabine, procedencia, destaque,
    id_preco, id_proprietario
  )
  SELECT
    5,'Ocean Breeze',2020,60,
    motor_4.id,4500,
    1,1,
    cabine_4.id,'Itália','Barco com excelente potência',
    preco_4.id,proprietario_4.id
  FROM preco_4, cabine_4, motor_4, proprietario_4
  RETURNING id
),
imagens_4 AS (
  INSERT INTO imagem (link, file_name) VALUES
    ('https://www.leobroker.com.br/Seminovo/20231025153037-20230712_104736.jpg?format=webp&width=530&height=298','boat-file-6'),
    ('https://www.leobroker.com.br/Seminovo/20231025152915-20230712_105521.jpg?format=webp&width=530&height=298','boat-file-7'),
    ('https://www.leobroker.com.br/Seminovo/20231025152927-20230712_110144.jpg?format=webp&width=530&height=298','boat-file-8'),
    ('https://www.leobroker.com.br/Seminovo/20231025152942-20230712_110249.jpg?format=webp&width=530&height=298','boat-file-9'),
    ('https://www.leobroker.com.br/Seminovo/20231025153008-20230712_111507.jpg?format=webp&width=530&height=298','boat-file-10')
  RETURNING id
),
link_imagens_4 AS (
  INSERT INTO imagem_barco_seminovo (id_imagem, id_barco_seminovo)
  SELECT i.id, s.id
  FROM imagens_4 i
  CROSS JOIN seminovo_4 s
  RETURNING 1
)
INSERT INTO item_seminovo_barco_seminovo (id_barco_seminovo, id_item_seminovo, quantidade)
SELECT id,3,1 FROM seminovo_4
UNION ALL SELECT id,7,2 FROM seminovo_4
UNION ALL SELECT id,9,3 FROM seminovo_4
UNION ALL SELECT id,12,5 FROM seminovo_4
UNION ALL SELECT id,16,1 FROM seminovo_4;



-- ========== SEMINOVO 5 (CTE ÚNICO) ==========

WITH
preco_5 AS (
  INSERT INTO preco (valor, id_moeda)
  VALUES (42000000, 1)
  RETURNING id
),
cabine_5 AS (
  INSERT INTO cabine (passageiro, tripulacao)
  VALUES (8, 3)
  RETURNING id
),
motor_5 AS (
  INSERT INTO motorizacao (quantidade, potencia, horas, ano, observacoes, id_motor)
  VALUES (2, 2000, 400, 2021, null, 38)
  RETURNING id
),
proprietario_5 AS (
  INSERT INTO proprietario (nome, email, telefone)
  VALUES ('Alice Almeida','alice.almeida@gmail.com','+55 21 98391-7378')
  RETURNING id
),
seminovo_5 AS (
  INSERT INTO barco_seminovo (
    id_modelo, nome, ano, tamanho,
    id_motorizacao, potencia_total,
    id_combustivel, id_propulsao,
    id_cabine, procedencia, destaque,
    id_preco, id_proprietario
  )
  SELECT
    6,'Dream Catcher',2021,70,
    motor_5.id,4000,
    2,3,
    cabine_5.id,'Estados Unidos','Barco com design único',
    preco_5.id,proprietario_5.id
  FROM preco_5, cabine_5, motor_5, proprietario_5
  RETURNING id
),
imagens_5 AS (
  INSERT INTO imagem (link, file_name) VALUES
    ('https://www.thiagolanchas.com.br/admin/image/lancha/401/401-1thumb.jpg','boat-file-11'),
    ('https://img.olx.com.br/images/30/302457519295150.jpg','boat-file-12'),
    ('https://www.thiagolanchas.com.br/admin/image/lancha/401/7437md.jpg','boat-file-13'),
    ('https://img.olx.com.br/images/93/935474109985970.jpg','boat-file-14'),
    ('https://naveguetemporada.com/wp-content/uploads/2023/09/Lancha-Alternativa-21-JGFISHERS-3.jpg','boat-file-15')
  RETURNING id
),
link_imagens_5 AS (
  INSERT INTO imagem_barco_seminovo (id_imagem, id_barco_seminovo)
  SELECT i.id, s.id
  FROM imagens_5 i
  CROSS JOIN seminovo_5 s
  RETURNING 1
)
INSERT INTO item_seminovo_barco_seminovo (id_barco_seminovo, id_item_seminovo, quantidade)
SELECT id,1,1 FROM seminovo_5
UNION ALL SELECT id,4,3 FROM seminovo_5
UNION ALL SELECT id,10,2 FROM seminovo_5
UNION ALL SELECT id,13,4 FROM seminovo_5
UNION ALL SELECT id,17,3 FROM seminovo_5;


-- ========== Novo seminovo -==========