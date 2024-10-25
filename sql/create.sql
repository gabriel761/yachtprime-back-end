
-- SEMINOVOS --
CREATE TABLE motor_cadastrado(
     id SERIAL PRIMARY KEY,
     marca VARCHAR(100) NOT NULL,
     modelo VARCHAR(200) NOT NULL
);

CREATE TABLE motor(
     id SERIAL PRIMARY KEY,
     quantidade INTEGER NOT NULL,
     horas INTEGER NOT NULL,
     ano INTEGER NOT NULL,
     motor_id INTEGER REFERENCES motor_cadastrado(id)
);

CREATE TABLE moeda(
     id SERIAL PRIMARY KEY,
     nome VARCHAR(100),
     simbolo VARCHAR(5),
     codigo_bancario VARCHAR(5)
);

CREATE TABLE preco(
     id SERIAL PRIMARY KEY,
     valor DECIMAL(11, 2),
     moeda_id INTEGER REFERENCES moeda(id) DEFAULT 1 
);

CREATE TABLE item_seminovo(
     id SERIAL PRIMARY KEY,
     item VARCHAR(100)
);

CREATE TABLE item_charter(
     id SERIAL PRIMARY KEY,
     item VARCHAR(100),
     item_lazer BOOLEAN
);

CREATE TABLE modelo_cadastrado (
     id SERIAL PRIMARY KEY,
     marca VARCHAR(100) NOT NULL,
     modelo VARCHAR(200) NOT NULL
);

CREATE TABLE barco_seminovo(
     id SERIAL PRIMARY KEY,
     modelo_id INTEGER REFERENCES modelo_cadastrado(id),
     nome VARCHAR (150),
     ano INTEGER,
     tamanho INTEGER,
     motor_id INTEGER REFERENCES motor(id),
     preco_id INTEGER REFERENCES preco(id),
     video VARCHAR(1000)
);

-- CHARTER --
CREATE TABLE pet_friendly(
     id SERIAL PRIMARY KEY,
     opcao VARCHAR(50)
);

CREATE TABLE tipo_passeio(
     id SERIAL PRIMARY KEY,
     opcao VARCHAR(50)
);

CREATE TABLE pernoite(
     id SERIAL PRIMARY KEY,
     opcao VARCHAR(50)
);

CREATE TABLE tripulacao_skipper(
     id SERIAL PRIMARY KEY,
     opcao VARCHAR(50)
);

CREATE TABLE condicoes(
     id SERIAL PRIMARY KEY,
     opcao VARCHAR(250)
);

CREATE TABLE horario(
     id SERIAL PRIMARY KEY,
     horas INTEGER,
     minutos INTEGER
);

CREATE TABLE tipo_combustivel(
     id SERIAL PRIMARY KEY,
     opcao VARCHAR(50)
);

CREATE TABLE consumo_combustivel(
     id SERIAL PRIMARY KEY,
     litros_hora INTEGER,
     preco_hora INTEGER REFERENCES preco(id),
     tipo_combustivel INTEGER REFERENCES tipo_combustivel(id)
);

CREATE TABLE opcao_dias(
     id SERIAL PRIMARY KEY,
     opcao VARCHAR(50)
);

CREATE TABLE taxa_churrasco(
     id SERIAL PRIMARY KEY,
     disponivel BOOLEAN,
     preco INTEGER REFERENCES preco(id),
     mensagem VARCHAR(300)
);

CREATE TABLE endereco(
     id SERIAL PRIMARY KEY,
     nome_local VARCHAR(100),
     rua VARCHAR(200),
     numero VARCHAR (10),
     cidade VARCHAR(50),
     uf VARCHAR(3),
     cep VARCHAR(10)
);

CREATE TABLE barco_charter(
     id SERIAL PRIMARY KEY,
     modelo_id INTEGER REFERENCES modelo_cadastrado(id),
     nome VARCHAR(100),
     ano INTEGER,
     tamanho INTEGER,
     preco INTEGER REFERENCES preco(id),
     passageiros INTEGER,
     passageiros_pernoite INTEGER,
     duracao_passeio INTEGER,
     tipo_passeio INTEGER REFERENCES tipo_passeio(id),
     embarque_principal INTEGER REFERENCES endereco(id),
     embarque_alternativo INTEGER REFERENCES endereco(id),
     ponto_encontro INTEGER REFERENCES endereco(id),
     tripulacao_skipper INTEGER REFERENCES tripulacao_skipper(id),
     hora_extra INTEGER REFERENCES preco(id),
     aluguel_lancha INTEGER REFERENCES preco(id),
     taxa_churrasco INTEGER REFERENCES taxa_churrasco(id),  
     video VARCHAR(1000)
);
CREATE TABLE imagem(
     id SERIAL PRIMARY KEY,
     link VARCHAR(1000)
);
CREATE TABLE imagem_barco_seminovo(
     id SERIAL PRIMARY KEY,
     barco_seminovo_id INTEGER REFERENCES barco_seminovo(id),
     imagem_id INTEGER REFERENCES imagem(id)
);
CREATE TABLE imagem_barco_charter(
     id SERIAL PRIMARY KEY,
     barco_charter_id INTEGER REFERENCES barco_charter(id),
     imagem_id INTEGER REFERENCES imagem(id)
);
CREATE TABLE item_seminovo_barco_seminovo(
     id SERIAL PRIMARY KEY,
     barco_seminovo_id INTEGER REFERENCES barco_seminovo(id),
     item_seminovo_id INTEGER REFERENCES item_seminovo(id),
     quantidade INTEGER
);

CREATE TABLE roteiro_prefixado(
     id SERIAL PRIMARY KEY,
     nome VARCHAR(100),
     preco INTEGER REFERENCES preco(id),
     dias INTEGER REFERENCES opcao_dias(id),
     barco_charter_id INTEGER REFERENCES barco_charter(id)
);
CREATE TABLE item_charter_barco_charter(
     id SERIAL PRIMARY KEY,
     barco_charter_id INTEGER REFERENCES barco_charter(id),
     item_seminovo_id INTEGER REFERENCES item_seminovo(id),
     quantidade INTEGER
);
CREATE TABLE horario_disponivel_passeio(
     id SERIAL PRIMARY KEY,
     horario_inicio INTEGER REFERENCES horario(id),
     horario_fim INTEGER REFERENCES horario(id),
     barco_charter_id INTEGER REFERENCES barco_charter(id)
);