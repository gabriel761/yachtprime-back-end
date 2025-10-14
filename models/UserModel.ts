import { UserRepository } from "../repository/UserRepository.js";
import { User, UserInput, UserInputUpdate, UserInputUpdateValidated, UserInputValidated } from "../types/User.js";
import { UserType } from "../types/UserType.js";
import { UserInputUpdateVO } from "../value_object/input/UserInputUpdateVO.js";
import { UserInputVO } from "../value_object/input/UserInputVO.js";
import { UserTypeVO } from "../value_object/input/UserTypeInputVO.js";
import { FirebaseModel } from "./external/FirebaseModel.js";

export class UserModel {
    constructor() {

    }
    async getUsers(userRepository: UserRepository){
        const userTypes = await userRepository.getUsers()
        return userTypes
    }
    async getUserTypes(userRepository: UserRepository) {
        const userTypes = await userRepository.getUserTypes()
        return userTypes
    }

    async getUserTypeIdByName(userType: string, userRepository: UserRepository){
        const userTypeId = await userRepository.getUserTypeIdByName(userType)
        return userTypeId
    }

    async getFirebaseIdUser(idUser: number, userRepository: UserRepository){
        const idFirebase = await userRepository.getFirebaseIdByIdUser(idUser)
        return idFirebase
    }

    async insertUser(user: UserInputValidated, firebaseId: string, userRepository: UserRepository){
        await userRepository.insertUser(user, firebaseId, user.userType.id)
    }

    async updateUser(user: UserInputUpdateValidated, userRepository: UserRepository){
        await userRepository.updateUser(user, user.userType.id)
    }

    async deleteUser(idUser: number, userRepository: UserRepository, firebaseModel: FirebaseModel){
        const idFirebase = await userRepository.getFirebaseIdByIdUser(idUser)
        firebaseModel.deleteUser(idFirebase)
        await userRepository.deleteUser(idUser)
    }

    validateUserType(idUserType: number, userTypeString: string, userTypeVO: UserTypeVO){
        userTypeVO.setId(idUserType)
        userTypeVO.setOpcao(userTypeString)
        const validatedUser = userTypeVO.extractData()
        return validatedUser
    }

    validateUserInput(userInput: UserInput, userType: UserType, userInputVo: UserInputVO){
        userInputVo.setEmail(userInput.email)
        userInputVo.setSenha(userInput.senha)
        userInputVo.setUserType(userType)

        return userInputVo.extractData()
    }

    validateUserInputUpdate(userInput: UserInputUpdate, userType: UserType, userInputVo: UserInputUpdateVO) {
        userInputVo.setId(userInput.id)
        userInputVo.setEmail(userInput.email)
        userInputVo.setUserType(userType)

        return userInputVo.extractData()
    }
}