
 INSERT INTO app_user (email, user_firebase_id, id_user_type) VALUES 
('Gabriel', 'firebase_id', 1);
--preco
INSERT INTO
    preco(valor, id_moeda)
VALUES
    (5000000, 2);

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
    (2,1400,150,2016,null,34);

-- Inserindo um proprietário
INSERT INTO proprietario (nome, email, telefone ) 
VALUES
    ('Alice Almeida', 'alice.almeida@gmail.com', '+55 21 98391-7378');

-- seminovo
INSERT INTO 
    barco_seminovo (id_modelo, nome, ano, tamanho, id_motorizacao, potencia_total, id_combustivel, id_propulsao, id_cabine, procedencia, destaque, id_preco, video, oportunidade, id_proprietario)
VALUES
    (3,'Sea View',2016,50,1,2800,1,3,1,'Brasil','Guardado no seco por 212 horas',1,null,true, 1);
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

    
INSERT INTO app_user_proprietario (id_app_user, id_proprietario) VALUES
(1, 1)
