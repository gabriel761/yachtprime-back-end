import { CustomError } from "../CustoError.js";
import { admin } from "../firebase/firebase-config.js";
import { Request, Response, NextFunction } from 'express';

export const decodeToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    
    if (process.env.NODE_ENV == "development" && req.headers.authorization == "test"){
        next()
    }else{
        let token = req.headers.authorization
        token = token?.replace("Bearer ", '')
        if (token && req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1]
            try {
                const decodeValue = await admin.auth().verifyIdToken(token);

                if (decodeValue) {
                    req.user = decodeValue
                    next()
                } else {
                    res.status(401).json({ message: "Requisição não autorizada" });
                }

            } catch (e: any) {
                res.status(500).json({ message: "Erro ao verificar autorização: " + e.message });
            }
        } else {
            res.status(401).json({ message: "Requisição não autorizada" });
        }
        
    }
}