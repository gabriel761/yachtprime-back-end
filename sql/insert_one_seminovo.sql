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
