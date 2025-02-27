import { NextFunction, Request, Response } from 'express';
import { BarcoCharterService } from "../service/BarcoCharterService.js";

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
}