import express, { NextFunction, Request, Response } from 'express';
import { BarcoSeminovoController } from '../controller/BarcoSeminovoController.js';
import BarcoSeminovoService from '../service/BarcoSeminovoService.js';
import BarcoSeminovoRepository from '../repository/seminovo/BarcoSeminovoRepository.js';
import { decodeToken } from '../infra/middlewares/decodeToken.js';

const router = express.Router();
const barcoSeminovoController = new BarcoSeminovoController(new BarcoSeminovoService)

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
        await barcoSeminovoController.getBarcoSeminovoById(req, res, next)
})
router.get('/list/dashboard', decodeToken, async (req:Request, res: Response, next) => {
        await barcoSeminovoController.listBarcoSeminovoDashboard(req, res, next)
})
router.get('/list/front-end', async (req: Request, res: Response, next) => {
        await barcoSeminovoController.listBarcoSeminovoFrontEnd(req, res, next)
})
router.get('/related/:id', async (req: Request, res: Response, next: NextFunction) => {
        await barcoSeminovoController.getRelatedSeminovos(req, res, next)
})
router.post('/', decodeToken, async (req: Request, res: Response, next: NextFunction) => {
        await barcoSeminovoController.postBarcoSeminovo(req, res, next)
})

router.patch('/', decodeToken, async (req: Request, res: Response, next: NextFunction) => {
        await barcoSeminovoController.updateBarcoSeminovo(req, res, next)
})

router.delete('/', decodeToken, async (req: Request, res: Response, next: NextFunction) => {
        await barcoSeminovoController.deleteBarcoSeminovo(req, res, next);
})



export default router