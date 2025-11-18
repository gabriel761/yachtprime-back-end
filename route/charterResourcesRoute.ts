import express, { NextFunction, Request, Response } from 'express';
import { BarcoCharterController } from '../controller/BarcoCharterControler.js';
import { BarcoCharterService } from '../service/BarcoCharterService.js';
import { BarcoCharterResourcesService } from '../service/BarcoCharterResourcesService.js';
import { BarcoCharterResourcesController } from '../controller/BarcoCharterResourcesController.js';
import { decodeToken } from '../infra/middlewares/decodeToken.js';
import { mainMiddleware } from '../infra/middlewares/mainMiddleware.js';

const router = express.Router();
const barcoCharterResourcesController = new BarcoCharterResourcesController()

router.get("/pet-friendly", mainMiddleware, async (req:Request, res: Response, next) => {
   await barcoCharterResourcesController.listPetFriendly(req, res, next)
})

router.get("/tipo-passeio", mainMiddleware, async (req: Request, res: Response, next) => {
    await barcoCharterResourcesController.listTipoPasseio(req, res, next)
})

router.get("/tripulacao-skipper", mainMiddleware, async (req: Request, res: Response, next) => {
    await barcoCharterResourcesController.listTripulacaoSkipper(req, res, next)
})

router.get("/itens-charter", mainMiddleware, async (req: Request, res: Response, next) => {
    await barcoCharterResourcesController.listItensCharter(req, res, next)
})

router.get("/imagens-charter/:id", mainMiddleware, async (req: Request, res: Response, next) => {
    await barcoCharterResourcesController.listImagensByIdCharter(req, res, next)
})

router.get("/cidades", mainMiddleware, async (req: Request, res: Response, next) => {
    await barcoCharterResourcesController.listCidades(req, res, next)
})

router.get("/condicoes", mainMiddleware, async (req: Request, res: Response, next) => {
    await barcoCharterResourcesController.listCondicoes(req, res, next)
})

router.post("/item-charter", mainMiddleware, async (req: Request, res: Response, next) => {
    await barcoCharterResourcesController.insertItemCharter(req, res, next)
})


export default router