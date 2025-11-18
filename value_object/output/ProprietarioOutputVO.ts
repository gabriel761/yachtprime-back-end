import { Proprietario } from "../../types/Proprietario.js";


export class ProprietarioOutputVO  {
    private id?: number;
    private nome!: string;
    private email!: string;
    private telefone!: string;

    constructor(){

    }

    setId(id?:number){
        this.id = id
    }
    setNome(nome:string){
        this.nome = nome
    }
    setEmail(email: string){
        this.email = email
    }
    setTelefone(telefone: string){
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