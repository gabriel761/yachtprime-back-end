import express, { NextFunction, Request, Response } from 'express';
import { BarcoSeminovoController } from '../controller/BarcoSeminovoController.js';
import { ResourcesController } from '../controller/ResourcesController.js';
import { decodeToken } from '../infra/middlewares/decodeToken.js';
import { mainMiddleware } from '../infra/middlewares/mainMiddleware.js';
import { verifyUserRole } from '../infra/middlewares/VerifyUserType.js';

const router = express.Router();
const resourcesController = new ResourcesController()

router.get('/moeda', mainMiddleware, verifyUserRole(["Dono", "Administrador"]), async (req: Request, res: Response, next: NextFunction) => {
    await resourcesController.listMoeda(req, res, next)
})

router.post('/formulario-contato', async (req: Request, res: Response, next: NextFunction) => {
    await resourcesController.formularioContato(req, res, next)
})

router.post('/modelo', mainMiddleware, verifyUserRole(["Dono", "Administrador" ]), async (req: Request, res: Response, next: NextFunction) => {
    await resourcesController.insertModelo(req, res, next)
})

router.post('/motor', mainMiddleware, verifyUserRole(["Dono", "Administrador"]), async (req: Request, res: Response, next: NextFunction) => {
    await resourcesController.insertMotor(req, res, next)
})

router.get('/search-proprietario/:nome', mainMiddleware, verifyUserRole(["Dono", "Administrador", "Editor"]), async (req: Request, res: Response, next: NextFunction) => {
    await resourcesController.searchProprietario(req, res, next)
})

router.post('/proprietario', mainMiddleware, verifyUserRole(["Dono", "Administrador", "Editor"]), async (req: Request, res: Response, next: NextFunction) => {
    await resourcesController.insertProprietario(req, res, next)
})

router.get('/proprietario/:id', mainMiddleware, verifyUserRole(["Dono", "Administrador", "Editor"]), async (req: Request, res: Response, next: NextFunction) => {
    await resourcesController.getProprietario(req, res, next)
})

router.get('/proprietario-dashboard/:id', mainMiddleware, verifyUserRole(["Dono", "Administrador", "Editor"]), async (req: Request, res: Response, next: NextFunction) => {
    await resourcesController.getProprietarioDashboard(req, res, next)
})

router.get('/proprietario-dashboard-list', mainMiddleware, verifyUserRole(["Dono", "Administrador", "Editor"]), async (req: Request, res: Response, next: NextFunction) => {
    await resourcesController.listProprietariosDashboard(req, res, next)
})
router.get('/proprietario/boats/:id', mainMiddleware, verifyUserRole(["Dono", "Administrador", "Editor"]), async (req: Request, res: Response, next: NextFunction) => {
    await resourcesController.listAllBoatsFromProprietario(req, res, next)
})
router.delete('/proprietario', mainMiddleware, verifyUserRole(["Dono", "Administrador", "Editor"]), async (req: Request, res: Response, next: NextFunction) => {
    await resourcesController.deleteProprietario(req, res, next)
})

router.patch('/proprietario', mainMiddleware, verifyUserRole(["Dono", "Administrador", "Editor"]), async (req: Request, res: Response, next: NextFunction) => {
    await resourcesController.updateProprietario(req, res, next)
})
export default router