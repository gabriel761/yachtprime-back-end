import { CustomError } from "../../infra/CustoError.js";
import { Proprietario, ProprietarioWithUsers } from "../../types/Proprietario.js";
import { User, UserList } from "../../types/User.js";
import { validateIntegerPositiveNumber, validateString } from "../../util/validationUtil.js";

export class ProprietarioInputVO  {
    private id?: number;
    private nome!: string;
    private email!: string;
    private telefone!: string;
    private usuarios?: UserList[]
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

    setUsuarios(usuarios?: UserList[]){
        if (!usuarios) throw new CustomError("Usuários de proprietário é inválido", 400);
        this.usuarios = usuarios
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

    extractDataWithIdAndUsers(): ProprietarioWithUsers {
        return {
            id: this.id,
            nome: this.nome,
            email: this.email,
            telefone: this.telefone,
            usuarios: this.usuarios
        }
    }

}