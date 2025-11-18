import express, { NextFunction, Request, Response } from 'express';
import { BarcoSeminovoController } from '../controller/BarcoSeminovoController.js';
import { ResourcesController } from '../controller/ResourcesController.js';
import { decodeToken } from '../infra/middlewares/decodeToken.js';
import { mainMiddleware } from '../infra/middlewares/mainMiddleware.js';

const router = express.Router();
const resourcesController = new ResourcesController()

router.get('/moeda', mainMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    await resourcesController.listMoeda(req, res, next)
})

router.post('/formulario-contato', async (req: Request, res: Response, next: NextFunction) => {
    await resourcesController.formularioContato(req, res, next)
})

router.post('/modelo', mainMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    await resourcesController.insertModelo(req, res, next)
})

router.post('/motor', mainMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    await resourcesController.insertMotor(req, res, next)
})

router.get('/search-proprietario/:nome', mainMiddleware,async (req: Request, res: Response, next: NextFunction) => {
    await resourcesController.searchProprietario(req, res, next)
})

router.post('/proprietario', async (req: Request, res: Response, next: NextFunction) => {
    await resourcesController.insertProprietario(req, res, next)
})

router.get('/proprietario/:id', async (req: Request, res: Response, next: NextFunction) => {
    await resourcesController.getProprietario(req, res, next)
})

router.get('/proprietario-dashboard-list', async (req: Request, res: Response, next: NextFunction) => {
    await resourcesController.listProprietariosDashboard(req, res, next)
})

router.delete('/proprietario', async (req: Request, res: Response, next: NextFunction) => {
    await resourcesController.deleteProprietario(req, res, next)
})

router.patch('/proprietario', async (req: Request, res: Response, next: NextFunction) => {
    await resourcesController.updateProprietario(req, res, next)
})
export default router