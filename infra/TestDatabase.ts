import db from "./database.js";

export class TestDatabase {
 private db = db
 async resetDbToInitialState(){
     await this.db.query(`TRUNCATE TABLE motorizacao, imagem, preco, barco_seminovo, horario_disponivel_passeio, consumo_combustivel, roteiro_prefixado, taxa_churrasco, endereco, item_seminovo_barco_seminovo, item_charter_barco_charter, barco_charter, imagem_barco_charter, imagem_barco_seminovo, cabine, embarque_alternativo, condicao_barco_charter RESTART IDENTITY`)
 }
}