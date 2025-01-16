CREATE TABLE barco_charter (
    id SERIAL PRIMARY KEY,
    modelo INTEGER NOT NULL,
    nome VARCHAR(100),
    ano INTEGER NOT NULL,
    tamanho INT NOT NULL,
    preco INTEGER NOT NULL,
    passageiros SMALLINT NOT NULL CHECK (passageiros_dia <= 999),
    passageiros_noite SMALLINT CHECK (passageiros_noite <= 999),
    tripulacao INTEGER, -- criar uma tabela para todos os dados de passageiros
    duracao_passeio TINYINT NOT NULL CHECK (duracao_passeio <= 24),
    tipo_passeio INTEGER NOT NULL, -- criar uma tabela para dados de passeio
    embarque_principal INTEGER NOT NULL,
    embarque_alternativo INTEGER,
    horarios INTEGER NOT NULL,
    pernoite INTEGER NOT NULL,
    pet_friendly INTEGER NOT NULL,
    tripulacao_skipper INTEGER NOT NULL, 
    consumo INTEGER NOT NULL, 
    hora_extra INTEGER NOT NULL,
    aluguel_lancha INTEGER NOT NULL,
    roteiros_livres INTEGER NOT NULL,
    video_promocional VARCHAR(500)
);
