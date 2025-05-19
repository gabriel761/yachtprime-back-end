import { NextFunction, Request, Response } from 'express';
import { BarcoSeminovoResourcesService } from '../service/BarcoSeminovoResourcesService.js';
import { BarcoCharterService } from '../service/BarcoCharterService.js';
import { BarcoCharterResourcesService } from '../service/BarcoCharterResourcesService.js';

const barcoCharterResourcesService = new BarcoCharterResourcesService()

export class BarcoCharterResourcesController {

    async listPetFriendly(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await barcoCharterResourcesService.listPetFriendly()
            res.json(result)
        } catch (error) {
            next(error)
        }
    }

    async listTipoPasseio(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await barcoCharterResourcesService.listTipoPasseio()
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
    async listTripulacaoSkipper(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await barcoCharterResourcesService.listTripulacaoSkipper()
            res.json(result)
        } catch (error) {
            next(error)
        }
    }

    async listItensCharter(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await barcoCharterResourcesService.listItensCharter()
            res.json(result)
        } catch (error) {
            next(error)
        }
    }

}