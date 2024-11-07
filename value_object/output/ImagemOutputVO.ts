import { CustomError } from "../../infra/CustoError.ts"
import { Imagem } from "../../types/Imagem.ts"
import { characterLimit, validateId, validateString } from "../../util/validationUtil.ts"

export class ImagemOutputVO {
    private id?: number
    private link!: string
    constructor(

    ) {

    }
    setLink(link: string) {
        this.link = link
    }
    setId(id: number) {
        this.id = id
    }
    extractData(): Imagem {
        return {
            id: this.id,
            link: this.link
        }
    }
}