SET client_encoding TO 'UTF8';

-- SEMINOVOS --
CREATE TABLE motor_cadastrado(
     id SERIAL PRIMARY KEY NOT NULL,
     marca VARCHAR(100) NOT NULL,
     modelo VARCHAR(200) NOT NULL
);

CREATE TABLE motorizacao(
     id SERIAL PRIMARY KEY NOT NULL,
     quantidade INTEGER NOT NULL,
     potencia INTEGER NOT NULL,
     horas INTEGER NOT NULL,
     ano INTEGER NOT NULL,
     observacoes VARCHAR(250),
     id_motor INTEGER NOT NULL,

     CONSTRAINT fk_motor FOREIGN KEY (id_motor) REFERENCES motor_cadastrado(id)
);

CREATE TABLE moeda(
     id SERIAL PRIMARY KEY NOT NULL,
     nome VARCHAR(100) NOT NULL,
     simbolo VARCHAR(5) NOT NULL,
     codigo_bancario VARCHAR(5) NOT NULL
);

CREATE TABLE preco(
     id SERIAL PRIMARY KEY NOT NULL,
     valor DECIMAL(11, 2) NOT NULL,
     id_moeda INTEGER DEFAULT 1 NOT NULL,

     CONSTRAINT fk_moeda FOREIGN KEY (id_moeda) REFERENCES moeda(id)
);

CREATE TABLE item_seminovo(
     id SERIAL PRIMARY KEY NOT NULL,
     item VARCHAR(100) NOT NULL
);


CREATE TABLE modelo_barco (
     id SERIAL PRIMARY KEY NOT NULL,
     marca VARCHAR(100) NOT NULL,
     modelo VARCHAR(200) NOT NULL
);

CREATE TABLE tipo_combustivel(
     id SERIAL PRIMARY KEY NOT NULL,
     opcao VARCHAR(50) NOT NULL
);

CREATE TABLE cabine(
     id SERIAL PRIMARY KEY NOT NULL,
     passageiro INTEGER NOT NULL,
     tripulacao INTEGER
);

CREATE TABLE propulsao(
     id SERIAL PRIMARY KEY NOT NULL,
     opcao VARCHAR(50) NOT NULL
);

CREATE TABLE barco_seminovo(
     id SERIAL PRIMARY KEY NOT NULL,
     id_modelo INTEGER NOT NULL,
     nome VARCHAR (150) NOT NULL,
     ano INTEGER NOT NULL,
     tamanho INTEGER NOT NULL,
     id_motorizacao INTEGER NOT NULL,
     potencia_total INTEGER NOT NULL,
     id_combustivel INTEGER  NOT NULL,
     id_propulsao INTEGER  NOT NULL,
     id_cabine INTEGER  NOT NULL,
     procedencia VARCHAR(50) NOT NULL,
     destaque VARCHAR(100),
     id_preco INTEGER NOT NULL,
     video VARCHAR(1000),
     oportunidade BOOLEAN DEFAULT false,

     CONSTRAINT fk_modelo FOREIGN KEY (id_modelo) REFERENCES modelo_barco(id),
     CONSTRAINT fk_motorizacao FOREIGN KEY (id_motorizacao) REFERENCES motorizacao(id),
     CONSTRAINT fk_combustivel FOREIGN KEY (id_combustivel) REFERENCES tipo_combustivel(id),
     CONSTRAINT fk_propulsao FOREIGN KEY (id_propulsao) REFERENCES propulsao(id),
     CONSTRAINT fk_cabine FOREIGN KEY (id_cabine) REFERENCES cabine(id),
     CONSTRAINT fk_preco FOREIGN KEY (id_preco) REFERENCES preco(id)
);


