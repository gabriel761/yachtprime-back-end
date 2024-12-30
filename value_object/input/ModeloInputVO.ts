import { Modelo } from "../../types/Modelo.js"
import { characterLimit, validateIntegerPositiveNumber, validateString } from "../../util/validationUtil.js"

export class ModeloInputVO{
    private modelo!: string
    private marca?: string
    private id!: number
    constructor(
        
    ){}

    setModelo(modelo:string){
        validateString(modelo, "modelo", "modelo barco")
        characterLimit(modelo, "modelo", 100, "modelo barco")
        this.modelo = modelo
    }
    setMarca(marca?:string){
        if(!!marca){
            validateString(marca, "marca", "modelo barco")
            characterLimit(marca, "marca", 100, "modelo barco")
        }
        this.marca = marca
    }
    setId(id:number){
        validateIntegerPositiveNumber(id,"id", "Modelo barco")
        this.id = id
    }
    extractData(): Modelo {
        return {
            id: this.id,
            modelo: this.modelo,
            marca: this.marca
        }
    }
}