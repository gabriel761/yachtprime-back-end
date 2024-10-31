import { NextFunction, Request, Response } from 'express';
import BarcoSeminovoService from '../service/BarcoSeminovoService.ts';

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
            res.json(body);
        } catch (error) {
            next(error)
        }

    }
}