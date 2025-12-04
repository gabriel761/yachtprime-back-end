import express, { NextFunction, Request, Response } from 'express';
import { BarcoSeminovoResourcesController } from '../controller/BarcoSeminovoResourcesController.js';
import { decodeToken } from '../infra/middlewares/decodeToken.js';
import { mainMiddleware } from '../infra/middlewares/mainMiddleware.js';
import { verifyUserRole } from '../infra/middlewares/VerifyUserType.js';

const router = express.Router();
const barcoSeminovoResourcesController = new BarcoSeminovoResourcesController() 


router.get('/combustivel',mainMiddleware, verifyUserRole(["Dono", "Administrador", "Editor"]), async (req: Request, res: Response, next: NextFunction) => {
    await barcoSeminovoResourcesController.listCombustivel(req, res, next)
})
router.get('/propulsao', mainMiddleware, verifyUserRole(["Dono", "Administrador", "Editor"]), async (req: Request, res: Response, next: NextFunction) => {
    await barcoSeminovoResourcesController.listPropulsao(req, res, next)
})
router.get('/modelo', mainMiddleware, verifyUserRole(["Dono", "Administrador", "Editor"]), async (req: Request, res: Response, next: NextFunction) => {
    await barcoSeminovoResourcesController.listModelo(req, res, next)
})
router.get('/motor', mainMiddleware, verifyUserRole(["Dono", "Administrador", "Editor"]), async (req: Request, res: Response, next: NextFunction) => {
    await barcoSeminovoResourcesController.listModeloMotor(req, res, next)
})

router.get('/item-seminovo', mainMiddleware, verifyUserRole(["Dono", "Administrador", "Editor"]), async (req: Request, res: Response, next: NextFunction) => {
    await barcoSeminovoResourcesController.listItemSeminovo(req, res, next)
})

router.get('/imagens-seminovo/:id', mainMiddleware, verifyUserRole(["Dono", "Administrador", "Editor"]), async (req: Request, res: Response, next: NextFunction) => {
    await barcoSeminovoResourcesController.listImagensByIdSeminovo(req, res, next)
})

router.post('/delete-images-from-firebase', mainMiddleware, verifyUserRole(["Dono", "Administrador", "Editor"]), async (req: Request, res: Response, next: NextFunction) => {
   await barcoSeminovoResourcesController.deleteImagesFromFirebase(req, res, next)
})

router.post('/item-seminovo', mainMiddleware, verifyUserRole(["Dono", "Administrador", "Editor"]), async (req: Request, res: Response, next: NextFunction) => {
    await barcoSeminovoResourcesController.insertItemSeminovo(req, res, next)
})


export default router