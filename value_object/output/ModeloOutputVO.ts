import { Modelo } from "../../types/Modelo.ts"
import { characterLimit, validateId, validateString } from "../../util/validationUtil.ts"

export class ModeloOutputVO {
    private modelo!: string
    private marca?: string
    private id?: number
    constructor(

    ) { }

    setModelo(modelo: string) {
        this.modelo = modelo
    }
    setMarca(marca?: string) {
        this.marca = marca
    }
    setId(id?: number) {
        this.id = id
    }
    extractData():Modelo{
        return{
            id: this.id,
            modelo: this.modelo,
            marca: this.marca
        }
    }
}