import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../CustoError.js';
import { decodeToken } from './decodeToken.js';
import { error } from 'console';

export const mainMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (process.env.NODE_ENV == "development" && req.headers.authorization == "test") {
        req.firebaseUser = {uid:"ls6ZJeBDqfgftdH16ynMTgar7P93"} as any
        next()
    } else {
        try {
            const decodedToken = await decodeToken(req.headers.authorization)
            req.firebaseUser = decodedToken
            next()    
        } catch (error:any) {
            res.status(error.statusCode).json({message: error.message})
        }
        
    }
    

}