import { Propulsao } from "../../types/Propulsao.ts"
import { validateId, validateString } from "../../util/validationUtil.ts"

export class PropulsaoOutputVO {
    private opcao!: string
    private id?: number
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