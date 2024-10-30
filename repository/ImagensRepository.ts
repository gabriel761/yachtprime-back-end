import db from "../infra/database.ts"
export class ImagensRepository {
    async getImagensByIdSeminovo(id:number) {
        const result = await db.query(`
SELECT 
    i.id AS imagem_id,
    i.link AS link_imagem
FROM 
    imagem_barco_seminovo ibs
JOIN 
    imagem i ON ibs.imagem_id = i.id
WHERE 
    ibs.barco_seminovo_id = $1;

            `,[id])
            return result
    }
}

