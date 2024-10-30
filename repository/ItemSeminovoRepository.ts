import db from "../infra/database.ts"
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
        return result
    }
}