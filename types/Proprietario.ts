import { User, UserList, UserOutput } from "./User.js"

export type Proprietario = {
    id?:number,
    nome: string,
    email?: string,
    telefone: string
}

export type ProprietarioWithUsers = {
    id?: number,
    nome: string,
    email?: string,
    telefone: string
    usuarios?: UserList[]
}

