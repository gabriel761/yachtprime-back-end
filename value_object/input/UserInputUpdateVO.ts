import { CustomError } from "../../infra/CustoError.js"
import {  UserInputUpdate, UserInputUpdateValidated } from "../../types/User.js"
import { UserType } from "../../types/UserType.js"
import { validateIntegerPositiveNumber, validateString } from "../../util/validationUtil.js"

export class UserInputUpdateVO {
    private id!: number
    private email!: string
    private userType!: UserType

    constructor(){

    }
    setId(id: number) {
        validateIntegerPositiveNumber(id, "id", "UserInputUpdateVO")
        this.id = id
    }
    setEmail(email:string){
        validateString(email, "email", "UserInputVO")
        this.email = email
    }
    setUserType(userType: UserType){
        if(!userType) new CustomError("Erro no UserInputUpdateVO: UserType está vazio ou nulo", 400)
        this.userType = userType
    }
    extractData(): UserInputUpdateValidated{
        return {
            id: this.id,
            email: this.email,
            userType: this.userType
        }
    }
}