import { NextFunction, Request, Response } from 'express';
import { BarcoCharterService } from "../service/BarcoCharterService.js";
import { BarcoCharterInput } from '../types/charter/BarcoCharter.js';

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

    async postBarcoCharterById(req: Request, res: Response, next: NextFunction) {
        try {
            const barcoCharterInput: BarcoCharterInput = req.body
            await this.barcoCharterService.postBarcoCharter(barcoCharterInput)
            res.sendStatus(200)
        } catch (error) {
            next(error)
        }
    }
}