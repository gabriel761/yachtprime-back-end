





--preco
INSERT INTO
    preco(valor, id_moeda)
VALUES
    (85000000, 1);

--imagem
INSERT INTO
    imagem(link, file_name)
VALUES
    ('https://mariattinavalbroker.com/wp-content/uploads/slider/cache/8caa1856fcad21de1ddd3bba95dfcb7d/4-1.jpg', 'file-1'),
    ('https://www.leobroker.com.br/Seminovo/20231205164521-1520x855.jpg?format=webp&width=1520&height=855', 'file-2'),
    ('https://www.leobroker.com.br/Seminovo/20231025152927-20230712_110144.jpg?format=webp&width=530&height=298', 'file-3'),
    ('https://mariattinavalbroker.com/wp-content/uploads/slider/cache/3c93ae14c6c04f09cb9148b6dbc868d5/7-1.jpg', 'file-4'),
    ('https://orionyachts.com.br/wp-content/uploads/2020/04/8660cc1b-1205-49de-8804-a91b42e568e6-1024x768.jpg', 'file-5');
--cabine
INSERT INTO
    cabine (passageiro, tripulacao)
VALUES 
    (5,1);
--motor
INSERT INTO 
    motorizacao(quantidade, potencia, horas, ano, observacoes, id_motor)
    VALUES
    (2,1400,150,2016,null,36);

INSERT INTO proprietario (nome, email, telefone ) 
VALUES
    ('João Gabriel', 'jg.7651@gmail.com', '(21) 96018-3131');
-- seminovo
INSERT INTO 
    barco_seminovo (id_modelo, nome, ano, tamanho, id_motorizacao, potencia_total, id_combustivel, id_propulsao, id_cabine, procedencia, destaque, id_preco, id_proprietario)
VALUES
    (3,'Sea View',2016,50,1,2800,1,3,1,'Brasil','Guardado no seco por 212 horas',1, 1);
-- imagem barco seminovo
INSERT INTO
    imagem_barco_seminovo (id_imagem, id_barco_seminovo)
VALUES
    (1,1),
    (2,1),
    (3,1),
    (4,1),
    (5,1);
--
-- item e barco seminovo
INSERT INTO
    item_seminovo_barco_seminovo (id_barco_seminovo, id_item_seminovo, quantidade)
VALUES
    (1,3,1),
    (1,6,2),
    (1,7,4),
    (1,8,5),
    (1,9,1),
    (1,10,2),
    (1,12,2),
    (1,14,3),
    (1,15,2);




-- ========== Novo seminovo -==========


    --preco
INSERT INTO
    preco(valor, id_moeda)
VALUES
    (5000000, 2);

--imagem
INSERT INTO
    imagem(link, file_name)
VALUES
    ('https://marealtacharter.com.br/wp-content/uploads/2023/09/Aluguel-de-Lancha-em-Angra-dos-Reis-Ecomariner-300-2-1.png', 'file-1'),
    ('https://static1.clickandboat.com/v1/p/Iral8Fk5oTKaYagf4hAP1rI98cSYG0vX.medium.jpg', 'file-2'),
    ('https://naveguetemporada.com/wp-content/uploads/2023/09/Lancha-Alfa-300-Dom-Pejo-Barco.jpg', 'file-3'),
    ('https://mariattinavalbroker.com/wp-content/uploads/slider/cache/3c93ae14c6c04f09cb9148b6dbc868d5/7-1.jpg', 'file-4'),
    ('https://marealtacharter.com.br/wp-content/uploads/2023/09/Aluguel-de-Lancha-em-Angra-dos-Reis-Ecomariner-300-1-1.png', 'file-5');
--cabine
INSERT INTO
    cabine (passageiro, tripulacao)
VALUES 
    (3,1);
--motor
INSERT INTO 
    motorizacao(quantidade, potencia, horas, ano, observacoes, id_motor)
    VALUES
    (1,1200,600,2018,null,32);

INSERT INTO proprietario (nome, email, telefone ) 
VALUES
    ('Paulo André', 'broder2208@gmail.com', '+55 21 98238-6051');

-- seminovo
INSERT INTO 
    barco_seminovo (id_modelo, nome, ano, tamanho, id_motorizacao, potencia_total, id_combustivel, id_propulsao, id_cabine, procedencia, destaque, id_preco, id_proprietario)
