
-- SEMINOVOS --
CREATE TABLE motor_cadastrado(
     id SERIAL PRIMARY KEY,
     marca VARCHAR(100) NOT NULL,
     modelo VARCHAR(200) NOT NULL
);

CREATE TABLE motor(
     id SERIAL PRIMARY KEY,
     quantidade INTEGER NOT NULL,
     potencia INTEGER NOT NULL,
     horas INTEGER NOT NULL,
     ano INTEGER NOT NULL,
     observacoes VARCHAR(250),
     motor_id INTEGER REFERENCES motor_cadastrado(id)
);

CREATE TABLE moeda(
     id SERIAL PRIMARY KEY,
     nome VARCHAR(100) NOT NULL,
     simbolo VARCHAR(5) NOT NULL,
     codigo_bancario VARCHAR(5) NOT NULL
);

CREATE TABLE preco(
     id SERIAL PRIMARY KEY,
     valor DECIMAL(11, 2) NOT NULL,
     moeda_id INTEGER REFERENCES moeda(id) DEFAULT 1 NOT NULL
);

CREATE TABLE item_seminovo(
     id SERIAL PRIMARY KEY,
     item VARCHAR(100) NOT NULL
);

CREATE TABLE item_charter(
     id SERIAL PRIMARY KEY,
     item VARCHAR(100) NOT NULL,
     item_lazer BOOLEAN DEFAULT true NOT NULL
);

CREATE TABLE modelo_cadastrado (
     id SERIAL PRIMARY KEY,
     marca VARCHAR(100) NOT NULL,
     modelo VARCHAR(200) NOT NULL
);

CREATE TABLE tipo_combustivel(
     id SERIAL PRIMARY KEY,
     opcao VARCHAR(50) NOT NULL
);

CREATE TABLE cabine(
     id SERIAL PRIMARY KEY,
     passageiro INTEGER NOT NULL,
     tripulacao INTEGER
);

CREATE TABLE propulsao(
     id SERIAL PRIMARY KEY,
     opcao VARCHAR(50) NOT NULL
);

CREATE TABLE barco_seminovo(
     id SERIAL PRIMARY KEY,
     modelo_id INTEGER REFERENCES modelo_cadastrado(id) NOT NULL,
     nome VARCHAR (150) NOT NULL,
     ano INTEGER NOT NULL,
     tamanho INTEGER NOT NULL,
     motor_id INTEGER REFERENCES motor(id) NOT NULL,
     potencia_total INTEGER NOT NULL,
     combustivel INTEGER REFERENCES tipo_combustivel(id) NOT NULL,
     propulsao INTEGER REFERENCES propulsao(id) NOT NULL,
     cabine INTEGER REFERENCES cabine(id) NOT NULL,
     procedencia VARCHAR(50) NOT NULL,
     destaque VARCHAR(100),
     preco_id INTEGER REFERENCES preco(id) NOT NULL,
     video VARCHAR(1000)
);

-- CHARTER --
CREATE TABLE pet_friendly(
     id SERIAL PRIMARY KEY,
     opcao VARCHAR(50) NOT NULL
);

CREATE TABLE tipo_passeio(
     id SERIAL PRIMARY KEY,
     opcao VARCHAR(50) NOT NULL
);

CREATE TABLE pernoite(
     id SERIAL PRIMARY KEY,
     opcao VARCHAR(50) NOT NULL
);

CREATE TABLE tripulacao_skipper(
     id SERIAL PRIMARY KEY,
     opcao VARCHAR(50) NOT NULL
);

CREATE TABLE condicoes(
     id SERIAL PRIMARY KEY,
     opcao VARCHAR(250) NOT NULL
);


CREATE TABLE consumo_combustivel(
     id SERIAL PRIMARY KEY,
     litros_hora INTEGER,
     preco_hora INTEGER REFERENCES preco(id),
     tipo_combustivel INTEGER REFERENCES tipo_combustivel(id) NOT NULL
);

