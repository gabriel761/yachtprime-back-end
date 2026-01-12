import { CustomError } from "../infra/CustoError.js";
import db from "../infra/database.js";
import { UserDb, UserInputUpdateValidated, UserInputValidated, UserListDb } from "../types/User.js";
import { UserType } from "../types/UserType.js";

export class UserRepository {

    async getUserTypeIdByName(userType: string): Promise<number> {
        try {
            const userTypeId = await db.one(`SELECT id FROM user_type WHERE opcao = $1`, [userType])
            return userTypeId.id
        } catch (error: any) {
            throw new CustomError(`Repository level Error: UserRepository getUserTypeIdByName: ${error}`, 500)
        }
    }

    async getFirebaseIdByIdUser(idUser: number): Promise<string> {
        try {
            const result = await db.one(`SELECT user_firebase_id FROM app_user WHERE id = $1`, [idUser])
            return result.user_firebase_id
        } catch (error: any) {
            throw new CustomError(`Repository level Error: UserRepository insertUser: ${error}`, 500)
        }
    }

    async getUserTypes(): Promise<UserType[]> {
        const userTypes = await db.query(
            `SELECT  *  FROM user_type`).catch((error) => {
                throw new CustomError(`Repository level Error: UserRepository getUserTypes: ${error}`, 500)
            })
        if (!userTypes) throw new CustomError(`Repository level Error: UserRepository getUserTypes: Nenhum tipo de usuário encontrado`, 404)
        return userTypes
    }


    async getUserTypeByIdFirebase(firebaseId: string){
        const result = await db.oneOrNone(
            `
        SELECT 
          ut.opcao AS user_type
        FROM app_user 
        JOIN user_type AS ut ON id_user_type = ut.id
        WHERE user_firebase_id = $1
      `,
            [firebaseId]
        ).catch((error) => {
            throw new CustomError("Middleware level error: " + error.message, 403)
        })
        return result.user_type
    }

    async getUserIdByIdFirebase(firebaseId: string) {
        const result = await db.oneOrNone(
            `
        SELECT 
          id
        FROM app_user 
        WHERE user_firebase_id = $1
      `,
            [firebaseId]
        ).catch((error) => {
            throw new CustomError("Repository level error: UserRepository: getUserIdByIdFirebase" + error.message, 403)
        })

        return result.id
    }

    async getUserById(id: number): Promise<UserDb> {
        
            const user = await db.oneOrNone(
                `SELECT  
	            app_user.id AS id,
                email,
                nome,
                user_type.opcao AS user_type
            FROM app_user JOIN user_type ON app_user.id_user_type = user_type.id
            WHERE app_user.id = $1
            `, [id]).catch((error) => {
                throw new CustomError(`Repository level Error: UserRepository getUserById: ${error}`, 500)
            })
            if (!user) throw new CustomError(`Repository level Error: UserRepository getUserById: Nenhum usuário encontrado`, 404)
            return user

        
    }

    async getUserDashboardById(id: number): Promise<UserDb> {

        const user = await db.oneOrNone(
            `SELECT
                au.id,
                au.email,
                au.nome,
                ut.opcao AS user_type,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'id', p.id,
                            'nome', p.nome,
                            'email', p.email,
                            'telefone', p.telefone
                        )
                    ) FILTER (WHERE p.id IS NOT NULL),
                    '[]'
                ) AS proprietarios
            FROM app_user au
            LEFT JOIN user_type ut
                ON au.id_user_type = ut.id
            LEFT JOIN app_user_proprietario aup
                ON au.id = aup.id_app_user
            LEFT JOIN proprietario p
                ON aup.id_proprietario = p.id
            WHERE au.id = $1
            GROUP BY au.id, ut.opcao;
            `, [id]).catch((error) => {
                throw new CustomError(`Repository level Error: UserRepository getUserById: ${error}`, 500)
            })
        if (!user) throw new CustomError(`Repository level Error: UserRepository getUserById: Nenhum usuário encontrado`, 404)
        return user


    }

    async getUsers(): Promise<UserListDb[]> {
       
            const users = await db.query(
                `SELECT  
	            app_user.id,
                nome,
	            email,
	            user_type.opcao AS user_type
            FROM app_user JOIN user_type ON app_user.id_user_type = user_type.id`).catch((error) => {
                throw new CustomError(`Repository level Error: UserRepository getUsers: ${error}`, 500)
            })
            if (users.length == 0) throw new CustomError(`Repository level Error: UserRepository getUsers: Nenhum usuário encontrado`, 404)
            return users  
    }

    async insertUser(user: UserInputValidated, firebaseId: string, userTypeId: number) {
        try {
           const result = await db.one(`INSERT INTO app_user (nome ,email, user_firebase_id, id_user_type) VALUES ($1,$2,$3,$4) RETURNING id`, [ user.nome, user.email, firebaseId, userTypeId])
           console.log(result.id)
           return result.id
        } catch (error: any) {
            throw new CustomError(`Repository level Error: UserRepository insertUser: ${error}`, 500)
        }

    }

    async updateUser(user: UserInputUpdateValidated, userTypeId: number) {
        try {
            await  db.query(`UPDATE app_user SET nome= $1, email = $2, id_user_type = $3 WHERE id = $4`, [user.nome, user.email, userTypeId, user.id])
        } catch (error: any) {
            throw new CustomError(`Repository level Error: UserRepository updateUser: ${error}`, 500)
        }
    }

    async deleteAllAssociationWithProprietario(idUser: number){
        try {
            await db.none(`DELETE FROM app_user_proprietario WHERE id_app_user = $1`, [idUser])
        } catch (error) {
            throw new CustomError(`Repository level Error: deleteAllAssociationWithProprietario: ${error}`, 500)
        }
    }

    async deleteUser(idUser: number) {
        try {
            await  db.query(`DELETE FROM app_user WHERE id = $1`, [idUser])
        } catch (error: any) {
            throw new CustomError(`Repository level Error: UserRepository deleteUser: ${error}`, 500)
        }
    }
}