VALUES
    (1,'Peace of Mind',2018,30,2,1200,1,2,2,'Brasil','Guardado no seco por 112 horas',2, 2);
-- imagem barco seminovo
INSERT INTO
    imagem_barco_seminovo (id_imagem, id_barco_seminovo)
VALUES
    (6,2),
    (7,2),
    (8,2),
    (9,2),
    (10,2);
--
-- item e barco seminovo
INSERT INTO
    item_seminovo_barco_seminovo (id_barco_seminovo, id_item_seminovo, quantidade)
VALUES
    (2,2,1),
    (2,7,2),
    (2,8,4),
    (2,10,5),
    (2,11,1),
    (2,16,2),
    (2,17,2),
    (2,19,3),
    (2,121,2);

-- ========== Novo seminovo -==========


-- Preço
INSERT INTO
    preco(valor,id_moeda)
VALUES
    (18000000, 1);

-- Imagens
INSERT INTO
    imagem(link, file_name)
VALUES
    ('https://static.wixstatic.com/media/1efa30_48550c7b6d024d67b5c765f07b61dd2a~mv2.jpg/v1/fill/w_1600,h_970,al_c/1efa30_48550c7b6d024d67b5c765f07b61dd2a~mv2.jpg', 'boat-file-1'),
    ('https://brokersnauticos.s3.amazonaws.com/upload/Embarcacion/b/o/a/cab12ffa0fb66a59%21boat-rentals-salvador-bahia-altamar-50-processed+%281%29.jpg', 'boat-file-2'),
    ('https://brokersnauticos.s3.amazonaws.com/upload/Embarcacion/b/o/a/ba75dc730a01da45%21boat-rentals-salvador-bahia-altamar-50-processed.jpg', 'boat-file-3'),
    ('https://d18mr9iuob0gar.cloudfront.net/media/boats/2018/09/rental-Motor-boat-Altamar-50feet-Miami-FL_lWIOIZe.jpg', 'boat-file-4'),
    ('https://lanchasvenezuela.com/wp-content/uploads/2023/07/ALTAMAR-50-VENTA-DE-ALTAMAR-50-ALTAMAR-50-DE-TUCACAS-7.jpg', 'boat-file-5');

-- Cabine
INSERT INTO
    cabine (passageiro, tripulacao)
VALUES 
    (4, 2);

-- Motor
INSERT INTO 
    motorizacao(quantidade, potencia, horas, ano, observacoes, id_motor)
VALUES
    (2, 1000, 200, 2019, null, 35);

INSERT INTO proprietario (nome, email, telefone ) 
VALUES
    ('Eduardo Omar', 'eduardo7777@gmail.com', '+55 21 96015-3337');

-- Seminovo
INSERT INTO 
    barco_seminovo (id_modelo, nome, ano, tamanho, id_motorizacao, potencia_total, id_combustivel, id_propulsao, id_cabine, procedencia, destaque, id_preco, id_proprietario)
VALUES
    (4, 'Blue Horizon', 2019, 45, 3, 2000, 1, 2, 3, 'Brasil', 'Barco impecável', 3, 3);

-- Imagem Barco Seminovo
INSERT INTO
    imagem_barco_seminovo (id_imagem, id_barco_seminovo)
VALUES
    (11, 3),
    (12, 3),
    (13, 3),
    (14, 3),
    (15, 3);

-- Itens e Barco Seminovo
INSERT INTO
    item_seminovo_barco_seminovo (id_barco_seminovo, id_item_seminovo, quantidade)
VALUES
    (3, 2, 1),
    (3, 6, 2),
    (3, 8, 3),
    (3, 11, 4),
    (3, 14, 2);

-- ========== Novo seminovo -==========


-- Preço
INSERT INTO
    preco(valor, id_moeda)
VALUES
    (35000000, 2);

-- Imagens
INSERT INTO
    imagem(link, file_name)
