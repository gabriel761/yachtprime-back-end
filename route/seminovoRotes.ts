import express, { NextFunction, Request, Response } from 'express';
import { BarcoSeminovoController } from '../controller/BarcoSeminovoController.js';
import BarcoSeminovoService from '../service/BarcoSeminovoService.js';
import BarcoSeminovoRepository from '../repository/seminovo/BarcoSeminovoRepository.js';
import { decodeToken } from '../infra/middlewares/decodeToken.js';
import { mainMiddleware } from '../infra/middlewares/mainMiddleware.js';
import { verifyUserRole } from '../infra/middlewares/VerifyUserType.js';

const router = express.Router();
const barcoSeminovoController = new BarcoSeminovoController(new BarcoSeminovoService)

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
        await barcoSeminovoController.getBarcoSeminovoById(req, res, next)
})
router.get('/dashboard/:id', mainMiddleware, verifyUserRole(["Dono", "Editor", "Administrador"]), async (req: Request, res: Response, next: NextFunction) => {
        await barcoSeminovoController.getBarcoSeminovoDashboardById(req, res, next)
})
router.get('/list/dashboard', mainMiddleware, verifyUserRole(["Dono", "Editor", "Administrador"]), async (req:Request, res: Response, next) => {
        await barcoSeminovoController.listBarcoSeminovoDashboard(req, res, next)
})
router.get('/list/front-end', async (req: Request, res: Response, next) => {
        await barcoSeminovoController.listBarcoSeminovoFrontEnd(req, res, next)
})
router.get('/related/:id', async (req: Request, res: Response, next: NextFunction) => {
        await barcoSeminovoController.getRelatedSeminovos(req, res, next)
})
router.post('/', mainMiddleware, verifyUserRole(["Dono", "Editor", "Administrador"]), async (req: Request, res: Response, next: NextFunction) => {
        await barcoSeminovoController.postBarcoSeminovo(req, res, next)
})

router.patch('/', mainMiddleware, verifyUserRole(["Dono", "Editor", "Administrador"]), async (req: Request, res: Response, next: NextFunction) => {
        await barcoSeminovoController.updateBarcoSeminovo(req, res, next)
})

router.delete('/', mainMiddleware, verifyUserRole(["Dono", "Editor", "Administrador"]), async (req: Request, res: Response, next: NextFunction) => {
        await barcoSeminovoController.deleteBarcoSeminovo(req, res, next);
})



export default router