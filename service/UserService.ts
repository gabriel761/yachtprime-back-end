import { FirebaseModel } from "../models/external/FirebaseModel.js";
import { UserModel } from "../models/UserModel.js";
import { UserRepository } from "../repository/UserRepository.js";
import { User, UserInput, UserInputUpdate, UserInputUpdatePasswordOnly } from "../types/User.js";
import { UserInputUpdateVO } from "../value_object/input/UserInputUpdateVO.js";
import { UserInputVO } from "../value_object/input/UserInputVO.js";
import { UserTypeVO } from "../value_object/input/UserTypeInputVO.js";

const userModel = new UserModel()
export class UserService {

    async getUserTypes() {
        const userTypes = await userModel.getUserTypes(new UserRepository)
        return userTypes
    }

    async getUsers() {
        const userTypes = await userModel.getUsers(new UserRepository)
        return userTypes
    }

    async deleteUser(idUser: number, firebaseModel: FirebaseModel){
        await userModel.deleteUser(idUser, new UserRepository, firebaseModel)
    }

    async updateUser(user: UserInputUpdate, firebaseModel: FirebaseModel) {
        const userTypeId = await userModel.getUserTypeIdByName(user.userType, new UserRepository())
        const validatedUserType = userModel.validateUserType(userTypeId, user.userType, new UserTypeVO())
        const validatedUser = userModel.validateUserInputUpdate(user, validatedUserType ,new UserInputUpdateVO())
        const firebaseId = await userModel.getFirebaseIdUser(validatedUser.id, new UserRepository())
        await firebaseModel.updateUser(firebaseId,validatedUser.email)
        userModel.updateUser(validatedUser, new UserRepository())
    }

    async updateUserPassword(user: UserInputUpdatePasswordOnly, firebaseModel: FirebaseModel) {
        const firebaseId = await userModel.getFirebaseIdUser(user.id, new UserRepository())
        await firebaseModel.updateUserPassword(firebaseId, user.senha)
    }

    async insertUser(user: UserInput, firebaseModel: FirebaseModel){
         const userTypeId = await userModel.getUserTypeIdByName(user.userType, new UserRepository()) 
        const validatedUserType = userModel.validateUserType(userTypeId, user.userType, new UserTypeVO())
         const validatedUser = userModel.validateUserInput(user, validatedUserType, new UserInputVO())
         const firebaseId = await firebaseModel.createUser(validatedUser.email, validatedUser.senha)
         await userModel.insertUser(validatedUser, firebaseId, new UserRepository())
    }
} 