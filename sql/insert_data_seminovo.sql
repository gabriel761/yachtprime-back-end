--preco
INSERT INTO
    preco(valor, moeda_id)
VALUES
    (5000000, 2);

--imagem
INSERT INTO
    imagem(link)
VALUES
    ('https://mariattinavalbroker.com/wp-content/uploads/slider/cache/8caa1856fcad21de1ddd3bba95dfcb7d/4-1.jpg'),
    ('https://www.leobroker.com.br/Seminovo/20231205164521-1520x855.jpg?format=webp&width=1520&height=855'),
    ('https://www.leobroker.com.br/Seminovo/20231025152927-20230712_110144.jpg?format=webp&width=530&height=298'),
    ('https://mariattinavalbroker.com/wp-content/uploads/slider/cache/3c93ae14c6c04f09cb9148b6dbc868d5/7-1.jpg'),
    ('https://orionyachts.com.br/wp-content/uploads/2020/04/8660cc1b-1205-49de-8804-a91b42e568e6-1024x768.jpg');
--cabine
INSERT INTO
    cabine (passageiro, tripulacao)
VALUES 
    (5,1);
--motor
INSERT INTO 
    motor(quantidade, potencia, horas, ano, observacoes, motor_id)
    VALUES
    (2,1400,150,2016,null,36);
-- seminovo
INSERT INTO 
    barco_seminovo (modelo_id, nome, ano, tamanho, motor_id, potencia_total, combustivel, propulsao, cabine, procedencia, destaque, preco_id)
VALUES
    (3,'Sea view',2016,50,1,2800,1,3,1,'Brasil','Guardado no seco por 212 horas',1);
-- imagem barco seminovo
INSERT INTO
    imagem_barco_seminovo (imagem_id, barco_seminovo_id)
VALUES
    (1,1),
    (2,1),
    (3,1),
    (4,1),
    (5,1);
--
-- item e barco seminovo
INSERT INTO
    item_seminovo_barco_seminovo (barco_seminovo_id, item_seminovo_id, quantidade)
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