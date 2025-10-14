import { CustomError } from "../infra/CustoError.js";
import dbUser from "../infra/databaseUser.js";
import { User, UserInput, UserInputUpdate, UserInputUpdateValidated, UserInputValidated } from "../types/User.js";
import { UserType } from "../types/UserType.js";

export class UserRepository {

    async getUserTypeIdByName(userType: string): Promise<number> {
        try {
            const userTypeId = await dbUser.one(`SELECT id FROM user_type WHERE opcao = $1`, [userType])
            return userTypeId.id
        } catch (error: any) {
            throw new CustomError(`Repository level Error: UserRepository getUserTypeIdByName: ${error}`, 500)
        }
    }

    async getFirebaseIdByIdUser(idUser: number): Promise<string> {
        try {
            const result = await dbUser.one(`SELECT user_firebase_id FROM app_user WHERE id = $1`, [idUser])
            return result.user_firebase_id
        } catch (error: any) {
            throw new CustomError(`Repository level Error: UserRepository insertUser: ${error}`, 500)
        }
    }

    async getUserTypes(): Promise<UserType[]> {
        const userTypes = await dbUser.query(
            `SELECT  *  FROM user_type`)
        return userTypes
    }

    async getUsers(): Promise<UserType[]> {
        const userTypes = await dbUser.query(
            `SELECT  
	            app_user.id,
	            email,
	            user_type.opcao AS user_type
            FROM app_user JOIN user_type ON app_user.id_user_type = user_type.id`)
        return userTypes
    }

    async insertUser(user: UserInputValidated, firebaseId: string, userTypeId: number) {
        try {
            dbUser.query(`INSERT INTO app_user (email, user_firebase_id, id_user_type) VALUES ($1,$2,$3)`, [user.email, firebaseId, userTypeId])
        } catch (error: any) {
            throw new CustomError(`Repository level Error: UserRepository insertUser: ${error}`, 500)
        }

    }

    async updateUser(user: UserInputUpdateValidated, userTypeId: number) {
        try {
            dbUser.query(`UPDATE app_user SET email = $1, id_user_type = $2 WHERE id = $3`, [user.email, userTypeId, user.id])
        } catch (error: any) {
            throw new CustomError(`Repository level Error: UserRepository updateUser: ${error}`, 500)
        }
    }

    async deleteUser(idUser: number) {
        try {
            dbUser.query(`DELETE FROM app_user WHERE id = $1`, [idUser])
        } catch (error: any) {
            throw new CustomError(`Repository level Error: UserRepository deleteUser: ${error}`, 500)
        }
    }
}