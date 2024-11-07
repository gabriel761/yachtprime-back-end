import { CustomError } from "../infra/CustoError.ts"

export const characterLimit = (proprety: string, propretyName:string, limit: number, className: string) =>{
    const firstLeter = proprety.charAt(0).toUpperCase()
    proprety = proprety.replace(proprety.substring(0, 1), firstLeter)
    if (proprety.length >= limit) throw new CustomError(`${propretyName} de ${className} tem limite de ${limit} caracteres`, 403)
}
export const validateString = (string:string, stringName:string, className:string) => {
    const firstLeter = stringName.charAt(0).toUpperCase()
    stringName = stringName.replace(stringName.substring(0, 1), firstLeter)
    if (!string || typeof string != "string") throw new CustomError(`${stringName} de ${className} inválido`, 403)
}

export const validateId = (id:number, className:string)=> {
    if (!id || id < 0 || typeof id != "number") throw new CustomError(`id de ${className} inválido`, 403)
}