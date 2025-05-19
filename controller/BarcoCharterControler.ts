import { NextFunction, Request, Response } from 'express';
import { BarcoCharterService } from "../service/BarcoCharterService.js";
import { BarcoCharterInput, BarcoCharterInputWithId } from '../types/charter/BarcoCharter.js';

export class BarcoCharterController {
    constructor(
        private barcoCharterService: BarcoCharterService
    ) {

    }

    async getBarcoCharterById(req: Request, res: Response, next: NextFunction){
        try {
            const id = parseInt(req.params.id)
            const barcoCharterResult = await this.barcoCharterService.getBarcoCharterById(id)
            res.json(barcoCharterResult)
        } catch (error) {
            next(error)
        }
    }

    async postBarcoCharter(req: Request, res: Response, next: NextFunction) {
        try {
            const barcoCharterInput: BarcoCharterInput = req.body
            await this.barcoCharterService.postBarcoCharter(barcoCharterInput)
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
}