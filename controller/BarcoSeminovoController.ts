import { NextFunction, Request, Response } from 'express';
import BarcoSeminovoService from '../service/BarcoSeminovoService.ts';
import { validateIntegerPositiveNumber } from '../util/validationUtil.ts';
import { CustomError } from '../infra/CustoError.ts';
import { BarcoSeminovoFilters, BarcoSeminovoInput, BarcoSeminovoInputWithId } from '../types/BarcoSeminovo.ts';
import { FirebaseModel } from '../models/external/FirebaseModel.ts';
import { convertStringToBoolean } from '../util/transformationUtil.ts';



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

    async listBarcoSeminovoDashboard(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.barcoSeminovoService.listBarcoSeminovoDashboard()
            res.json(result)
        } catch (error) {
            next(error)
        }
    }

    async listBarcoSeminovoFrontEnd(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query
            const filters = {
                page: query.page,
                modelo: query.modelo || undefined,
                oportunidade: convertStringToBoolean(query.oportunidade)
            };
            const result = await this.barcoSeminovoService.listBarcoSeminovoFrontEnd(filters)
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
    async getRelatedSeminovos(req: Request, res: Response, next: NextFunction) {
        try {
            const idSeminovo: number = parseInt(req.params.id) 
            const result = await this.barcoSeminovoService.getRelatedSeminovos(idSeminovo)
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

    async updateBarcoSeminovo(req: Request, res: Response, next: NextFunction) {
        const body: BarcoSeminovoInputWithId = req.body
        try {
            if (!body) throw new CustomError("Empty body patch", 400)
            await this.barcoSeminovoService.updateBarcoSeminovo(body)
            res.status(200).end();
        } catch (error: any) {
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