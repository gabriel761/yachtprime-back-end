import express, { NextFunction, Request, Response } from 'express';
import { BarcoSeminovoController } from '../controller/BarcoSeminovoController.ts';
import errorHandler from '../infra/middlewares/errorHandler.ts';

const router = express.Router();


router.get('/seminovo/:id', async (req: Request, res: Response, next: NextFunction) => {
        const barcoSeminovoController = new BarcoSeminovoController()
    await barcoSeminovoController.getBarcoSeminovoById(req, res, next)
})

router.post('/seminovo', async (req: Request, res: Response, next: NextFunction ) => {
        const barcoSeminovoController = new BarcoSeminovoController()
        await barcoSeminovoController.postBarcoSeminovo(req, res, next)
})

router.delete('/seminovo', async (req: Request, res: Response, next: NextFunction) => {
        const barcoSeminovoController = new BarcoSeminovoController()
        await barcoSeminovoController.deleteBarcoSeminovo(req, res, next)
})


export default router