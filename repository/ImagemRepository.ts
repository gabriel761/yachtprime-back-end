import { CustomError } from "../infra/CustoError.js"
import db from "../infra/database.js"
export class ImagemRepository {
    async getImagensByIdSeminovo(id: number) {
        const result = await db.query(`
                SELECT 
                    i.id AS imagem_id,
                    i.link AS link_imagem,
                    i.file_name AS imagem_file_name
                FROM 
                    imagem_barco_seminovo ibs
                JOIN 
                    imagem i ON ibs.imagem_id = i.id
                WHERE 
                    ibs.barco_seminovo_id = $1;

            `, [id])
            .catch((error) => {
                throw new CustomError(`Repository level error: ImagemRepository:getImagensByIdSeminovo: ${error.message}`, 500)
            })
        if (result.length == 0) {
            throw new CustomError("Não há imagens associadas a este seminovo", 404)
        }
        return result
    }
    async getImagemById(idImagem: number,) {
        const imagem = await db.oneOrNone("SELECT * FROM imagem_barco_seminovo WHERE barco_seminovo_id = $1", [idImagem])
            .catch((error) => {
                throw new CustomError(`Repository level error: ImagemRepository:getImagensFromAssociationImagemSeminovoByIdSeminovo: ${error.message}`, 500)
            })
        if (!imagem) {
            throw new CustomError("Não há imagem com o id " + idImagem, 404)
        }
        return imagem
    }
    async insertImagem(link: string, fileName: string | null | undefined): Promise<number> {
        try {
            const idImagem = await db.one(` INSERT INTO imagem(link, file_name) VALUES($1, $2) RETURNING id`, [link, fileName])
            return idImagem.id
        } catch (error: any) {
            throw new CustomError(`Repository level error: ImagemRepository:insertImagem: ${error.message}`, 500)
        }
    }
    async associateImagemWhithSeminovo(idSeminovo: number, idImagem: number) {
        try {
            await db.query("INSERT INTO imagem_barco_seminovo(barco_seminovo_id, imagem_id) VAlUES($1,$2)", [idSeminovo, idImagem])
        } catch (error: any) {
            throw new CustomError(`Repository level error: ImagemRepository: associateImagemWhithSeminovo: ${error.message}`, 500)
        }
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

