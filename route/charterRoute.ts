import express, { NextFunction, Request, Response } from 'express';
import barcoCharterOUtput from '../test/mocks/barcoCharterOutput.js'
import { BarcoCharterController } from '../controller/BarcoCharterControler.js';
import { BarcoCharterService } from '../service/BarcoCharterService.js';
import { decodeToken } from '../infra/middlewares/decodeToken.js';
import { mainMiddleware } from '../infra/middlewares/mainMiddleware.js';
import { verifyUserRole } from '../infra/middlewares/VerifyUserType.js';

const router = express.Router();
const barcoCharterController = new BarcoCharterController(new BarcoCharterService)

router.get("/:id", async (req:Request, res: Response, next) => {
    await barcoCharterController.getBarcoCharterById(req, res, next)
})

router.get("/dashboard/:id", mainMiddleware, verifyUserRole(["Dono", "Editor", "Administrador"]), async (req: Request, res: Response, next) => {
    await barcoCharterController.getBarcoCharterDashboardById(req, res, next)
})

router.get("/list/dashboard", mainMiddleware, verifyUserRole(["Dono", "Editor", "Administrador"]), async (req:Request, res:Response, next)=>{
    await barcoCharterController.listBarcoCharterDashboard(req, res, next)
})

router.get('/list/front-end', async (req: Request, res: Response, next) => {
        await barcoCharterController.listBarcoCharterFrontEnd(req, res, next)
})

router.get('/related/:id', async (req: Request, res: Response, next) => {
    await barcoCharterController.getRelatedCharters(req, res, next)
})

router.post("/", mainMiddleware, verifyUserRole(["Dono", "Editor", "Administrador"]), async (req: Request, res: Response, next) => {
    await barcoCharterController.postBarcoCharter(req, res, next)
})

router.patch("/", mainMiddleware, verifyUserRole(["Dono", "Editor", "Administrador"]), async (req: Request, res: Response, next) => {
    await barcoCharterController.updateBarcoCharterById(req, res, next)
})

router.delete("/", mainMiddleware, verifyUserRole(["Dono", "Editor", "Administrador"]), async (req: Request, res: Response, next) => {
    await barcoCharterController.deleteBarcoCharter(req, res, next)
})

export default router