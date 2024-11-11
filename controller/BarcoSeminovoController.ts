import { NextFunction, Request, Response } from 'express';
import BarcoSeminovoService from '../service/BarcoSeminovoService.ts';
import { validateId } from '../util/validationUtil.ts';

export class BarcoSeminovoController {

    async getBarcoSeminovoById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id)
            const barcoSeminovo = new BarcoSeminovoService()
            const barcoSeminovoResult = await barcoSeminovo.getBarcoSeminovoById(id)
            res.json(barcoSeminovoResult)
        } catch (error) {
            next(error)
        }
    }

    async postBarcoSeminovo(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body
            const barcoSeminovoService = new BarcoSeminovoService()
            await barcoSeminovoService.postBarcoSeminovo(body)
            res.status(200).end();
        } catch (error) {
            next(error)
        }

    }
    async deleteBarcoSeminovo(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body
            validateId(body.id, "Barco Seminovo")
            const barcoSeminovoService = new BarcoSeminovoService()
            await barcoSeminovoService.deleteBarcoSeminovo(body.id)
            res.status(200).end();
        } catch (error) {
            next(error)
        }

    }
}