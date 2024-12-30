import { Propulsao } from "../../types/Propulsao.js"
import { validateIntegerPositiveNumber, validateString } from "../../util/validationUtil.js"

export class PropulsaoOutputVO {
    private opcao!: string
    private id!: number
    constructor(

    ) { }
    setOpcao(opcao: string) {
        this.opcao = opcao
    }
    setId(id: number) {
        this.id = id
    }
    extractData():Propulsao{
        return{
            id:this.id,
            opcao:this.opcao
        }
    }
}