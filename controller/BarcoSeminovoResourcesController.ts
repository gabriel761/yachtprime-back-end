import { NextFunction, Request, Response } from 'express';
import { BarcoSeminovoResourcesService } from '../service/BarcoSeminovoResourcesService.js';

const barcoSeminovoResourcesService = new BarcoSeminovoResourcesService()

export class BarcoSeminovoResourcesController {

    async listCombustivel(req: Request, res: Response, next: NextFunction) {
        try {
            const combustivelResult = await barcoSeminovoResourcesService.listCombustivel()
            res.json(combustivelResult)
        } catch (error) {
            next(error)
        }
    }

    async listPropulsao(req: Request, res: Response, next: NextFunction) {
        try {
            const propulsaoResult = await barcoSeminovoResourcesService.listPropulsao()
            res.json(propulsaoResult)
        } catch (error) {
            next(error)
        }
    }

    async listModelo(req: Request, res: Response, next: NextFunction) {
        try {
            const modeloResult = await barcoSeminovoResourcesService.listModelo()
            res.json(modeloResult)
        } catch (error) {
            next(error)
        }
    }

    async listModeloMotor(req: Request, res: Response, next: NextFunction) {
        try {
            const modeloMotorResult = await barcoSeminovoResourcesService.listModeloMotor()
            res.json(modeloMotorResult)
        } catch (error) {
            next(error)
        }
    }

    async listItemSeminovo(req: Request, res: Response, next: NextFunction) {
        try {
            const itemSeminovoResult = await barcoSeminovoResourcesService.listItemSeminovo()
            res.json(itemSeminovoResult)
        } catch (error) {
            next(error)
        }
    }

    async listImagensByIdSeminovo(req: Request, res: Response, next: NextFunction) {
        try {
            const idSeminovo = parseInt(req.params.id) 
            const itemSeminovoResult = await barcoSeminovoResourcesService.listImagensByIdSeminovo(idSeminovo)
            res.json(itemSeminovoResult)
        } catch (error) {
            next(error)
        }
    }

    async deleteImagesFromFirebase(req: Request, res: Response, next: NextFunction) {
        try {
         await barcoSeminovoResourcesService.deleteImagesFromFirebase(req.body)
            res.send("deleted successfully!")
        } catch (error) {
            next(error)
        }
    }

    async insertItemSeminovo(req: Request, res: Response, next: NextFunction){
        try {
         await barcoSeminovoResourcesService.insertItemCharter(req.body)   
         res.sendStatus(200)
        } catch (error) {
            next(error)
        }
    }

    
}