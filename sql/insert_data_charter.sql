SET client_encoding TO 'UTF8';
-- Inserindo um preço de exemplo
INSERT INTO preco (valor, id_moeda) VALUES 
(100, 1),
(800, 1),
(600, 1),
(3500, 1),
(500, 1),
(800, 1),
(1500, 1),
(1800, 1),
(200, 1),
(5000, 1);

--Inserido imagem
INSERT INTO imagem(id,link, file_name) VALUES 
(31,'https://www.hmy.com/wp-content/uploads/2019/04/ferretti-760.jpg', 'file-7'),
(32,'https://mondblu.com.br/wp-content/uploads/2022/05/01d0f1f6-f540-4d71-ba68-b8b69a542651.jpg', 'file-8'),
(33,'https://i.ytimg.com/vi/AxyUXPHmYxY/maxresdefault.jpg', 'file-9'),
(34,'https://marealtacharter.com.br/wp-content/uploads/2020/09/Aluguel-de-barco-ferretti-760-em-Angra-dos-Reis-003.jpg', 'file-10'),
(35,'https://sailica-prod-main.s3.eu-central-1.amazonaws.com/3342868030000104834/large/1b651ac54ce528a2275d681abbd21a41.jpg', 'file-11');


-- Inserir roteiros prefixados
INSERT INTO roteiros_prefixados (nome, id_preco, id_dias) VALUES 
('Urca e Praia Vermelha', 7, 1), 
('Cagarras ou Itaipu', 8, 2);

-- Insert into taxa churrasco
INSERT INTO taxa_churrasco (id_preco, mensagem) VALUES 
(9,'Pagamento no dia do passeio diretamente ao capitão');

-- Inserindo um local de embarque de exemplo
INSERT INTO local_embarque ( id_passeio ,nome_local, ponto_encontro, id_preco_taxa_extra, principal) VALUES 
( 1,'Marina da Glória','Restaurante Kitchen', null, true),
( 1,'Iate clube Niterói', null, 1, false);

-- Inserindo informações de passageiros
INSERT INTO passageiros (passageiros, passageiros_pernoite, tripulacao)
VALUES (10, 4, 2);

-- Inserindo consumo de combustível
INSERT INTO consumo_combustivel (litros_hora, id_preco_hora, id_tipo_combustivel)
VALUES (50, 1, 2);

 -- Inserindo um passeio
INSERT INTO passeio ( id_tipo_passeio, duracao_passeio, id_tripulacao_skipper)
VALUES ( 1, 10, 2);

-- Inserindo um horário disponível
INSERT INTO horarios_disponiveis (id_passeio, horario_inicio, horario_fim) VALUES 
( 1,'08:00:00', '13:00:00'),
( 1,'14:00:00', '20:00:00');

-- Inserindo um barco charter
INSERT INTO barco_charter (modelo, nome, ano, tamanho, id_preco, id_passageiros, id_passeio, id_pet_friendly, id_consumo, id_preco_hora_extra, id_preco_aluguel_lancha, id_taxa_churrasco, video_promocional)
VALUES (35, 'Lancha Luxo', 2022, 50, 10, 1, 1,  1, 1, 3, 4, 1, 'https://www.youtube.com/watch?v=EZJ-S9RODF0');


-- Relacionando itens charter com barco charter
INSERT INTO item_charter_barco_charter (id_barco_charter, id_item_charter, quantidade) VALUES 
(1, 8, 1),
(1, 10, 2),
(1, 12, 1);

-- Relacionando imagem com charter
INSERT INTO imagem_barco_charter (id_barco_charter, id_imagem) VALUES 
(1,31),
(1,32),
(1,33),
(1,34),
(1,35);

INSERT INTO passeio_condicoes (id_passeio, id_condicao) VALUES 
(1,3),
(1,4),
(1,6);