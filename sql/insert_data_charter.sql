 -- === CHARTER 1 ===

 INSERT INTO app_user (email, user_firebase_id, id_user_type) VALUES 
('jg.7651@gmail.com', 'firebase_id', 1);
 INSERT INTO app_user (email, user_firebase_id, id_user_type) VALUES 
('paulo2228@gmail.com', 'firebase_id', 2);

SET client_encoding TO 'UTF8';
-- Inserindo um preço de exemplo
INSERT INTO preco (valor, id_moeda) VALUES 
(100, 1),
(600, 1),
(3500, 1),
(9500, 1),
(9500, 1),
(10500, 1),
(11500, 1),
(1500, 1),
(1800, 1);

--Inserido imagem
INSERT INTO imagem(id,link, file_name) VALUES 
(1,'https://p2.trrsf.com/image/fget/cf/1200/900/middle/images.terra.com/2014/03/01/0170running1.jpg', 'file-1'),
(2,'https://mondblu.com.br/wp-content/uploads/2022/05/01d0f1f6-f540-4d71-ba68-b8b69a542651.jpg', 'file-2'),
(3,'https://i.ytimg.com/vi/AxyUXPHmYxY/maxresdefault.jpg', 'file-3'),
(4,'https://marealtacharter.com.br/wp-content/uploads/2020/09/Aluguel-de-barco-ferretti-760-em-Angra-dos-Reis-003.jpg', 'file-4'),
(5,'https://sailica-prod-main.s3.eu-central-1.amazonaws.com/3342868030000104834/large/1b651ac54ce528a2275d681abbd21a41.jpg', 'file-5');

-- Insert into taxa churrasco
INSERT INTO taxa_churrasco (id_preco, mensagem) VALUES 
(8,'Pagamento no dia do passeio diretamente ao capitão');

-- Inserindo informações de passageiros
INSERT INTO passageiros (passageiros, passageiros_pernoite, tripulacao)
VALUES (10, 4, 2);

-- Inserindo consumo de combustível
INSERT INTO consumo_combustivel (litros_hora, id_preco_hora, id_tipo_combustivel)
VALUES (50, 1, 2);

-- Inserindo um proprietário
INSERT INTO proprietario (nome, email, telefone ) 
VALUES
    ('João Gabriel', 'jg.7651@gmail.com', '(21) 96018-3131');

-- Inserindo um barco charter
INSERT INTO barco_charter (modelo, nome, ano, tamanho, id_cidade, id_preco, id_passageiros, id_pet_friendly, id_consumo, id_preco_hora_extra, id_preco_aluguel_lancha, id_tipo_passeio, id_tripulacao_skipper, id_taxa_churrasco, video_promocional, id_proprietario)
VALUES (35, 'Lancha Luxo', 2022, 50, 1, 9, 1, 1, 1, 2, 3, 1, 2, 1,'https://www.youtube.com/watch?v=EZJ-S9RODF0', 1);


-- Inserir roteiros 
INSERT INTO roteiro (id_barco_charter, nome, descricao, id_preco, detalhes_pagamento) VALUES 
(1,'Ilhas Paradisíacas lado norte','Piraquara, Laboratório, Pingo de Agua, Paquetá', 4, 'ou 5x de R$2.090'),
(1,'Ilhas Paradisíacas lado sul','Botinas, Piedade, Flechas, Praia do Dentista', 5, 'ou 5x de R$2.090'), 
(1,'Ilha Grande','Lagoa Azul, Lagoa Verde, Bananal, Aripeba, Sitio Forte', 6, 'ou 5x de R$2.310'), 
(1,'Ilha Grande 2','Abraão, Saco do Céu, Feguesia, Japariz, Lagoa Azul (e arredores)', 7, 'ou 5x de R$2.530');

-- Relacionando itens charter com barco charter
INSERT INTO item_charter_barco_charter (id_barco_charter, id_item_charter, quantidade) VALUES 
(1, 8, 1),
(1, 10, 2),
(1, 12, 1);

-- Relacionando imagem com charter
INSERT INTO imagem_barco_charter (id_barco_charter, id_imagem) VALUES 
(1,1),
(1,2),
(1,3),
(1,4),
(1,5);



