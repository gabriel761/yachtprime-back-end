import { DecodedIdToken } from "firebase-admin/auth";
import { CustomError } from "../CustoError.js";
import { admin } from "../firebase/firebase-config.js";
import { Request, Response, NextFunction } from 'express';

export const decodeToken = async (authorization?: string):Promise<DecodedIdToken> => {
    if(!authorization) throw new CustomError("Requisição não autorizada", 401)
    let token = authorization
    token = token?.replace("Bearer ", '')
    token = authorization.split(' ')[1]
    try {
        const decodeValue = await admin.auth().verifyIdToken(token);
        if (!decodeValue) throw new CustomError("Requisição não autorizada", 401)
        return decodeValue
        
    } catch (e: any) {
        throw new CustomError("Erro ao verificar autorização" + e.message, 500)
    }
}