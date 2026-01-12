import { NextFunction, Request, Response } from 'express';
import { BarcoCharterService } from "../service/BarcoCharterService.js";
import { BarcoCharterFilters, BarcoCharterInput, BarcoCharterInputWithId } from '../types/charter/BarcoCharter.js';
import { CustomError } from '../infra/CustoError.js';
import { validateIntegerPositiveNumber } from '../util/validationUtil.js';
import { FirebaseModel } from '../models/external/FirebaseModel.js';
import { convertStringToBoolean } from '../util/transformationUtil.js';

export class BarcoCharterController {
    constructor(
        private barcoCharterService: BarcoCharterService
    ) {

    }
    async getBarcoCharterById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const barcoCharterResult = await this.barcoCharterService.getBarcoCharterById(id)
            res.json(barcoCharterResult);
        } catch (error) {
            next(error)
        }
    }

    async getBarcoCharterDashboardById(req: Request, res: Response, next: NextFunction){
        try {
            const id = req.params.id
            const barcoCharterResult = await this.barcoCharterService.getBarcoCharterDashboardById(id)
            res.json(barcoCharterResult);
        } catch (error) {
            next(error)
        }
    }

    async getRelatedCharters(req: Request, res: Response, next: NextFunction){
        try {
            const id = req.params.id
            const relatedCharters = await this.barcoCharterService.getRelatedCharters(id)
            res.json(relatedCharters)
        } catch (error) {
            next(error)
        }
    }

    async listBarcoCharterDashboard(req: Request, res: Response, next: NextFunction) {
        try {
            const barcoCharterResult = await this.barcoCharterService.listBarcoCharterDashboard()
            res.json(barcoCharterResult)
        } catch (error) {
            next(error)
        }
    }

    async listBarcoCharterFrontEnd(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query
             const filters = {
                            page: query.page,
                            cidade: query.cidade,
                            tipoPasseio:query.tipoPasseio,
                            capacidade: query.capacidade
                        };
            const barcoCharterResult = await this.barcoCharterService.listBarcoCharterFrontEnd(filters)
            res.json(barcoCharterResult)
        } catch (error) {
            next(error)
        }
    }

    async postBarcoCharter(req: Request, res: Response, next: NextFunction) {
        try {
            const firebaseId = req.firebaseUser?.uid
            if (!firebaseId) throw new CustomError("Firebase id indefinido", 403)
            const barcoCharterInput: BarcoCharterInput = req.body
            await this.barcoCharterService.postBarcoCharter(barcoCharterInput, firebaseId)
            res.sendStatus(200)
        } catch (error) {
            next(error)
        }
    }

    async updateBarcoCharterById(req: Request, res: Response, next: NextFunction) {
        try {
            const barcoCharterInput: BarcoCharterInputWithId = req.body
            await this.barcoCharterService.updateBarcoCharter(barcoCharterInput)
            res.sendStatus(200)
        } catch (error) {
            next(error)
        }
    }

     async deleteBarcoCharter(req: Request, res: Response, next: NextFunction) {
            try {
                const body = req.body
                if (!body) throw new CustomError("Empty body delete", 400)
                validateIntegerPositiveNumber(body.id, "id", "Barco Seminovo")
                await this.barcoCharterService.deleteBarcoCharter(body.id, new FirebaseModel())
                res.sendStatus(200).end();
            } catch (error) {
                next(error)
            }
    
        }

}