-- === CHARTER 2 ===

-- Inserindo um preço de exemplo
INSERT INTO preco (valor, id_moeda) VALUES 
(200, 2),
(500, 2),
(4500, 2),
(19500, 2),
(19500, 2),
(12500, 2),
(10500, 2),
(500, 2),
(800, 2);

--Inserido imagem
INSERT INTO imagem(id,link, file_name) VALUES 
(6,'https://scontent.fsdu36-1.fna.fbcdn.net/v/t39.30808-6/475994102_10162344623275586_8434066515083635501_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=WRvM6uM69DwQ7kNvwEyDZAi&_nc_oc=AdljSCzU8nDZ8W8XgF2LLujrOHrpg7RNrSGprfuIrXTJkZzfHM_ENtl7XAydbIZ-Hf8&_nc_zt=23&_nc_ht=scontent.fsdu36-1.fna&_nc_gid=1iazIAloJE9QTwuISvuxxQ&oh=00_AfRdq3XYMXWyrb908C_wvc2mSl1XOedeQnGg5agl_rIXDw&oe=68930F89', 'file-7 '),
(7,'https://static.wixstatic.com/media/762819_769fb8df778045b396e1eee22400efce~mv2.jpg/v1/fill/w_960,h_1280,al_c/762819_769fb8df778045b396e1eee22400efce~mv2.jpg', 'file-8'),
(8,'https://storage-pn.sfo3.digitaloceanspaces.com/img/class/23/06/9331_9b49a07b-c8ee-4524-9545-b3ff77749e9c.jpg', 'file-9'),
(9,'https://static1.clickandboat.com/v1/p/NJN0vS9qjxuADkN5EiuIYrO07Va3ZHqP.big.jpg', 'file-10'),
(10,'https://thebestboats.com.br/wp-content/uploads/2022/11/ferretti60_1-80.jpg', 'file-11');

-- Insert into taxa churrasco
INSERT INTO taxa_churrasco (id_preco, mensagem) VALUES 
(17,'Pagamento no dia do passeio diretamente ao capitão');

-- Inserindo informações de passageiros
INSERT INTO passageiros (passageiros, passageiros_pernoite, tripulacao)
VALUES (10, 4, 2);

-- Inserindo consumo de combustível
INSERT INTO consumo_combustivel (litros_hora, id_preco_hora, id_tipo_combustivel)
VALUES (50, 10, 2);

-- Inserindo um proprietário
INSERT INTO proprietario (nome, email, telefone ) 
VALUES
    ('Paulo André', 'broder2208@gmail.com', '+55 21 98238-6051');

-- Inserindo um barco charter
INSERT INTO barco_charter (modelo, nome, ano, tamanho, id_cidade, id_preco, id_passageiros, id_pet_friendly, id_consumo, id_preco_hora_extra, id_preco_aluguel_lancha, id_tipo_passeio, id_tripulacao_skipper, id_taxa_churrasco, video_promocional, id_proprietario)
VALUES (223, 'Black Pearl', 2020, 40, 1, 18, 2, 1, 2, 11, 12, 1, 2, 2, 'https://www.youtube.com/watch?v=FyQivMjb3_8', 2);


-- Inserir roteiros 
INSERT INTO roteiro (id_barco_charter, nome, descricao, id_preco, detalhes_pagamento) VALUES 
(2, 'Roteiro Histórico Cultural', 'Centro Histórico de Paraty, Forte Defensor Perpétuo, Praia do Pontal', 13, 'ou 4x de R$1.750'),
(2, 'Ilhas Secretas', 'Ilha dos Meros, Ilhote do Medo, Enseada do Saco do Fundão', 14, 'ou 6x de R$1.980'), 
(2, 'Tour das Águas Cristalinas', 'Ilha Comprida, Praia da Lula, Ilha do Algodão', 15, 'ou 3x de R$2.120'), 
(2, 'Costa Selvagem', 'Praia do Sono, Antigos, Antiguinhos, Ponta Negra', 16, 'ou 5x de R$2.300');


