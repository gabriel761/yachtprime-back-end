import { UserType } from "../../types/UserType.js";
import { validateIntegerPositiveNumber, validateString } from "../../util/validationUtil.js";

export class UserTypeVO {
    private id!: number;
    private opcao!: string
    constructor (){

    }
    setId(id: number){
        validateIntegerPositiveNumber(id, "id", "UserTypeVO")
        this.id = id
    }
    setOpcao(opcao: string) {
        validateString(opcao, "opcao", "UserTypeVO")
        this.opcao = opcao
    }

    extractData(): UserType{
        return{
            id: this.id,
            opcao: this.opcao
        }
    }
}