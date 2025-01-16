import express, { NextFunction, Request, Response } from 'express';
import { BarcoSeminovoController } from '../controller/BarcoSeminovoController.js';
import BarcoSeminovoService from '../service/BarcoSeminovoService.js';
import BarcoSeminovoRepository from '../repository/BarcoSeminovoRepository.js';
import { decodeToken } from '../infra/middlewares/decodeToken.js';

const router = express.Router();
const barcoSeminovoController = new BarcoSeminovoController(new BarcoSeminovoService)

router.get('/seminovo/:id', async (req: Request, res: Response, next: NextFunction) => {
        await barcoSeminovoController.getBarcoSeminovoById(req, res, next)
})
router.get('/seminovo-dashboard', decodeToken, async (req:Request, res: Response, next) => {
        await barcoSeminovoController.listBarcoSeminovoDashboard(req, res, next)
})
router.get('/seminovo-front-end', async (req: Request, res: Response, next) => {
        await barcoSeminovoController.listBarcoSeminovoFrontEnd(req, res, next)
})
router.get('/seminovo-related/:id', async (req: Request, res: Response, next: NextFunction) => {
        await barcoSeminovoController.getRelatedSeminovos(req, res, next)
})
router.post('/seminovo', decodeToken, async (req: Request, res: Response, next: NextFunction) => {
        await barcoSeminovoController.postBarcoSeminovo(req, res, next)
})

router.patch('/seminovo', decodeToken, async (req: Request, res: Response, next: NextFunction) => {
        await barcoSeminovoController.updateBarcoSeminovo(req, res, next)
})

router.delete('/seminovo', decodeToken, async (req: Request, res: Response, next: NextFunction) => {
        await barcoSeminovoController.deleteBarcoSeminovo(req, res, next);
})



export default router