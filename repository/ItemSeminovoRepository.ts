import { CustomError } from "../infra/CustoError.ts";
import db from "../infra/database.ts"
import { ItemSeminovo } from "../types/ItemSeminovo.ts";
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

            `, [id]);
        return result
    }

    async associateItemWithSeminovo(idBarcoSeminovo: number, item: ItemSeminovo) {

        await db.query("INSERT INTO item_seminovo_barco_seminovo(barco_seminovo_id, item_seminovo_id, quantidade)VALUES($1,$2,$3)", [idBarcoSeminovo, item.id, item.quantidade])

    }
    async deleteAllAssociationItemSeminovo(idBarcoSeminovo: number) {
        try {
            await db.query("DELETE FROM item_seminovo_barco_seminovo WHERE barco_seminovo_id = $1", [idBarcoSeminovo])
        } catch (error: any) {
            throw new CustomError(`Repository lever Error: ItemSeminovoRepository deleteAssociationWithSeminovo: ${error}`, 500)
        }
    }
}