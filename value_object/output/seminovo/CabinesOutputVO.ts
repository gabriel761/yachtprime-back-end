
import { Cabine } from "../../../types/seminovo/Cabine.js"

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