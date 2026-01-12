import { CustomError } from "../../infra/CustoError.js";
import db from "../../infra/database.js"
import { ItemSeminovo } from "../../types/seminovo/ItemSeminovo.js";
export class ItemSeminovoRepository {
    async getItensSeminovoByIdSeminovo(id:number) {
        const result = await db.query(`
SELECT 
    isb.id_item_seminovo AS item_id,
    i.item AS nome_item,
    isb.quantidade AS quantidade_item
FROM 
    item_seminovo_barco_seminovo isb
JOIN 
    item_seminovo i ON isb.id_item_seminovo = i.id
WHERE 
    isb.id_barco_seminovo = $1;
;

            `, [id])
            .catch((error) => {
                throw new CustomError(`Repository level Error: ItemSeminovoRepository getItensSeminovoByIdSeminovo: ${error}`, 500)
            });
        if (result.length == 0) {
            throw new CustomError("Não foram encontrados itens associados a este seminovo idSeminovo=" + id, 404)
        }
        return result

    }

    async listItemSeminovo() {
        return db.query("SELECT * FROM item_seminovo")
    }
    async associateItemWithSeminovo(idBarcoSeminovo: number, item: ItemSeminovo) {
        try {
            await db.query("INSERT INTO item_seminovo_barco_seminovo(id_barco_seminovo, id_item_seminovo, quantidade)VALUES($1,$2,$3)", [idBarcoSeminovo, item.id, item.quantidade])
        } catch (error) {
            throw new CustomError(`Repository level Error: ItemSeminovoRepository associateItemWithSeminovo: ${error}`, 500)
        }
    }
    async deleteAllAssociationItemSeminovo(idBarcoSeminovo: number) {
        try {
            await db.query("DELETE FROM item_seminovo_barco_seminovo WHERE id_barco_seminovo = $1", [idBarcoSeminovo])
        } catch (error: any) {
            throw new CustomError(`Repository level Error: ItemSeminovoRepository deleteAssociationWithSeminovo: ${error}`, 500)
        }
    }

    async insertItemSeminovo(itemSeminovo: ItemSeminovo) {
        try {
            await db.query(`INSERT INTO item_seminovo (item) VALUES ($1);`, [itemSeminovo.item])
        } catch (error: any) {
            throw new CustomError(`Repository level Error: ItemSeminovoRepository insertItemSeminovo: ${error}`, 500)
        }
    }
}