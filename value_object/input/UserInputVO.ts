import { CustomError } from "../../infra/CustoError.js"
import { UserInput, UserInputValidated } from "../../types/User.js"
import { UserType } from "../../types/UserType.js"
import { validateString } from "../../util/validationUtil.js"

export class UserInputVO {
    private email!: string
    private senha!: string
    private userType!: UserType

    constructor(){

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
    extractData(): UserInputValidated{
        return {
            email: this.email,
            senha: this.senha,
            userType: this.userType
        }
    }
}