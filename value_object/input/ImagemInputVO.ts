import { CustomError } from "../../infra/CustoError.js"
import { Imagem } from "../../types/Imagem.js"
import { characterLimit, validateIntegerPositiveNumber, validateString } from "../../util/validationUtil.js"

export class ImagemInputVO {
    private id?: number
    private link!: string
    private fileName!: string
    constructor(

    ) {

    }
    setLink(link: string) {
        validateString(link, "link", "imagem")
        characterLimit(link, "link", 500, "imagem")
        this.link = link
    }

    setFileName(fileName: string) {
        validateString(fileName, "fileName", "imagem")
        characterLimit(fileName, "fileName", 100, "imagem")
        this.fileName = fileName
    }

    setId(id: number) {
        validateIntegerPositiveNumber(id, "id", "Imagem")
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