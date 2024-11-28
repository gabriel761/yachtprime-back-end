import { NextFunction, Request, Response } from 'express';
import { ResourcesService } from "../service/ResourcesService.ts"

const resourcesService = new ResourcesService()
export class ResourcesController {
    async listMoeda(req: Request, res: Response, next: NextFunction) {
        try {
            const moedaResult = await resourcesService.listModeda()
            res.json(moedaResult)
        } catch (error) {
            next(error)
        }
    }
}

 