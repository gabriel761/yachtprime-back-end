import { NextFunction, Request, Response } from 'express';
import BarcoSeminovoService from '../service/BarcoSeminovoService.ts';
import { validateId } from '../util/validationUtil.ts';
import { CustomError } from '../infra/CustoError.ts';

const barcoSeminovoService = new BarcoSeminovoService()

export class BarcoSeminovoController {

    async getBarcoSeminovoById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id)
            const barcoSeminovoResult = await barcoSeminovoService.getBarcoSeminovoById(id)
            res.json(barcoSeminovoResult)
        } catch (error) {
            next(error)
        }
    }

    async postBarcoSeminovo(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body
            if(!body) throw new CustomError("Empty body post", 400)
            await barcoSeminovoService.postBarcoSeminovo(body)
            res.status(200).end();
        } catch (error) {
            next(error)
        }

    }
    async deleteBarcoSeminovo(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body
            if (!body) throw new CustomError("Empty body delete", 400)
            validateId(body.id, "Barco Seminovo")
            await barcoSeminovoService.deleteBarcoSeminovo(body.id)
            res.status(200).end();
        } catch (error) {
            next(error)
        }

    }
}