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
        next()
    } else {
        try {
            const decodedToken = await decodeToken(req.headers.authorization)
            req.user = decodedToken
            next()    
        } catch (error:any) {
            res.status(error.statusCode).json({message: error.message})
        }
        
    }
    

}