import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../CustoError.js';

function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof CustomError) {
        console.error(err)
        res.sendStatus(err.statusCode).json({ message: err.message });
    } else {
        console.error("Erro inesperado:", err);
        res.sendStatus(500).json({ message: "Erro interno do servidor" });
    }
}

export default errorHandler;