-- Relacionando itens charter com barco charter
INSERT INTO item_charter_barco_charter (id_barco_charter, id_item_charter, quantidade) VALUES 
(2, 6, 2),
(2, 9, 1),
(2, 11, 2);

-- Relacionando imagem com charter
INSERT INTO imagem_barco_charter (id_barco_charter, id_imagem) VALUES 
(2,6),
(2,7),
(2,8),
(2,9),
(2,10);




-- === CHARTER 3 ===


-- Inserindo um preço de exemplo
INSERT INTO preco (valor, id_moeda) VALUES 
(200, 1),
(500, 1),
(4500, 1),
(19500, 1),
(19500, 1),
(12500, 1),
(10500, 1),
(500, 1),
(800, 1);

--Inserido imagem
INSERT INTO imagem(id,link, file_name) VALUES 
(11,'https://i.ytimg.com/vi/K8I4yYPabng/maxresdefault.jpg', 'file-12 '),
(12,'https://nautica.com.br/wp-content/uploads/2023/08/intermarine-640.BX_.jpg', 'file-13'),
(13,'https://nautica.com.br/wp-content/uploads/2023/08/INTERMARINE-70_leak_preview-1-1.jpg', 'file-14'),
(14,'https://www.portalin.com.br/wp-content/uploads/2022/09/embarcacoes.jpg', 'file-15'),
(15,'https://cdn.bombarco.com.br/catalogs/intermarine-im-70-f7ec4a206ce0a97456e65410.jpg', 'file-16');

-- Insert into taxa churrasco
INSERT INTO taxa_churrasco (id_preco, mensagem) VALUES 
(26,'Pagamento no dia do passeio diretamente ao capitão');

-- Inserindo informações de passageiros
INSERT INTO passageiros (passageiros, passageiros_pernoite, tripulacao)
VALUES (24, 16, 4);

-- Inserindo consumo de combustível
INSERT INTO consumo_combustivel (litros_hora, id_preco_hora, id_tipo_combustivel)
VALUES (40, 19, 1);

-- Inserindo um proprietário
INSERT INTO proprietario (nome, email, telefone ) 
VALUES
    ('Eduardo Omar', 'eduardo7777@gmail.com', '+55 21 96015-3337');

-- Inserindo um barco charter
INSERT INTO barco_charter (modelo, nome, ano, tamanho, id_cidade, id_preco, id_passageiros, id_pet_friendly, id_consumo, id_preco_hora_extra, id_preco_aluguel_lancha, id_tipo_passeio, id_tripulacao_skipper, id_taxa_churrasco, video_promocional, id_proprietario)
VALUES (224, 'Wave Beat', 2023, 70, 1, 27, 3, 1, 3, 20, 21, 1, 2, 3,'https://www.youtube.com/watch?v=ndqX4vbR7Rc', 3);


-- Inserir roteiros 
INSERT INTO roteiro (id_barco_charter, nome, descricao, id_preco, detalhes_pagamento) VALUES 
(3, 'Expedição Azul-Turquesa', 'Ilha do Japonês, Praia Secreta, Enseada das Águas Claras', 22, 'ou 4x de R$2.150'),
(3, 'Oeste Selvagem', 'Ilha do Cedro, Praia de Fora, Caverna do Macaco', 23, 'ou 6x de R$2.010'), 
(3, 'Encantos Tropicais', 'Ilha da Cotia, Ilhote da Saudade, Baía do Engenho', 24, 'ou 5x de R$2.390'), 
(3, 'Rota dos Pescadores', 'Saco do Mamanguá, Enseada do Engenho, Ilha do Ventura', 25, 'ou 3x de R$2.200');

-- Relacionando itens charter com barco charter
INSERT INTO item_charter_barco_charter (id_barco_charter, id_item_charter, quantidade) VALUES 
(3, 2, 3),
(3, 12, 1),
(3, 16, 2);

-- Relacionando imagem com charter
INSERT INTO imagem_barco_charter (id_barco_charter, id_imagem) VALUES 
(3,11),
(3,12),
(3,13),
(3,14),
(3,15);


-- === CHARTER 4 ===


