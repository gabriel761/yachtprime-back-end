import express, { NextFunction, Request, Response } from 'express';
import { BarcoCharterController } from '../controller/BarcoCharterControler.js';
import { BarcoCharterService } from '../service/BarcoCharterService.js';
import { BarcoCharterResourcesService } from '../service/BarcoCharterResourcesService.js';
import { BarcoCharterResourcesController } from '../controller/BarcoCharterResourcesController.js';

const router = express.Router();
const barcoCharterResourcesController = new BarcoCharterResourcesController()

router.get("/pet-friendly", async (req:Request, res: Response, next) => {
   await barcoCharterResourcesController.listPetFriendly(req, res, next)
})

router.get("/tipo-passeio", async (req: Request, res: Response, next) => {
    await barcoCharterResourcesController.listTipoPasseio(req, res, next)
})

router.get("/tripulacao-skipper", async (req: Request, res: Response, next) => {
    await barcoCharterResourcesController.listTripulacaoSkipper(req, res, next)
})

router.get("/itens-charter", async (req: Request, res: Response, next) => {
    await barcoCharterResourcesController.listItensCharter(req, res, next)
})

export default router