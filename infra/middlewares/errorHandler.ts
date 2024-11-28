import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../CustoError.ts';

function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof CustomError) {
        console.error(err)
        res.status(err.statusCode).json({ message: err.message });
    } else {
        console.error("Erro inesperado:", err);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
}

export default errorHandler;
