import { NextFunction, Request, Response } from 'express';
import BarcoSeminovoService from '../service/BarcoSeminovoService.ts';
import { validateIntegerPositiveNumber } from '../util/validationUtil.ts';
import { CustomError } from '../infra/CustoError.ts';
import { BarcoSeminovoInput } from '../types/BarcoSeminovo.ts';
import { FirebaseModel } from '../models/external/FirebaseModel.ts';



export class BarcoSeminovoController {
    constructor(
        private barcoSeminovoService: BarcoSeminovoService
    ) {

    }

    async getBarcoSeminovoById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id)
            const barcoSeminovoResult = await this.barcoSeminovoService.getBarcoSeminovoById(id)
            res.json(barcoSeminovoResult)
        } catch (error) {
            next(error)
        }
    }

    async listBarcoSeminovo(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.barcoSeminovoService.listBarcoSeminovo()
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
    

    async postBarcoSeminovo(req: Request, res: Response, next: NextFunction) {
        const body: BarcoSeminovoInput = req.body
        try {
            if (!body) throw new CustomError("Empty body post", 400)
            await this.barcoSeminovoService.postBarcoSeminovo(body)
            res.status(200).end();
        } catch (error: any) {
            try {
                await this.barcoSeminovoService.rollbackPost(body)
            } catch (error) {
               console.log("Firebase test error: ", error)
            }
            next(error)
        }

    }
    async deleteBarcoSeminovo(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body
            if (!body) throw new CustomError("Empty body delete", 400)
            validateIntegerPositiveNumber(body.id, "id", "Barco Seminovo")
            await this.barcoSeminovoService.deleteBarcoSeminovo(body.id, new FirebaseModel())
             res.status(200).end();
        } catch (error) {
            next(error)
        }

    }
}