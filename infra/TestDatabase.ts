import db from "./database.js";

export class TestDatabase {
 private db = db
 async resetDbToInitialState(){
     await this.db.query(`TRUNCATE TABLE
    passeio_condicoes,
    item_charter_barco_charter,
    imagem_barco_charter,
    barco_charter,
    passeio,
    consumo_combustivel,
    roteiros_prefixados,
    taxa_churrasco,
    horarios_disponiveis,
    passageiros,
    local_embarque,
    item_seminovo_barco_seminovo,
    imagem_barco_seminovo,
    imagem,
    barco_seminovo,
    cabine,
    preco,
    motorizacao
    RESTART IDENTITY`)
 }
}