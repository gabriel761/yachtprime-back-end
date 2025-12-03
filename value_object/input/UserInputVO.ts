import { CustomError } from "../../infra/CustoError.js"
import { Proprietario } from "../../types/Proprietario.js"
import { UserInput, UserInputValidated } from "../../types/User.js"
import { UserType } from "../../types/UserType.js"
import { validateString } from "../../util/validationUtil.js"

export class UserInputVO {
    private email!: string
    private nome!: string
    private senha!: string
    private userType!: UserType
    private proprietarios!: Proprietario[]

    constructor(){

    }
    setNome(nome: string) {
        validateString(nome, "nome", "UserInputVO")
        this.nome = nome
    }
    setEmail(email:string){
        validateString(email, "email", "UserInputVO")
        this.email = email
    }
    setSenha(senha: string){
        validateString(senha, "senha", "UserInputVO")
        this.senha = senha
    }
    setUserType(userType: UserType){
            if(!userType) new CustomError("Erro no UserInputVO: UserType está vazio ou nulo", 400)
            this.userType = userType
        }
    setProprietarios(proprietarios: Proprietario[]) {
        if (!proprietarios) new CustomError("Erro no UserInputVO: proprietários está vazio ou nulo", 400)
        this.proprietarios = proprietarios
    }
    extractData(): UserInputValidated{
        return {
            email: this.email,
            nome: this.nome,
            senha: this.senha,
            userType: this.userType,
            proprietarios: this.proprietarios
        }
    }
}