import { CustomError } from "../infra/CustoError.js";
import db from "../infra/database.js"
import { ItemSeminovo } from "../types/ItemSeminovo.js";
export class ItemSeminovoRepository {
    async getItensSeminovoByIdSeminovo(id: number) {
            const result = await db.query(`
SELECT 
    isb.item_seminovo_id AS item_id,
    i.item AS nome_item,
    isb.quantidade AS quantidade_item
FROM 
    item_seminovo_barco_seminovo isb
JOIN 
    item_seminovo i ON isb.item_seminovo_id = i.id
WHERE 
    isb.barco_seminovo_id = $1;
;

            `, [id])
            .catch((error)=> {
                throw new CustomError(`Repository lever Error: ItemSeminovoRepository getItensSeminovoByIdSeminovo: ${error}`, 500)
            });
            if(result.length == 0){
                throw new CustomError("Não foram encontrados itens associados a este seminovo idSeminovo="+id, 404)
            }
            return result

    }

    async listItemSeminovo() {
        return db.query("SELECT * FROM item_seminovo")
    }
    async associateItemWithSeminovo(idBarcoSeminovo: number, item: ItemSeminovo) {
        try {
            await db.query("INSERT INTO item_seminovo_barco_seminovo(barco_seminovo_id, item_seminovo_id, quantidade)VALUES($1,$2,$3)", [idBarcoSeminovo, item.id, item.quantidade])
        } catch (error) {
            throw new CustomError(`Repository lever Error: ItemSeminovoRepository associateItemWithSeminovo: ${error}`, 500)
        }
    }
    async deleteAllAssociationItemSeminovo(idBarcoSeminovo: number) {
        try {
            await db.query("DELETE FROM item_seminovo_barco_seminovo WHERE barco_seminovo_id = $1", [idBarcoSeminovo])
        } catch (error: any) {
            throw new CustomError(`Repository lever Error: ItemSeminovoRepository deleteAssociationWithSeminovo: ${error}`, 500)
        }
    }
}