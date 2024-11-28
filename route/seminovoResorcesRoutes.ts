import express, { NextFunction, Request, Response } from 'express';
import { BarcoSeminovoResourcesController } from '../controller/BarcoSeminovoResourcesController.ts';

const router = express.Router();
const barcoSeminovoResourcesController = new BarcoSeminovoResourcesController() 


router.get('/combustivel', async (req: Request, res: Response, next: NextFunction) => {
    await barcoSeminovoResourcesController.listCombustivel(req, res, next)
})
router.get('/propulsao', async (req: Request, res: Response, next: NextFunction) => {
    await barcoSeminovoResourcesController.listPropulsao(req, res, next)
})
router.get('/modelo', async (req: Request, res: Response, next: NextFunction) => {
    await barcoSeminovoResourcesController.listModelo(req, res, next)
})
router.get('/motor', async (req: Request, res: Response, next: NextFunction) => {
    await barcoSeminovoResourcesController.listModeloMotor(req, res, next)
})

router.get('/item-seminovo', async (req: Request, res: Response, next: NextFunction) => {
    await barcoSeminovoResourcesController.listItemSeminovo(req, res, next)
})


export default router