CREATE TABLE opcao_dias(
     id SERIAL PRIMARY KEY,
     opcao VARCHAR(50) NOT NULL
);

CREATE TABLE taxa_churrasco(
     id SERIAL PRIMARY KEY,
     preco INTEGER REFERENCES preco(id) NOT NULL,
     mensagem VARCHAR(300)
);

CREATE TABLE endereco(
     id SERIAL PRIMARY KEY,
     nome_local VARCHAR(100),
     rua VARCHAR(200) NOT NULL,
     numero VARCHAR (10) NOT NULL,
     bairro VARCHAR (100) NOT NULL,
     cidade VARCHAR(100) NOT NULL,
     uf VARCHAR(3) NOT NULL,
     cep VARCHAR(10) NOT NULL
);

CREATE TABLE barco_charter(
     id SERIAL PRIMARY KEY,
     modelo_id INTEGER REFERENCES modelo_cadastrado(id) NOT NULL,
     nome VARCHAR(100) NOT NULL,
     ano INTEGER NOT NULL,
     tamanho INTEGER NOT NULL,
     preco INTEGER REFERENCES preco(id) NOT NULL,
     passageiros INTEGER NOT NULL,
     passageiros_pernoite INTEGER,
     duracao_passeio INTEGER NOT NULL,
     tipo_passeio INTEGER REFERENCES tipo_passeio(id) NOT NULL,
     embarque_principal INTEGER REFERENCES endereco(id) NOT NULL,
     embarque_alternativo INTEGER REFERENCES endereco(id),
     ponto_encontro INTEGER REFERENCES endereco(id),
     tripulacao_skipper INTEGER REFERENCES tripulacao_skipper(id) NOT NULL,
     hora_extra INTEGER REFERENCES preco(id),
     aluguel_lancha INTEGER REFERENCES preco(id),
     taxa_churrasco INTEGER REFERENCES taxa_churrasco(id),  
     video VARCHAR(1000)
);
CREATE TABLE imagem(
     id SERIAL PRIMARY KEY,
     link VARCHAR(1000) NOT NULL
);
CREATE TABLE imagem_barco_seminovo(
     id SERIAL PRIMARY KEY,
     barco_seminovo_id INTEGER REFERENCES barco_seminovo(id) NOT NULL,
     imagem_id INTEGER REFERENCES imagem(id) NOT NULL
);
CREATE TABLE imagem_barco_charter(
     id SERIAL PRIMARY KEY,
     barco_charter_id INTEGER REFERENCES barco_charter(id) NOT NULL,
     imagem_id INTEGER REFERENCES imagem(id) NOT NULL
);
CREATE TABLE item_seminovo_barco_seminovo(
     id SERIAL PRIMARY KEY,
     barco_seminovo_id INTEGER REFERENCES barco_seminovo(id) NOT NULL,
     item_seminovo_id INTEGER REFERENCES item_seminovo(id) NOT NULL,
     quantidade INTEGER NOT NULL
);

CREATE TABLE roteiro_prefixado(
     id SERIAL PRIMARY KEY,
     nome VARCHAR(100) NOT NULL,
     preco INTEGER REFERENCES preco(id) NOT NULL,
     dias INTEGER REFERENCES opcao_dias(id) NOT NULL,
     barco_charter_id INTEGER REFERENCES barco_charter(id) NOT NULL
);
CREATE TABLE item_charter_barco_charter(
     id SERIAL PRIMARY KEY,
     barco_charter_id INTEGER REFERENCES barco_charter(id) NOT NULL,
     item_seminovo_id INTEGER REFERENCES item_seminovo(id) NOT NULL,
     quantidade INTEGER NOT NULL
);
CREATE TABLE horario_disponivel_passeio(
     id SERIAL PRIMARY KEY,
     horario_inicio TIME NOT NULL,
     horario_fim TIME NOT NULL,
     barco_charter_id INTEGER REFERENCES barco_charter(id) NOT NULL
);