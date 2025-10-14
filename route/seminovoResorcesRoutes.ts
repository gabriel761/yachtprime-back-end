import express, { NextFunction, Request, Response } from 'express';
import { BarcoSeminovoResourcesController } from '../controller/BarcoSeminovoResourcesController.js';
import { decodeToken } from '../infra/middlewares/decodeToken.js';

const router = express.Router();
const barcoSeminovoResourcesController = new BarcoSeminovoResourcesController() 


router.get('/combustivel',decodeToken, async (req: Request, res: Response, next: NextFunction) => {
    await barcoSeminovoResourcesController.listCombustivel(req, res, next)
})
router.get('/propulsao', decodeToken, async (req: Request, res: Response, next: NextFunction) => {
    await barcoSeminovoResourcesController.listPropulsao(req, res, next)
})
router.get('/modelo', decodeToken, async (req: Request, res: Response, next: NextFunction) => {
    await barcoSeminovoResourcesController.listModelo(req, res, next)
})
router.get('/motor', decodeToken, async (req: Request, res: Response, next: NextFunction) => {
    await barcoSeminovoResourcesController.listModeloMotor(req, res, next)
})

router.get('/item-seminovo', decodeToken, async (req: Request, res: Response, next: NextFunction) => {
    await barcoSeminovoResourcesController.listItemSeminovo(req, res, next)
})

router.get('/imagens-seminovo/:id', decodeToken, async (req: Request, res: Response, next: NextFunction) => {
    await barcoSeminovoResourcesController.listImagensByIdSeminovo(req, res, next)
})

router.post('/delete-images-from-firebase', decodeToken, async (req: Request, res: Response, next: NextFunction) => {
   await barcoSeminovoResourcesController.deleteImagesFromFirebase(req, res, next)
})

router.post('/item-seminovo', decodeToken, async (req: Request, res: Response, next: NextFunction) => {
    await barcoSeminovoResourcesController.insertItemSeminovo(req, res, next)
})


export default router