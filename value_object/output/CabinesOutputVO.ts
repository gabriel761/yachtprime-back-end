import { CustomError } from "../../infra/CustoError.js"
import { Cabine } from "../../types/Cabine.js"
import { characterLimit, validateIntegerPositiveNumber } from "../../util/validationUtil.js"

export class CabinesOutputVO {
    private id?: number
    private passageiros!: number
    private tripulacao!: number
    constructor(

    ) {

    }
    setPassageiros(passageiros: number) {
        this.passageiros = passageiros
    }
    setTripulacao(tripulacao: number) {
        this.tripulacao = tripulacao
    }
    setId(id: number) {
        this.id = id
    }
    extractData():Cabine{
        return {
            id:this.id,
            passageiros: this.passageiros,
            tripulacao: this.tripulacao
        }
    }
}