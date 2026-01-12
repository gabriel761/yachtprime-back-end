import express, { NextFunction, Request, Response } from 'express';
import { BarcoCharterController } from '../controller/BarcoCharterControler.js';
import { BarcoCharterService } from '../service/BarcoCharterService.js';
import { BarcoCharterResourcesService } from '../service/BarcoCharterResourcesService.js';
import { BarcoCharterResourcesController } from '../controller/BarcoCharterResourcesController.js';
import { decodeToken } from '../infra/middlewares/decodeToken.js';
import { mainMiddleware } from '../infra/middlewares/mainMiddleware.js';
import { verifyUserRole } from '../infra/middlewares/VerifyUserType.js';

const router = express.Router();
const barcoCharterResourcesController = new BarcoCharterResourcesController()

router.get("/pet-friendly", mainMiddleware, verifyUserRole(["Dono",  "Administrador", "Editor"]),async (req:Request, res: Response, next) => {
   await barcoCharterResourcesController.listPetFriendly(req, res, next)
})

router.get("/tipo-passeio", mainMiddleware, verifyUserRole(["Dono",  "Administrador", "Editor"]), async (req: Request, res: Response, next) => {
    await barcoCharterResourcesController.listTipoPasseio(req, res, next)
})

router.get("/tripulacao-skipper", mainMiddleware, verifyUserRole(["Dono",  "Administrador", "Editor"]), async (req: Request, res: Response, next) => {
    await barcoCharterResourcesController.listTripulacaoSkipper(req, res, next)
})

router.get("/itens-charter", mainMiddleware, verifyUserRole(["Dono",  "Administrador", "Editor"]), async (req: Request, res: Response, next) => {
    await barcoCharterResourcesController.listItensCharter(req, res, next)
})

router.get("/imagens-charter/:id", mainMiddleware, verifyUserRole(["Dono",  "Administrador", "Editor"]), async (req: Request, res: Response, next) => {
    await barcoCharterResourcesController.listImagensByIdCharter(req, res, next)
})

router.get("/cidades", mainMiddleware, verifyUserRole(["Dono",  "Administrador", "Editor"]), async (req: Request, res: Response, next) => {
    await barcoCharterResourcesController.listCidades(req, res, next)
})

router.get("/condicoes-padrao", mainMiddleware, verifyUserRole(["Dono",  "Administrador", "Editor"]), async (req: Request, res: Response, next) => {
    await barcoCharterResourcesController.listCondicoesPadrao(req, res, next)
})

router.post("/condicao-padrao", mainMiddleware, verifyUserRole(["Dono", "Administrador"]), async (req: Request, res: Response, next) => {
    await barcoCharterResourcesController.postCondicaoPadrao(req, res, next)
})

router.patch("/condicoes-padrao", mainMiddleware, verifyUserRole(["Dono", "Administrador"]), async (req: Request, res: Response, next) => {
    await barcoCharterResourcesController.updateAllCondicoesPadrao(req, res, next)
})

router.post("/item-charter", mainMiddleware, verifyUserRole(["Dono", "Administrador"]), async (req: Request, res: Response, next) => {
    await barcoCharterResourcesController.insertItemCharter(req, res, next)
})


export default router