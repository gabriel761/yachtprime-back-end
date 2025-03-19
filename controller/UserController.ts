import { NextFunction, Request, Response } from 'express';

export class UserController {
    async listMoeda(req: Request, res: Response, next: NextFunction) {
        try {
            res.sendStatus(200)
        } catch (error) {
            next(error)
        }
    }
}