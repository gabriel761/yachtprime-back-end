import { CustomError } from "../../infra/CustoError.js"
import { Cabine } from "../../types/Cabine.js"
import { characterLimit, validateIntegerPositiveNumber, validateYear } from "../../util/validationUtil.js"

export class CabinesInputVO {
    private id?:number
    private passageiros!: number
    private tripulacao!: number
    constructor(
        
    ){

    }
    setPassageiros(passageiros:number){
        validateIntegerPositiveNumber(passageiros, "passageiros", "Cabines")
        this.passageiros = passageiros
    }
    setTripulacao(tripulacao:number){
        validateIntegerPositiveNumber(tripulacao, "tripulação", "Cabines")
        this.tripulacao = tripulacao
    }
    setId(id:number){
        validateIntegerPositiveNumber(id, "id", "Cabines")
        this.id = id
    }
    extractData(): Cabine {
        return {
            id: this.id,
            passageiros: this.passageiros,
            tripulacao: this.tripulacao
        }
    }
}