VALUES
    ('https://www.leobroker.com.br/Seminovo/20231025153037-20230712_104736.jpg?format=webp&width=530&height=298', 'boat-file-6'),
    ('https://www.leobroker.com.br/Seminovo/20231025152915-20230712_105521.jpg?format=webp&width=530&height=298', 'boat-file-7'),
    ('https://www.leobroker.com.br/Seminovo/20231025152927-20230712_110144.jpg?format=webp&width=530&height=298', 'boat-file-8'),
    ('https://www.leobroker.com.br/Seminovo/20231025152942-20230712_110249.jpg?format=webp&width=530&height=298', 'boat-file-9'),
    ('https://www.leobroker.com.br/Seminovo/20231025153008-20230712_111507.jpg?format=webp&width=530&height=298', 'boat-file-10');

-- Cabine
INSERT INTO
    cabine (passageiro, tripulacao)
VALUES 
    (6, 2);

-- Motor
INSERT INTO 
    motorizacao(quantidade, potencia, horas, ano, observacoes, id_motor)
VALUES
    (3, 1500, 300, 2020, null, 37);

INSERT INTO proprietario (nome, email, telefone ) 
VALUES
    ('Ana Broder', 'anabroder@gmail.com', '+55 21 99629-1858');

-- Seminovo
INSERT INTO 
    barco_seminovo (id_modelo, nome, ano, tamanho, id_motorizacao, potencia_total, id_combustivel, id_propulsao, id_cabine, procedencia, destaque, id_preco, id_proprietario)
VALUES
    (5, 'Ocean Breeze', 2020, 60, 4, 4500, 1, 1, 4, 'Itália', 'Barco com excelente potência', 4, 4);

-- Imagem Barco Seminovo
INSERT INTO
    imagem_barco_seminovo (id_imagem, id_barco_seminovo)
VALUES
    (16, 4),
    (17, 4),
    (18, 4),
    (19, 4),
    (20, 4);

-- Itens e Barco Seminovo
INSERT INTO
    item_seminovo_barco_seminovo (id_barco_seminovo, id_item_seminovo, quantidade)
VALUES
    (4, 3, 1),
    (4, 7, 2),
    (4, 9, 3),
    (4, 12, 5),
    (4, 16, 1);


-- ========== Novo seminovo -==========


-- Preço
INSERT INTO
    preco(valor, id_moeda)
VALUES
    (42000000, 1);

-- Imagens
INSERT INTO
    imagem(link, file_name)
VALUES
    ('https://www.thiagolanchas.com.br/admin/image/lancha/401/401-1thumb.jpg', 'boat-file-11'),
    ('https://img.olx.com.br/images/30/302457519295150.jpg', 'boat-file-12'),
    ('https://www.thiagolanchas.com.br/admin/image/lancha/401/7437md.jpg', 'boat-file-13'),
    ('https://img.olx.com.br/images/93/935474109985970.jpg', 'boat-file-14'),
    ('https://naveguetemporada.com/wp-content/uploads/2023/09/Lancha-Alternativa-21-JGFISHERS-3.jpg', 'boat-file-15');

-- Cabine
INSERT INTO
    cabine (passageiro, tripulacao)
VALUES 
    (8, 3);

-- Motor
INSERT INTO 
    motorizacao(quantidade, potencia, horas, ano, observacoes, id_motor)
VALUES
    (2, 2000, 400, 2021, null, 38);

INSERT INTO proprietario (nome, email, telefone ) 
VALUES
    ('Alice Almeida', 'alice.almeida@gmail.com', '+55 21 98391-7378');

-- Seminovo
INSERT INTO 
    barco_seminovo (id_modelo, nome, ano, tamanho, id_motorizacao, potencia_total, id_combustivel, id_propulsao, id_cabine, procedencia, destaque, id_preco, id_proprietario)
VALUES
    (6, 'Dream Catcher', 2021, 70, 5, 4000, 2, 3, 5, 'Estados Unidos', 'Barco com design único', 5, 5);

-- Imagem Barco Seminovo
INSERT INTO
    imagem_barco_seminovo (id_imagem, id_barco_seminovo)
VALUES
    (21, 5),
    (22, 5),
    (23, 5),
    (24, 5),
    (25, 5);

-- Itens e Barco Seminovo
INSERT INTO
    item_seminovo_barco_seminovo (id_barco_seminovo, id_item_seminovo, quantidade)
VALUES
    (5, 1, 1),
    (5, 4, 3),
    (5, 10, 2),
    (5, 13, 4),
    (5, 17, 3);


-- ========== Novo seminovo -==========