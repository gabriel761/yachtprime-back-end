import { UserType } from "./UserType.js"


export type UserInput = {
    email: string,
    senha: string,
    userType: string
}

export type UserInputValidated = {
    email: string,
    senha: string,
    userType: UserType
}

export type UserInputUpdate = {
    id: number,
    email: string,
    userType: string
}

export type UserInputUpdateValidated = {
    id: number,
    email: string,
    userType: UserType
}

export type UserInputUpdatePasswordOnly = {
    id: number,
    senha: string
}


export type User = {
    id: number,
    email: string,
    userFirebasId: string,
    userType: UserType
}