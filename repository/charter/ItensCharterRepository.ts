import { CustomError } from "../../infra/CustoError.js";
import db from "../../infra/database.js";
import { ItemCharterDb, ItemCharter } from "../../types/charter/ItemCharter.js";

export class ItensCharterRepository {
    async getItensCharterByIdCharter(id: number): Promise<ItemCharterDb[]> {
        const result = await db.query(`
SELECT 
    icb.id_item_charter AS item_id,
    i.item AS nome_item,
    i.item_lazer,
    icb.quantidade AS quantidade_item
FROM 
    item_charter_barco_charter icb
JOIN 
    item_charter i ON icb.id_item_charter = i.id
WHERE 
    icb.id_barco_charter = $1;
            `, [id])
            .catch((error) => {
                throw new CustomError(`Repository lever Error: ItemCharterRepository getItensCharterByIdCharter: ${error}`, 500)
            });
        if (result.length == 0) {
            throw new CustomError("Não foram encontrados itens associados a este barco idCharter=" + id, 404)
        }

      
        return result

    }
    async associateItemWithCharter(idCharter: number, itemCharter: ItemCharter) {
       
        await db.query(`
INSERT INTO item_charter_barco_charter (id_barco_charter, id_item_charter, quantidade) VALUES ($1, $2, $3);
            `, [idCharter, itemCharter.id, itemCharter.quantidade])
            .catch((error) => {
                throw new CustomError(`Repository lever Error: ItemCharterRepository associateItemWithCharter: ${error}`, 500)
            });

    }
    async deleteAssiciationOfItemWithCharter(idCharter:number) {
        await db.query(`
                DELETE FROM item_charter_barco_charter WHERE id_barco_charter = $1;
            `, [idCharter])
            .catch((error) => {
                throw new CustomError(`Repository lever Error: ItemCharterRepository deleteAssiciationOfItemWithCharter: ${error}`, 500)
            });

    }

}
