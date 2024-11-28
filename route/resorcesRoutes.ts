import express, { NextFunction, Request, Response } from 'express';
import { BarcoSeminovoController } from '../controller/BarcoSeminovoController.ts';
import { ResourcesController } from '../controller/ResourcesController.ts';

const router = express.Router();
const resourcesController = new ResourcesController()

router.get('/moeda', async (req: Request, res: Response, next: NextFunction) => {
    await resourcesController.listMoeda(req, res, next)
})

export default router