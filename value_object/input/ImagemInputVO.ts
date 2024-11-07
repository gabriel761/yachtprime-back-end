import { CustomError } from "../../infra/CustoError.ts"
import { Imagem } from "../../types/Imagem.ts"
import { characterLimit, validateId, validateString } from "../../util/validationUtil.ts"

export class ImagemInputVO {
    private id?: number
    private link!: string
    constructor(
        
    ) {

    }
    setLink(link:string){
        validateString(link, "link", "imagem")
        characterLimit(link,"link", 500, "imagem")
        this.link = link
    }
    setId(id:number){
        validateId(id, "imagem")
        this.id = id
    }

    extractData():Imagem{
        return{
            id:this.id,
            link: this.link
        }
    }
}