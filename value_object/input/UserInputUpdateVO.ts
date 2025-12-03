import { CustomError } from "../../infra/CustoError.js"
import { Proprietario } from "../../types/Proprietario.js"
import {  UserInputUpdate, UserInputUpdateValidated } from "../../types/User.js"
import { UserType } from "../../types/UserType.js"
import { validateIntegerPositiveNumber, validateString } from "../../util/validationUtil.js"

export class UserInputUpdateVO {
    private id!: number
    private nome!: string
    private email!: string
    private userType!: UserType
    private proprietarios!: Proprietario[]

    constructor(){

    }
    setId(id: number) {
        validateIntegerPositiveNumber(id, "id", "UserInputUpdateVO")
        this.id = id
    }
    setNome(nome: string) {
        validateString(nome, "nome", "UserInputVO")
        this.nome = nome
    }
    setEmail(email:string){
        validateString(email, "email", "UserInputVO")
        this.email = email
    }
    setUserType(userType: UserType){
        if(!userType) new CustomError("Erro no UserInputUpdateVO: UserType está vazio ou nulo", 400)
        this.userType = userType
    }
    setProprietarios(proprietarios?: Proprietario[]){
           if (!proprietarios) throw new CustomError("Proprietários de usuário é inválido", 400);
           this.proprietarios = proprietarios
       }
    extractData(): UserInputUpdateValidated{
        return {
            id: this.id,
            nome: this.nome,
            email: this.email,
            userType: this.userType,
            proprietarios: this.proprietarios
        }
    }
}