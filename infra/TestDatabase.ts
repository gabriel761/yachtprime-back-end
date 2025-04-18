import db from "./database.js";

export class TestDatabase {
 private db = db
 async resetDbToInitialState(){
     await this.db.query(`TRUNCATE TABLE
                            item_charter_barco_charter,
                            imagem_barco_charter,
                            barco_charter,
                            consumo_combustivel,
                            roteiro,
                            barco_charter_condicoes,
                            taxa_churrasco,
                            passageiros,
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