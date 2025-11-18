import { UserRepository } from "../repository/UserRepository.js";
import { User, UserInput, UserInputUpdate, UserInputUpdateValidated, UserInputValidated, UserOutput } from "../types/User.js";
import { UserType } from "../types/UserType.js";
import { UserInputUpdateVO } from "../value_object/input/UserInputUpdateVO.js";
import { UserInputVO } from "../value_object/input/UserInputVO.js";
import { UserTypeVO } from "../value_object/input/UserTypeInputVO.js";
import { FirebaseModel } from "./external/FirebaseModel.js";

export class UserModel {
    constructor() {

    }
    async getUsers(userRepository: UserRepository): Promise<UserOutput[]>{
        const users = await userRepository.getUsers()
        const formatedUsers: UserOutput[] = users.map((user) => {
            return {
                id: user.id,
                email: user.email,
                userType: user.user_type
            }
        })
        return formatedUsers
    }

    async getUserTypeByIdFirebase(idFirebase: string, userRepository: UserRepository){
        const userType = await userRepository.getUserTypeByIdFirebase(idFirebase)
        return userType
    }

    async getUserIdByIdFirebase(idFirebase: string, userRepository: UserRepository) {
        const userType = await userRepository.getUserIdByIdFirebase(idFirebase)
        return userType
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

    async getUserById(id:number, userRepository: UserRepository): Promise<UserOutput>{
       const user = await userRepository.getUserById(id)
       return {
        id: user.id,
        email: user.email,
        userType: user.user_type
       }
    }

    async insertUser(user: UserInputValidated, firebaseId: string, userRepository: UserRepository){
        await userRepository.insertUser(user, firebaseId, user.userType.id)
    }

    async updateUser(user: UserInputUpdateValidated, userRepository: UserRepository){
        await userRepository.updateUser(user, user.userType.id)
    }

    async deleteUser(idUser: number, userRepository: UserRepository, firebaseModel: FirebaseModel){
        const idFirebase = await userRepository.getFirebaseIdByIdUser(idUser)
         await firebaseModel.deleteUser(idFirebase)
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
        console.log(userInput)
        userInputVo.setId(userInput.id)
        userInputVo.setEmail(userInput.email)
        userInputVo.setUserType(userType)

        return userInputVo.extractData()
    }
}