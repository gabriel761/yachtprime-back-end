import { CustomError } from "../../infra/CustoError.ts"
import { Cabine } from "../../types/Cabine.ts"
import { characterLimit, validateId } from "../../util/validationUtil.ts"

export class CabinesInputVO {
    private id?:number
    private passageiros!: number
    private tripulacao!: number
    constructor(
        
    ){

    }
    setPassageiros(passageiros:number){
        if (!passageiros || passageiros < 0 || typeof passageiros != "number" ) throw new CustomError("Número de cabines de passageiros inválido", 403)
        this.passageiros = passageiros
    }
    setTripulacao(tripulacao:number){
        if (!tripulacao || tripulacao < 0 || typeof tripulacao != "number") throw new CustomError("Número de cabines de tripulacao de cabines inválido", 403)
        this.tripulacao = tripulacao
    }
    setId(id:number){
        validateId(id, "cabines")
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