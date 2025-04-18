import { NextFunction, Request, Response } from 'express';
import BarcoSeminovoService from '../service/BarcoSeminovoService.js';
import { validateIntegerPositiveNumber } from '../util/validationUtil.js';
import { CustomError } from '../infra/CustoError.js';
import { BarcoSeminovoFilters, BarcoSeminovoInput, BarcoSeminovoInputWithId } from '../types/seminovo/BarcoSeminovo.js';
import { FirebaseModel } from '../models/external/FirebaseModel.js';
import { convertStringToBoolean } from '../util/transformationUtil.js';



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
            res.sendStatus(200).end();
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
            res.sendStatus(200).end();
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
            res.sendStatus(200).end();
        } catch (error) {
            next(error)
        }

    }
}