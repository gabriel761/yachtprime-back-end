import { ProprietarioWithUsers } from "../../types/Proprietario"

export const proprietario = {
    nome: "Alice Almeida",
    email: "alice.almeida@gmail.com",
    telefone: "+55 21 98391-7378"
}

export const proprietarioWithId = {
    id : 1,
    nome: "Alice Almeida",
    email: "alice.almeida@gmail.com",
    telefone: "+55 21 98391-7378",
}

export const proprietarioWithIdAndUsers: ProprietarioWithUsers = {
    id: 1,
    nome: "Alice Almeida",
    email: "alice.almeida@gmail.com",
    telefone: "+55 21 98391-7378",
    usuarios:[ 
        {
            id: 1,
            email: "jg.7651@gmail.com",
            userType:  "Dono"
        }
    ]
}