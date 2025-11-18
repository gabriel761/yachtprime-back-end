import { Proprietario } from "../../types/Proprietario.js";
import { validateIntegerPositiveNumber, validateString } from "../../util/validationUtil.js";

export class ProprietarioInputVO  {
    private id?: number;
    private nome!: string;
    private email!: string;
    private telefone!: string;

    constructor(){

    }

    setId(id?:number){
        if (id) validateIntegerPositiveNumber(id, "id", "ProprietarioOutputVO")
        this.id = id
    }
    setNome(nome:string){
        validateString(nome, "nome", "ProprietarioOutputVO")
        this.nome = nome
    }
    setEmail(email: string){
        validateString(email, "email", "ProprietarioOutputVO")
        this.email = email
    }
    setTelefone(telefone: string){
        validateString(telefone, "telefone", "ProprietarioOutputVO")
        this.telefone = telefone
    }

    extractData(): Proprietario {
        return {
            nome: this.nome,
            email: this.email,
            telefone: this.telefone
        }
    }
    extractDataWithId():Proprietario{
        return {
            id: this.id,
            nome: this.nome,
            email: this.email,
            telefone: this.telefone
        }
    }

}