import express, { NextFunction, Request, Response } from 'express';
import { BarcoCharterController } from '../controller/BarcoCharterControler.js';
import { BarcoCharterService } from '../service/BarcoCharterService.js';
import { BarcoCharterResourcesService } from '../service/BarcoCharterResourcesService.js';
import { BarcoCharterResourcesController } from '../controller/BarcoCharterResourcesController.js';
import { decodeToken } from '../infra/middlewares/decodeToken.js';

const router = express.Router();
const barcoCharterResourcesController = new BarcoCharterResourcesController()

router.get("/pet-friendly", decodeToken, async (req:Request, res: Response, next) => {
   await barcoCharterResourcesController.listPetFriendly(req, res, next)
})

router.get("/tipo-passeio", decodeToken, async (req: Request, res: Response, next) => {
    await barcoCharterResourcesController.listTipoPasseio(req, res, next)
})

router.get("/tripulacao-skipper", decodeToken, async (req: Request, res: Response, next) => {
    await barcoCharterResourcesController.listTripulacaoSkipper(req, res, next)
})

router.get("/itens-charter", decodeToken, async (req: Request, res: Response, next) => {
    await barcoCharterResourcesController.listItensCharter(req, res, next)
})

router.get("/imagens-charter/:id", decodeToken, async (req: Request, res: Response, next) => {
    await barcoCharterResourcesController.listImagensByIdCharter(req, res, next)
})

router.get("/cidades", decodeToken, async (req: Request, res: Response, next) => {
    await barcoCharterResourcesController.listCidades(req, res, next)
})

router.get("/condicoes", decodeToken, async (req: Request, res: Response, next) => {
    await barcoCharterResourcesController.listCondicoes(req, res, next)
})

router.post("/item-charter", decodeToken, async (req: Request, res: Response, next) => {
    await barcoCharterResourcesController.insertItemCharter(req, res, next)
})


export default router