import { CustomError } from "../infra/CustoError.js";
import db from "../infra/database.js";
import { Proprietario } from "../types/Proprietario.js";

export class ProprietarioRepository {
    async getProprietarioById(idProprietario: number) {
        const result = await db.oneOrNone("SELECT * FROM proprietario WHERE id = $1", [idProprietario]).catch((error) => {
            throw new CustomError("Repository level error: ProprietarioRepository getProprietarioById:" + error.message, 500)
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
                WHERE nome ILIKE '%' || $1 || '%' AND au.user_firebase_id = $2 
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

    async associateProprietarioWithUser(idUser: number, idProprietario: number) {
        try {
            await db.none(`INSERT INTO app_user_proprietario (id_app_user, id_proprietario) VALUES($1,$2)`, [idUser, idProprietario])
        } catch (error: any) {
            throw new CustomError("Repository level error: ProprietarioRepository associateProprietarioWithUser: " + error.message, 500)
        }
    }

    async deleteProprietario(idProprietario: number) {
        try {
            await db.query("DELETE FROM proprietario WHERE id=$1", [idProprietario])
        } catch (error: any) {
            if (error.code === "23503") { // violação de chave estrangeira
                throw new CustomError(
                    "Não é possível excluir o proprietário pois há barcos associados a ele.",
                    409
                );
            }
            throw new CustomError("Repository level error: ProprietarioRepository deleteProprietario: " + error.message, 500);
        }
    }
}