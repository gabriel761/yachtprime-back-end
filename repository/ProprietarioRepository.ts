import { CustomError } from "../infra/CustoError.js";
import db from "../infra/database.js";
import { Barco } from "../types/Barco.js";
import { Proprietario } from "../types/Proprietario.js";

export class ProprietarioRepository {
    async getProprietarioById(idProprietario: number) {
        const result = await db.oneOrNone(`
            SELECT 
                id,
                nome,
                email,
                telefone
			FROM proprietario
            WHERE id = $1
        `, [idProprietario]).catch((error) => {
            throw new CustomError("Repository level error: ProprietarioRepository getProprietarioById:" + error.message, 500)
        })
        if (!result) {
            throw new CustomError("proprietario não encontrado: id=" + idProprietario, 404)
        }
        return result
    }
    async getProprietarioDashboardById(idProprietario: number) {
        const result = await db.oneOrNone(`
            SELECT
                p.id,
                p.nome,
                p.email,
                p.telefone,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'id', au.id,
                            'email', au.email,
                            'userType', ut.opcao
                        )
                    ) FILTER (WHERE au.email IS NOT NULL),
                    '[]'
                ) AS usuarios
            FROM proprietario p
            LEFT JOIN app_user_proprietario aup 
                ON aup.id_proprietario = p.id
            LEFT JOIN app_user au 
                ON aup.id_app_user = au.id
            LEFT JOIN user_type ut 
                ON au.id_user_type = ut.id
            WHERE p.id = $1
            GROUP BY p.id;
        `, [idProprietario]).catch((error) => {
            throw new CustomError("Repository level error: ProprietarioRepository getProprietarioDashboardById:" + error.message, 500)
        })
        if (!result) {
            throw new CustomError("proprietario não encontrado: id=" + idProprietario, 404)
        }
        return result
    }

    async listProprietariosDashboard() {
        const result = await db.query("SELECT * FROM proprietario").catch((error) => {
            throw new CustomError("Repository level error: ProprietarioRepository listProprietariosDashboard:" + error.message, 500)
        })
        if (!result) {
            throw new CustomError("Nenhum proprietário encontrado", 404)
        }
        return result
    }

    async listAllBoatsFromProprietario(idProprietario: number):Promise<Barco[]>{
        const result = await db.query(`
            (
                    -- barcos seminovos
                    SELECT
                        bs.codigo AS codigo,
                        'seminovo' AS tipo,
                        mb.modelo AS modelo,
                        img.link AS imagem
                    FROM barco_seminovo bs
                    JOIN modelo_barco mb ON mb.id = bs.id_modelo
                    LEFT JOIN LATERAL (
                        SELECT i.link
                        FROM imagem_barco_seminovo ibs
                        JOIN imagem i ON i.id = ibs.id_imagem
                        WHERE ibs.id_barco_seminovo = bs.id
                        ORDER BY ibs.id ASC
                        LIMIT 1
                    ) img ON TRUE
                    WHERE bs.id_proprietario = $1
                )
                UNION ALL
                (
                    -- barcos charter
                    SELECT
                        bc.codigo AS codigo,
                        'charter' AS tipo,
                        mb.modelo AS modelo,
                        img.link AS imagem
                    FROM barco_charter bc
                    JOIN modelo_barco mb ON mb.id = bc.modelo
                    LEFT JOIN LATERAL (
                        SELECT i.link
                        FROM imagem_barco_charter ibc
                        JOIN imagem i ON i.id = ibc.id_imagem
                        WHERE ibc.id_barco_charter = bc.id
                        ORDER BY ibc.id ASC
                        LIMIT 1
                    ) img ON TRUE
                    WHERE bc.id_proprietario = $1
                );
            `, [idProprietario]).catch((e) => {
                throw new CustomError("Repository level error: ProprietarioRepository listAllBoatsFromProprietario:"+e.message, 500)
            })
            return result
    }

    async getProprietariosByName(nome: string, firebaseId: string) {
        try {
            const result = await db.query(`
                SELECT 
                    p.id, 
                    p.nome , 
                    p.email , 
                    p.telefone
                FROM proprietario AS p
                JOIN  app_user_proprietario AS aup ON p.id = aup.id_proprietario
                JOIN app_user AS au ON au.id = aup.id_app_user
                WHERE p.nome ILIKE '%' || $1 || '%' AND au.user_firebase_id = $2 
                `, [nome, firebaseId])
            return result
        } catch (error: any) {
            throw new CustomError("Repository level error: ProprietarioRepository getProprietariosByName: " + error.message, 500)
        }
    }
    async insertProprietario(proprietarioInput: Proprietario) {
        try {
            const result = await db.one("INSERT INTO proprietario (nome, email, telefone) VALUES ($1,$2,$3) RETURNING id", [proprietarioInput.nome, proprietarioInput.email, proprietarioInput.telefone])
            return result.id
        } catch (error: any) {
            throw new CustomError("Repository level error: ProprietarioRepository insertProprietario: " + error.message, 500)
        }
    }

    async updateProprietario(proprietarioInput: Proprietario) {
        try {
            await db.none("UPDATE proprietario SET nome=$1, email=$2, telefone=$3 WHERE id=$4", [proprietarioInput.nome, proprietarioInput.email, proprietarioInput.telefone, proprietarioInput.id])
        } catch (error: any) {
            throw new CustomError("Repository level error: ProprietarioRepository insertProprietario: " + error.message, 500)
        }
    }

    async associateProprietarioWithUser(idUser: number, idProprietario?: number) {
        
        try {
            await db.none(`INSERT INTO app_user_proprietario (id_app_user, id_proprietario) VALUES($1,$2)`, [idUser, idProprietario])
        } catch (error: any) {
            throw new CustomError("Repository level error: ProprietarioRepository associateProprietarioWithUser: " + error.message, 500)
        }
    }

    async deleteAllAssociationWithUser(idProprietario?: number){
        try {
            await db.none(`DELETE FROM app_user_proprietario WHERE id_proprietario = $1`, [ idProprietario])
        } catch (error: any) {
            throw new CustomError("Repository level error: ProprietarioRepository deleteAllAssociationWithUser: " + error.message, 500)
        }
    }

    async deleteProprietario(idProprietario: number) {
        try {
            await db.query("DELETE FROM proprietario WHERE id=$1", [idProprietario])
        } catch (error: any) {
            if (error.code === "23503") { // violação de chave estrangeira
                throw new CustomError(
                    "Não é possível excluir o proprietário pois há barcos ou usuários associados a ele.",
                    409
                );
            }
            throw new CustomError("Repository level error: ProprietarioRepository deleteProprietario: " + error.message, 500);
        }
    }
}