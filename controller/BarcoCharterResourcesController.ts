import { NextFunction, Request, Response } from 'express';
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

    async listImagensByIdCharter(req: Request, res: Response, next: NextFunction) {
        try {
            const idCharter: string = req.params.id
            const result = await barcoCharterResourcesService.listImagesByIdCharter(idCharter)
            res.json(result)
        } catch (error) {
            next(error)
        }
    }

    async listCidades(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await barcoCharterResourcesService.listCidades()
            res.json(result)
        } catch (error) {
            next(error)
        }
    }

    async listCondicoesPadrao(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await barcoCharterResourcesService.listCondicoesPadrao()
            res.json(result)
        } catch (error) {
            next(error)
        }
    }

    async postCondicaoPadrao(req: Request, res: Response, next: NextFunction) {
        try {
            const condicao = req.body
            const result = await barcoCharterResourcesService.postCondicaoPadrao(condicao)
            res.json(result)
        } catch (error) {
            next(error)
        }
    }

    async updateAllCondicoesPadrao(req: Request, res: Response, next: NextFunction) {
        try {
            const condicoes = req.body
            const result = await barcoCharterResourcesService.updateAllCondicoesPadrao(condicoes)
            res.json(result)
        } catch (error) {
            next(error)
        }
    }

    async deleteImagesFromFirebase(req: Request, res: Response, next: NextFunction) {
        try {
            await barcoCharterResourcesService.deleteImagesFromFirebase(req.body)
            res.send("deleted successfully!")
        } catch (error) {
            next(error)
        }
    }
    async insertItemCharter(req: Request, res: Response, next: NextFunction) {
        try {
            const itemCharter: any = {
                item: req.body.item,
                itemLazer: req.body.itemLazer
            }
            await barcoCharterResourcesService.insertItemCharter(itemCharter)
            res.sendStatus(200)
        } catch (error) {
            next(error)
        }
    }
}