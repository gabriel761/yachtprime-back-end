import express, { NextFunction, Request, Response } from 'express';
import { BarcoSeminovoController } from '../controller/BarcoSeminovoController.js';
import { ResourcesController } from '../controller/ResourcesController.js';
import { decodeToken } from '../infra/middlewares/decodeToken.js';

const router = express.Router();
const resourcesController = new ResourcesController()

router.get('/moeda', decodeToken, async (req: Request, res: Response, next: NextFunction) => {
    await resourcesController.listMoeda(req, res, next)
})

export default router