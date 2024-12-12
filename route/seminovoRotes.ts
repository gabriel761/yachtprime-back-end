import express, { NextFunction, Request, Response } from 'express';
import { BarcoSeminovoController } from '../controller/BarcoSeminovoController.ts';
import BarcoSeminovoService from '../service/BarcoSeminovoService.ts';
import BarcoSeminovoRepository from '../repository/BarcoSeminovoRepository.ts';

const router = express.Router();
const barcoSeminovoController = new BarcoSeminovoController(new BarcoSeminovoService)

router.get('/seminovo/:id', async (req: Request, res: Response, next: NextFunction) => {
        await barcoSeminovoController.getBarcoSeminovoById(req, res, next)
})

router.get('/seminovo', async (req:Request, res: Response, next) => {
        await barcoSeminovoController.listBarcoSeminovo(req, res, next)
})

router.post('/seminovo', async (req: Request, res: Response, next: NextFunction) => {
        await barcoSeminovoController.postBarcoSeminovo(req, res, next)
})

router.patch('/seminovo', async (req: Request, res: Response, next: NextFunction) => {
        await barcoSeminovoController.updateBarcoSeminovo(req, res, next)
})

router.delete('/seminovo', async (req: Request, res: Response, next: NextFunction) => {
        await barcoSeminovoController.deleteBarcoSeminovo(req, res, next)
})



export default router