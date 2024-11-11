import { CustomError } from "../infra/CustoError.ts"
import db from "../infra/database.ts"
export class ImagemRepository {
    async getImagensByIdSeminovo(id: number) {
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

            `, [id])
        return result
    }
    async insertImagem(link: string): Promise<number> {
        const idImagem = await db.one(` INSERT INTO imagem(link) VALUES($1) RETURNING id`, [link])
        return idImagem.id
    }
    async associateImagemWhithSeminovo(idSeminovo: number, idImagem: number) {
        await db.query("INSERT INTO imagem_barco_seminovo(barco_seminovo_id, imagem_id) VAlUES($1,$2)", [idSeminovo, idImagem])
    }
    async deleteAssociationImagemSeminovo(idImagem: number,) {
        try {
            await db.query("DELETE FROM imagem_barco_seminovo WHERE imagem_id = $1", [idImagem])
        } catch (error: any) {
            throw new CustomError(`Repository lever Error: ImagemRepository deleteAssociationImagemSeminovo: ${error}`, 500)
        }
    }
    async deleteImagem(idImagem: number,) {
        try {
            await db.query("DELETE FROM imagem WHERE id = $1", [idImagem])
        } catch (error: any) {
            throw new CustomError(`Repository lever Error: ImagemRepository deleteImagem: ${error}`, 500)
        }
    }
}

