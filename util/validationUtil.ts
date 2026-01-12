import { CustomError } from "../infra/CustoError.js"
import { UUID_REGEX } from "./variables.js"

export const characterLimit = (proprety: string, propretyName:string, limit: number, className: string) =>{
    const firstLeter = proprety.charAt(0).toUpperCase()
    proprety = proprety.replace(proprety.substring(0, 1), firstLeter)
    if (proprety.length >= limit) throw new CustomError(`${propretyName} de ${className} tem limite de ${limit} caracteres`, 400)
}
export const validateString = (string:string, stringName:string, className:string) => {
    const firstLeter = stringName.charAt(0).toUpperCase()
    stringName = stringName.replace(stringName.substring(0, 1), firstLeter)
    if (!string || typeof string != "string") throw new CustomError(`${stringName} de ${className} inválido`, 400)
}

export const validateIntegerPositiveNumber = (id:number, numberName: string, className:string)=> {
    if (!(id >= 0 && Number.isInteger(id))) throw new CustomError(`${numberName} de ${className} inválido`, 400)
}
export const validateFloatPositiveNumber = (number: number, numberName: string, className: string) => {
    if (!(number >= 0 )) throw new CustomError(`${numberName} de ${className} inválido`, 400)
}

export const validateYear = (ano: number, className:string)=> {
    const date = new Date()
    if (!ano || typeof ano != "number" || ano < 1950 || ano > date.getFullYear()) throw new CustomError(`Ano ${className} é inválido`, 400)
}

export const validateUUID = (id: string, numberName: string, className: string) => {
    if (!(id && id.match(UUID_REGEX))) throw new CustomError(`${numberName} de ${className} inválido`, 400)
}