CREATE TABLE imagem(
     id SERIAL PRIMARY KEY NOT NULL,
     file_name VARCHAR(500), 
     link VARCHAR(1000) NOT NULL
);
CREATE TABLE imagem_barco_seminovo(
     id SERIAL PRIMARY KEY NOT NULL,
     id_barco_seminovo INTEGER  NOT NULL,
     id_imagem INTEGER  NOT NULL,

     CONSTRAINT fk_barco_seminovo FOREIGN KEY (id_barco_seminovo) REFERENCES barco_seminovo(id),
     CONSTRAINT fk_imagem FOREIGN KEY (id_imagem) REFERENCES imagem(id)
);
CREATE TABLE item_seminovo_barco_seminovo(
     id SERIAL PRIMARY KEY NOT NULL,
     id_barco_seminovo INTEGER NOT NULL,
     id_item_seminovo INTEGER NOT NULL,
     quantidade INTEGER NOT NULL,

     CONSTRAINT fk_barco_seminovo FOREIGN KEY (id_barco_seminovo) REFERENCES barco_seminovo(id),
     CONSTRAINT fk_item_seminovo FOREIGN KEY (id_item_seminovo) REFERENCES item_seminovo(id)
);

-- CHARTER --


CREATE TABLE pet_friendly (
    id SERIAL PRIMARY KEY,
    opcao VARCHAR(50) NOT NULL, CHECK(opcao IN ('Não', 'Pequeno porte', 'Grande e pequeno porte'))
);
CREATE TABLE item_charter(
     id SERIAL PRIMARY KEY NOT NULL,
     item VARCHAR(100) NOT NULL,
     item_lazer BOOLEAN DEFAULT true NOT NULL
);


CREATE TABLE local_embarque (
    id SERIAL PRIMARY KEY,
    id_passeio INTEGER NOT NULL,
    nome_local VARCHAR(200),
    ponto_encontro VARCHAR(200),
    id_preco_taxa_extra INTEGER,
    principal BOOLEAN DEFAULT false,
    
    CONSTRAINT fk_taxa_extra FOREIGN KEY (id_preco_taxa_extra) REFERENCES preco(id),
    CONSTRAINT fk_passeio FOREIGN KEY (id_passeio) REFERENCES preco(id)
);

CREATE TABLE condicao (
    id SERIAL PRIMARY KEY,
    opcao VARCHAR (150)
);


CREATE TABLE passageiros (
    id SERIAL PRIMARY KEY,
    passageiros INTEGER NOT NULL,
    passageiros_pernoite INTEGER,
    tripulacao INTEGER NOT NULL
);

CREATE TABLE roteiros_livres (
    id SERIAL PRIMARY KEY,
    opcao VARCHAR(50) NOT NULL, CHECK(opcao IN ('Não disponível', 'Sob consulta'))
);

CREATE TABLE opcoes_de_dias (
    id SERIAL PRIMARY KEY,
    opcao VARCHAR(100) NOT NULL, CHECK(opcao IN ('Sábado, domingo e feriados','Dias de semana', 'Todos os dias', 'Sob consulta'))
);



CREATE TABLE tipo_passeio (
    id SERIAL PRIMARY KEY,
    opcao VARCHAR(50) NOT NULL, CHECK(opcao IN ('Day use', 'Day use e pernoite'))
);

CREATE TABLE tripulacao_skipper (
    id SERIAL PRIMARY KEY,
    opcao VARCHAR(50) NOT NULL, CHECK(opcao IN ('Tripulação inclusa', 'Skipper incluso'))
);

CREATE TABLE taxa_churrasco (
 id SERIAL PRIMARY KEY,
 id_preco INTEGER NOT NULL,
 mensagem VARCHAR (400),

CONSTRAINT fk_preco FOREIGN KEY (id_preco) REFERENCES preco(id)
);

CREATE TABLE roteiros_prefixados (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150),
    id_preco INTEGER NOT NULL,
    id_dias INTEGER NOT NULL,

    CONSTRAINT fk_preco FOREIGN KEY (id_preco) REFERENCES preco(id)
);

CREATE TABLE consumo_combustivel (
    id SERIAL PRIMARY KEY,
    litros_hora INTEGER NOT NULL,
    id_preco_hora INTEGER NOT NULL,
    id_tipo_combustivel INTEGER NOT NULL,

    CONSTRAINT fk_preco_hora FOREIGN KEY (id_preco_hora) REFERENCES preco(id),
    CONSTRAINT fk_tipo_combustivel FOREIGN KEY (id_tipo_combustivel) REFERENCES tipo_combustivel(id)
);

