import { CustomError } from "../../infra/CustoError.ts"
import { Combustivel } from "../../types/Combustivel.ts"
import { characterLimit, validateId } from "../../util/validationUtil.ts"

export class CombustivelInputVO {
    private opcao!: string
    private id!: number
    constructor(
        
    ) { }

    setOpcao(opcao:string){
        characterLimit(opcao,"Opção", 50, "combustível")
        this.opcao = opcao
    }
    setId(id: number) {
        validateId(id,"combustível")
        this.id = id
    }
    extractData(): Combustivel {
        return {
            id: this.id,
            opcao: this.opcao
        }
    }
}