import { ProprietarioRepository } from "../repository/ProprietarioRepository.js";
import { UserRepository } from "../repository/UserRepository.js";
import { Proprietario } from "../types/Proprietario.js";
import {  User, UserInput, UserInputUpdate, UserInputUpdateValidated, UserInputValidated, UserList, UserOutput } from "../types/User.js";
import { UserType } from "../types/UserType.js";
import { ProprietarioInputVO } from "../value_object/input/ProprietarioInputVO.js";
import { UserInputUpdateVO } from "../value_object/input/UserInputUpdateVO.js";
import { UserInputVO } from "../value_object/input/UserInputVO.js";
import { UserTypeVO } from "../value_object/input/UserTypeInputVO.js";
import { FirebaseModel } from "./external/FirebaseModel.js";
import { ProprietarioModel } from "./ProprietarioModel.js";

export class UserModel {
    constructor() {

    }
    async getUsers(userRepository: UserRepository): Promise<UserList[]>{
        const users = await userRepository.getUsers()
        const formatedUsers: UserList[] = users.map((user) => {
            return {
                id: user.id,
                nome: user.nome,
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

    async getUserById(id:number, userRepository: UserRepository): Promise<User>{
       const user = await userRepository.getUserById(id)
       return {
        id: user.id,
        nome: user.nome,
        email: user.email,
        userType: user.user_type
       }
    }

    async getUserDashboardById(id: number, userRepository: UserRepository): Promise<UserOutput> {
        const user = await userRepository.getUserDashboardById(id)
        return {
            id: user.id,
            nome: user.nome,
            email: user.email,
            userType: user.user_type,
            proprietarios: user.proprietarios
        }
    }

    async insertUser(user: UserInputValidated, firebaseId: string, userRepository: UserRepository):Promise<number>{
      const idUser =  await userRepository.insertUser(user, firebaseId, user.userType.id)
      return idUser
    }
    async associateUserWithProprietarios(proprietarios: Proprietario[], idUser: number, proprietarioRepository: ProprietarioRepository){
        const promises = proprietarios.map(async (proprietario) => {
          return  proprietarioRepository.associateProprietarioWithUser(idUser, proprietario.id)
        })
        await Promise.all(promises)
    }
    async updateUser(user: UserInputUpdateValidated, userRepository: UserRepository){
        await userRepository.updateUser(user, user.userType.id)
    }

    async deleteUser(idUser: number, userRepository: UserRepository, firebaseModel: FirebaseModel){
        const idFirebase = await userRepository.getFirebaseIdByIdUser(idUser)
         await firebaseModel.deleteUser(idFirebase)
        await userRepository.deleteUser(idUser)
    }

    async deleteAllAssociationWithProprietario (idUser: number, userRepository: UserRepository){
        await userRepository.deleteAllAssociationWithProprietario(idUser)
    }

    validateUserType(idUserType: number, userTypeString: string, userTypeVO: UserTypeVO){
        userTypeVO.setId(idUserType)
        userTypeVO.setOpcao(userTypeString)
        const validatedUser = userTypeVO.extractData()
        return validatedUser
    }

    validateProprietariosFromUser(proprietarios: Proprietario[], proprietarioVO: ProprietarioInputVO): Proprietario[]{
      const validatedProprietarios =  proprietarios.map((proprietario) => {
            proprietarioVO.setId(proprietario.id)
            proprietarioVO.setNome(proprietario.nome)
            proprietarioVO.setEmail(proprietario.email)
            proprietarioVO.setTelefone(proprietario.telefone)
            return proprietarioVO.extractData()
        })
        return validatedProprietarios
    }

    validateUserInput(userInput: UserInput, userType: UserType, proprietarios: Proprietario[], userInputVo: UserInputVO){
    
        userInputVo.setProprietarios(proprietarios)
        userInputVo.setEmail(userInput.email)
        userInputVo.setNome(userInput.nome)
        userInputVo.setSenha(userInput.senha)
        userInputVo.setUserType(userType)

        return userInputVo.extractData()
    }

    validateUserInputUpdate(userInput: UserInputUpdate, userType: UserType, proprietarios: Proprietario[], userInputVo: UserInputUpdateVO) {
        userInputVo.setProprietarios(proprietarios)
        userInputVo.setId(userInput.id)
        userInputVo.setNome(userInput.nome)
        userInputVo.setEmail(userInput.email)
        userInputVo.setUserType(userType)

        return userInputVo.extractData()
    }
}