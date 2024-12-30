import { CustomError } from "../../infra/CustoError.js"
import { Imagem } from "../../types/Imagem.js"
import { characterLimit, validateIntegerPositiveNumber, validateString } from "../../util/validationUtil.js"

export class ImagemOutputVO {
    private id?: number
    private link!: string
    private fileName!: string
    constructor(

    ) {

    }
    setLink(link: string) {
        this.link = link
    }
    setFileName(fileName: string){
        this.fileName = fileName
    }
    setId(id: number) {
        this.id = id
    }
    extractData(): Imagem {
        return {
            id: this.id,
            link: this.link,
            fileName: this.fileName
        }
    }
}