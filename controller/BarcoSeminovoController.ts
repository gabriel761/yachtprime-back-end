import { Request, Response } from 'express';
import BarcoSeminovoService from '../service/BarcoSeminovoService.ts';

export class BarcoSeminovoController{

    async getBarcoSeminovoById(req:Request, res: Response){
        const id = parseInt(req.params.id)
        if (typeof id != "number") {
            res.status(400).json({ error: "bad request" })
        } else {
            const barcoSeminovo = new BarcoSeminovoService()
            const barcoSeminovoResult = await barcoSeminovo.getBarcoSeminovoById(id)
            res.json(barcoSeminovoResult)
        }
    }

    async postBarcoSeminovo(req: Request, res: Response) {
        const body = req.body
        const barcoSeminovoService = new BarcoSeminovoService()
        barcoSeminovoService.postBarcoSeminovo(body)
    }
}