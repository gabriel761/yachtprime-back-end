import { CustomError } from "../../infra/CustoError.ts"
import { Cabine } from "../../types/Cabine.ts"
import { characterLimit, validateIntegerPositiveNumber } from "../../util/validationUtil.ts"

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