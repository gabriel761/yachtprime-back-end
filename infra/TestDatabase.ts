import db from "./database.js";

export class TestDatabase {
 private db = db
 async resetDbToInitialState(){
     await this.db.query(`TRUNCATE TABLE
    imagem_barco_seminovo,
    item_seminovo_barco_seminovo,
    imagem_barco_charter,
    item_charter_barco_charter,
    barco_charter_condicoes,
    roteiro,
    barco_seminovo,
    barco_charter,
    motorizacao,
    consumo_combustivel,
    taxa_churrasco,
    preco,
    imagem,
    cabine,
    passageiros
RESTART IDENTITY CASCADE;`)
 }
}