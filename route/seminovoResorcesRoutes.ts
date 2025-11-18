import express, { NextFunction, Request, Response } from 'express';
import { BarcoSeminovoResourcesController } from '../controller/BarcoSeminovoResourcesController.js';
import { decodeToken } from '../infra/middlewares/decodeToken.js';
import { mainMiddleware } from '../infra/middlewares/mainMiddleware.js';

const router = express.Router();
const barcoSeminovoResourcesController = new BarcoSeminovoResourcesController() 


router.get('/combustivel',mainMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    await barcoSeminovoResourcesController.listCombustivel(req, res, next)
})
router.get('/propulsao', mainMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    await barcoSeminovoResourcesController.listPropulsao(req, res, next)
})
router.get('/modelo', mainMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    await barcoSeminovoResourcesController.listModelo(req, res, next)
})
router.get('/motor', mainMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    await barcoSeminovoResourcesController.listModeloMotor(req, res, next)
})

router.get('/item-seminovo', mainMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    await barcoSeminovoResourcesController.listItemSeminovo(req, res, next)
})

router.get('/imagens-seminovo/:id', mainMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    await barcoSeminovoResourcesController.listImagensByIdSeminovo(req, res, next)
})

router.post('/delete-images-from-firebase', mainMiddleware, async (req: Request, res: Response, next: NextFunction) => {
   await barcoSeminovoResourcesController.deleteImagesFromFirebase(req, res, next)
})

router.post('/item-seminovo', mainMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    await barcoSeminovoResourcesController.insertItemSeminovo(req, res, next)
})


export default router