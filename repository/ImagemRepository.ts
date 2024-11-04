import db from "../infra/database.ts"
export class ImagemRepository {
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
    async insertImagem(link:string):Promise<number>{
       const idImagem = await db.one(` INSERT INTO imagem(link) VALUES($1) RETURNING id`,[link])
       return idImagem.id
    }
    async associateImagemWhithSeminovo(idSeminovo:number, idImagem:number){
        await db.query("INSERT INTO imagem_barco_seminovo(barco_seminovo_id, imagem_id) VAlUES($1,$2)",[idSeminovo, idImagem])
    }
}