-- Inserindo preços para charter 4
INSERT INTO preco (valor, id_moeda) VALUES 
(250, 1),  -- id 28
(600, 1),  -- id 29
(4800, 1), -- id 30
(14500, 1),-- id 31
(16500, 1),-- id 32
(12000, 1),-- id 33
(10000, 1),-- id 34
(850, 1),  -- id 35
(1000, 1); -- id 36

-- Inserindo imagens para charter 4
INSERT INTO imagem(id, link, file_name) VALUES 
(21, 'http://www.croatiacharterholidays.com/tolteam/upload/brod/951/v30335jpeg', 'file-22'),
(22, 'https://cdn.yachtbroker.org/images/highdef/2813616_448d7813_1.jpg', 'file-23'),
(23, 'https://image.yachtall.com/image/sboat/0/175/743/huge-82c39bfc97.jpg', 'file-24'),
(24, 'https://tripyacht.com/_next/image/?url=https%3A%2F%2Ftripyacht-yacht-images.s3.amazonaws.com%2Fn10176911%2F6b049f8d53644652fea811fe49684434.jpeg&w=1920&q=75', 'file-25'),
(25, 'https://day-charter.fr/wp-content/uploads/2017/04/princess-42-charter.jpg', 'file-26');

-- Inserindo taxa churrasco
INSERT INTO taxa_churrasco (id_preco, mensagem) VALUES 
(28, 'Taxa extra para uso da churrasqueira — pagar direto ao capitão');

-- Passageiros
INSERT INTO passageiros (passageiros, passageiros_pernoite, tripulacao)
VALUES (12, 4, 2);

-- Consumo
INSERT INTO consumo_combustivel (litros_hora, id_preco_hora, id_tipo_combustivel)
VALUES (45, 29, 1);

-- Inserindo um proprietário
INSERT INTO proprietario (nome, email, telefone ) 
VALUES
    ('Ana Broder', 'anabroder@gmail.com', '+55 21 99629-1858');

-- Inserindo barco charter 4
INSERT INTO barco_charter (
  id, modelo, nome, ano, tamanho, id_cidade, id_preco, id_passageiros, id_pet_friendly, 
  id_consumo, id_preco_hora_extra, id_preco_aluguel_lancha, id_tipo_passeio, 
  id_tripulacao_skipper, id_taxa_churrasco, video_promocional, id_proprietario
) VALUES (
  4, 389, 'Princess 42 Fly', 2022, 42, 1, 32, 4, 1,
  4, 30, 31, 1,
  2, 4, 'https://www.youtube.com/watch?v=tbqKlcConIY', 4
);

-- Roteiros do charter 4
INSERT INTO roteiro (id_barco_charter, nome, descricao, id_preco, detalhes_pagamento) VALUES 
(4, 'Ilha dos Sonhos', 'Tour pela Ilha do Pelado, Praia da Conceição e Lagoa Azul', 33, 'ou 4x de R$2.250'),
(4, 'Caminhos Tropicais', 'Visita à Ilha do Algodão, Ilha Grande e Freguesia de Santana', 34, 'ou 5x de R$2.450'),
(4, 'Litoral Selvagem', 'Exploração de praias isoladas e natureza intocada em Paraty', 35, 'ou 3x de R$2.180'),
(4, 'Passeio VIP ao Entardecer', 'Navegação com vista para o pôr do sol, música ambiente e drinques a bordo', 36, 'ou 3x de R$1.980');

-- Itens charter
INSERT INTO item_charter_barco_charter (id_barco_charter, id_item_charter, quantidade) VALUES 
(4, 4, 1),
(4, 6, 2),
(4, 10, 1);

-- Imagens charter
INSERT INTO imagem_barco_charter (id_barco_charter, id_imagem) VALUES 
(4,21),
(4,22),
(4,23),
(4,24),
(4,25);




-- === CHARTER 5 ===

-- Inserindo preços para charter 5
INSERT INTO preco (valor, id_moeda) VALUES 
(300, 1),   -- id 37 - taxa churrasco
(700, 1),   -- id 38 - hora
(5000, 1),  -- id 39 - extra
(13000, 1), -- id 40 - aluguel
(15000, 1), -- id 41 - preco charter
(11000, 1), -- id 42 - roteiro 1
(9500, 1),  -- id 43 - roteiro 2
(800, 1),   -- id 44 - roteiro 3
(950, 1);   -- id 45 - roteiro 4

