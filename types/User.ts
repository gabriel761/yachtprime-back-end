import { Proprietario } from "./Proprietario.js"
import { UserType } from "./UserType.js"


export type UserInput = {
    nome: string,
    email: string,
    senha: string,
    userType: string,
    proprietarios: Proprietario[]
}

export type UserOutput = {
    id: number,
    nome: string,
    email: string,
    userType: string,
    proprietarios: Proprietario[]
}

export type UserInputValidated = {
    nome: string,
    email: string,
    senha: string,
    userType: UserType
    proprietarios: Proprietario[]
}

export type UserInputUpdate = {
    id: number,
    nome: string,
    email: string,
    userType: string
    proprietarios: Proprietario[]
}

export type UserInputUpdateValidated = {
    id: number,
    nome: string,
    email: string,
    userType: UserType
    proprietarios: Proprietario[]
}

export type UserInputUpdatePasswordOnly = {
    id: number,
    senha: string
}

export type User = {
    id: number,
    nome: string,
    email: string,
    userType: string
}

export type UserDb = {
    id: number,
    nome: string,
    email: string,
    user_type: string,
    proprietarios: Proprietario[]
}

export type UserList = {
    id: number,
    nome: string,
    email: string,
    userType: string,
}

export type UserListDb = {
    id: number,
    nome: string,
    email: string,
    user_type: string,
}
