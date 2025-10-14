CREATE TABLE user_type(
    id SERIAL PRIMARY KEY NOT NULL,
    opcao VARCHAR(100)
);
CREATE TABLE app_user(
    id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(100) NOT NULL,
    user_firebase_id VARCHAR(100),
    id_user_type INTEGER NOT NULL,

    CONSTRAINT fk_user_type FOREIGN KEY (id_user_type) REFERENCES user_type(id)
);