CREATE TABLE passeio (
    id SERIAL PRIMARY KEY,
    id_tipo_passeio INTEGER NOT NULL,
    duracao_passeio INTEGER NOT NULL CHECK (duracao_passeio <= 24),
    id_tripulacao_skipper INTEGER NOT NULL,

    CONSTRAINT fk_tipo_passeio FOREIGN KEY (id_tipo_passeio) REFERENCES tipo_passeio(id),
    CONSTRAINT fk_tripulacao_skipper FOREIGN KEY (id_tripulacao_skipper) REFERENCES tripulacao_skipper(id)
);

CREATE TABLE horarios_disponiveis (
    id SERIAL PRIMARY KEY,
    id_passeio INTEGER NOT NULL,
    horario_inicio TIME,
    horario_fim TIME, 

    CONSTRAINT fk_passeio FOREIGN KEY (id_passeio) REFERENCES passeio(id)
);

CREATE TABLE barco_charter (
    id SERIAL PRIMARY KEY,
    modelo INTEGER NOT NULL,
    nome VARCHAR(100),
    ano INTEGER NOT NULL,
    tamanho INT NOT NULL,
    id_preco INTEGER NOT NULL,
    id_passageiros INTEGER NOT NULL,
    id_passeio INTEGER NOT NULL,
    id_pet_friendly INTEGER NOT NULL,
    id_consumo INTEGER NOT NULL, 
    id_preco_hora_extra INTEGER NOT NULL,
    id_preco_aluguel_lancha INTEGER NOT NULL,
    id_taxa_churrasco INTEGER NOT NULL,
    video_promocional VARCHAR(500),

    CONSTRAINT fk_preco FOREIGN KEY (id_preco) REFERENCES preco(id),
    CONSTRAINT fk_passageiros FOREIGN KEY (id_passageiros) REFERENCES passageiros(id),
    CONSTRAINT fk_passeio FOREIGN KEY (id_passeio) REFERENCES passeio(id),
    CONSTRAINT fk_pet_friendly FOREIGN KEY (id_pet_friendly) REFERENCES pet_friendly(id),
    CONSTRAINT fk_consumo FOREIGN KEY (id_consumo) REFERENCES consumo_combustivel(id),
    CONSTRAINT fk_preco_hora_extra FOREIGN KEY (id_preco_hora_extra) REFERENCES preco(id),
    CONSTRAINT fk_preco_aluguel_lancha FOREIGN KEY (id_preco_aluguel_lancha) REFERENCES preco(id),
    CONSTRAINT fk_taxa_churrasco FOREIGN KEY (id_taxa_churrasco) REFERENCES preco(id)
);

CREATE TABLE imagem_barco_charter (
    id SERIAL PRIMARY KEY,
    id_barco_charter  INTEGER NOT NULL,
    id_imagem INTEGER NOT NULL,

    CONSTRAINT fk_imagem FOREIGN KEY (id_imagem) REFERENCES imagem(id),
    CONSTRAINT fk_barco_charter FOREIGN KEY (id_barco_charter) REFERENCES barco_charter(id)
);

CREATE TABLE item_charter_barco_charter ( 
    id SERIAL PRIMARY KEY,
    id_barco_charter INTEGER NOT NULL,
    id_item_charter INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    CONSTRAINT fk_item_charter FOREIGN KEY (id_item_charter) REFERENCES item_charter(id),
    CONSTRAINT fk_barco_charter FOREIGN KEY (id_barco_charter) REFERENCES barco_charter(id)
);

CREATE TABLE passeio_condicoes (
    id SERIAL PRIMARY KEY,
    id_passeio INTEGER NOT NULL,
    id_condicao INTEGER NOT NULL,

    CONSTRAINT fk_passeio FOREIGN KEY (id_passeio) REFERENCES passeio(id),
    CONSTRAINT fk_condicao FOREIGN KEY (id_condicao) REFERENCES condicao(id)
);