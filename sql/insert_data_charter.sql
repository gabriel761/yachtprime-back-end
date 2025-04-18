SET client_encoding TO 'UTF8';
-- Inserindo um preço de exemplo
INSERT INTO preco (valor, id_moeda) VALUES 
(100, 1),
(600, 1),
(3500, 1),
(500, 1),
(9500, 1),
(9500, 1),
(10500, 1),
(11500, 1),
(1500, 1),
(1800, 1),
(200, 1),
(5000, 1);

--Inserido imagem
INSERT INTO imagem(id,link, file_name) VALUES 
(1,'https://www.hmy.com/wp-content/uploads/2019/04/ferretti-760.jpg', 'file-7'),
(2,'https://mondblu.com.br/wp-content/uploads/2022/05/01d0f1f6-f540-4d71-ba68-b8b69a542651.jpg', 'file-8'),
(3,'https://i.ytimg.com/vi/AxyUXPHmYxY/maxresdefault.jpg', 'file-9'),
(4,'https://marealtacharter.com.br/wp-content/uploads/2020/09/Aluguel-de-barco-ferretti-760-em-Angra-dos-Reis-003.jpg', 'file-10'),
(5,'https://sailica-prod-main.s3.eu-central-1.amazonaws.com/3342868030000104834/large/1b651ac54ce528a2275d681abbd21a41.jpg', 'file-11');

-- Insert into taxa churrasco
INSERT INTO taxa_churrasco (id_preco, mensagem) VALUES 
(9,'Pagamento no dia do passeio diretamente ao capitão');

-- Inserindo informações de passageiros
INSERT INTO passageiros (passageiros, passageiros_pernoite, tripulacao)
VALUES (10, 4, 2);

-- Inserindo consumo de combustível
INSERT INTO consumo_combustivel (litros_hora, id_preco_hora, id_tipo_combustivel)
VALUES (50, 1, 2);

-- Inserindo um barco charter
INSERT INTO barco_charter (modelo, nome, ano, tamanho, id_preco, id_passageiros, id_pet_friendly, id_consumo, id_preco_hora_extra, id_preco_aluguel_lancha, id_tipo_passeio, id_tripulacao_skipper, id_taxa_churrasco, video_promocional)
VALUES (35, 'Lancha Luxo', 2022, 50, 10, 1, 1, 1, 2, 3, 1, 2, 1, 'https://www.youtube.com/watch?v=EZJ-S9RODF0');


-- Inserir roteiros 
INSERT INTO roteiro (id_barco_charter, nome, descricao, id_preco, detalhes_pagamento) VALUES 
(1,'Ilhas Paradisíacas lado norte','Piraquara, Laboratório, Pingo de Agua, Paquetá', 5, 'ou 5x de R$2.090'),
(1,'Ilhas Paradisíacas lado sul','Botinas, Piedade, Flechas, Praia do Dentista', 6, 'ou 5x de R$2.090'), 
(1,'Ilha Grande','Lagoa Azul, Lagoa Verde, Bananal, Aripeba, Sitio Forte', 7, 'ou 5x de R$2.310'), 
(1,'Ilha Grande 2','Abraão, Saco do Céu, Feguesia, Japariz, Lagoa Azul (e arredores)', 8, 'ou 5x de R$2.530');

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