-- Inserindo imagens para charter 5
INSERT INTO imagem(id, link, file_name) VALUES 
(26, 'https://marealtacharter.com.br/wp-content/uploads/2017/12/ALUGUEL-DE-LANCHA-PHANTOM-360-%E2%80%93-CARAGUATATUBA-1.png', 'file-27'),
(27, 'https://marealtacharter.com.br/wp-content/uploads/2017/12/Aluguel-de-lancha-phantom-360-em-Ilhabela-e-S%C3%A3o-Sebasti%C3%A3o-003.jpg', 'file-28'),
(28, 'https://marealtacharter.com.br/wp-content/uploads/2017/12/Aluguel-de-lancha-phantom-360-em-Ilhabela-e-S%C3%A3o-Sebasti%C3%A3o-006.jpg', 'file-29'),
(29, 'https://marealtacharter.com.br/wp-content/uploads/2017/12/lancha-Phantom-5.png', 'file-30'),
(30, 'https://marealtacharter.com.br/wp-content/uploads/2017/12/lancha-Phantom-2.png', 'file-31');

-- Inserindo taxa churrasco
INSERT INTO taxa_churrasco (id_preco, mensagem) VALUES 
(37, 'Taxa adicional para uso da churrasqueira — pagamento direto ao capitão');

-- Passageiros
INSERT INTO passageiros (passageiros, passageiros_pernoite, tripulacao)
VALUES (10, 0, 2);

-- Consumo
INSERT INTO consumo_combustivel (litros_hora, id_preco_hora, id_tipo_combustivel)
VALUES (38, 38, 1);

-- Inserindo um proprietário
INSERT INTO proprietario (nome, email, telefone ) 
VALUES
    ('Alice Almeida', 'alice.almeida@gmail.com', '+55 21 98391-7378');

-- Inserindo barco charter 5
INSERT INTO barco_charter (
  id, modelo, nome, ano, tamanho, id_cidade, id_preco, id_passageiros, id_pet_friendly, 
  id_consumo, id_preco_hora_extra, id_preco_aluguel_lancha, id_tipo_passeio, 
  id_tripulacao_skipper, id_taxa_churrasco, video_promocional, id_proprietario
) VALUES (
  5, 499, 'Phantom 360', 2021, 36, 1, 41, 5, 1,
  5, 39, 40, 1,
  2, 5, 'https://www.youtube.com/watch?v=miTpJmMt7uo', 5
);

-- Roteiros do charter 5
INSERT INTO roteiro (id_barco_charter, nome, descricao, id_preco, detalhes_pagamento) VALUES 
(5, 'Ilha dos Macacos', 'Passeio por Ilha dos Macacos, Lagoa Azul e Saco da Velha', 42, 'ou 5x de R$2.200'),
(5, 'Costa Verde Exuberante', 'Trilha costeira entre enseadas e praias selvagens de Angra', 43, 'ou 4x de R$2.100'),
(5, 'Baía Histórica', 'Navegação pelas águas tranquilas da Baía de Paraty e visita a vilas coloniais', 44, 'ou 3x de R$1.850'),
(5, 'Por do Sol na Enseada', 'Roteiro breve ao entardecer com música e coquetel de boas-vindas', 45, 'ou 2x de R$1.500');

-- Itens charter
INSERT INTO item_charter_barco_charter (id_barco_charter, id_item_charter, quantidade) VALUES 
(5, 2, 1),
(5, 5, 2),
(5, 9, 1);

-- Imagens charter
INSERT INTO imagem_barco_charter (id_barco_charter, id_imagem) VALUES 
(5,26),
(5,27),
(5,28),
(5,29),
(5,30);


-- === USUARIO PROPRIETARIO ===

INSERT INTO app_user_proprietario (id_app_user, id_proprietario) VALUES
(2, 1),
(2, 2),
(2, 3),
(1, 4),
(1, 5);
