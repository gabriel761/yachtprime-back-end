import { CustomError } from "../infra/CustoError.js"
import db from "../infra/database.js"
export class ImagemRepository {
    async getImagensByIdSeminovo(id: number) {
        const result = await db.query(`
                SELECT 
                    i.id AS id_imagem,
                    i.link AS link_imagem,
                    i.file_name AS imagem_file_name
                FROM 
                    imagem_barco_seminovo ibs
                JOIN 
                    imagem i ON ibs.id_imagem = i.id
                WHERE 
                    ibs.id_barco_seminovo = $1;

            `, [id])
            .catch((error) => {
                throw new CustomError(`Repository level error: ImagemRepository:getImagensByIdSeminovo: ${error.message}`, 500)
            })
        if (result.length == 0) {
            throw new CustomError("Não há imagens associadas a este seminovo", 404)
        }
        return result
    }

    async getImagensByIdCharter(id: number) {
        const result = await db.query(`
                SELECT 
                    i.id AS id_imagem,
                    i.link AS link_imagem,
                    i.file_name AS imagem_file_name
                FROM 
                    imagem_barco_charter ibc
                JOIN 
                    imagem i ON ibc.id_imagem = i.id
                WHERE 
                    ibc.id_barco_charter = $1;

            `, [id])
            .catch((error) => {
                throw new CustomError(`Repository level error: ImagemRepository:getImagensByIdCharter: ${error.message}`, 500)
            })
        if (result.length == 0) {
            throw new CustomError("Não há imagens associadas a este barco charter", 404)
        }
        return result
    }
    async getImagemById(idImagem: number,) {
        const imagem = await db.oneOrNone("SELECT * FROM imagem_barco_seminovo WHERE id_barco_seminovo = $1", [idImagem])
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
            await db.query("INSERT INTO imagem_barco_seminovo(id_barco_seminovo, id_imagem) VAlUES($1,$2)", [idSeminovo, idImagem])
        } catch (error: any) {
            throw new CustomError(`Repository level error: ImagemRepository: associateImagemWhithSeminovo: ${error.message}`, 500)
        }
    }
    async associateImagemWhithCharter(idSeminovo: number, idImagem: number) {
        try {
            await db.query("INSERT INTO imagem_barco_charter(id_barco_charter, id_imagem) VAlUES($1,$2)", [idSeminovo, idImagem])
        } catch (error: any) {
            throw new CustomError(`Repository level error: ImagemRepository: associateImagemWhithCharter: ${error.message}`, 500)
        }
    }
    async deleteAssociationImagemSeminovo(idImagem: number,) {
        try {
            await db.query("DELETE FROM imagem_barco_seminovo WHERE id_imagem = $1", [idImagem])
        } catch (error: any) {
            throw new CustomError(`Repository lever Error: ImagemRepository deleteAssociationImagemSeminovo: ${error}`, 500)
        }
    }

    async deleteAssociationImagemCharter(idImagem: number,) {
        try {
            await db.query("DELETE FROM imagem_barco_charter WHERE id_imagem = $1", [idImagem])
        } catch (error: any) {
            throw new CustomError(`Repository lever Error: ImagemRepository deleteAssociationImagemCharter: ${error}`, 500)
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

