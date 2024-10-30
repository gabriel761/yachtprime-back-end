import express, {Request, Response} from 'express';
import { BarcoSeminovoController } from '../controller/BarcoSeminovoController.ts';

const router = express.Router();


router.get('/seminovo/:id', async (req:Request, res:Response) => {
    const barcoSeminovoController = new BarcoSeminovoController()
    barcoSeminovoController.getBarcoSeminovoById(req,res)
})

router.post('/seminovo', async (req: Request, res: Response) => {
    const barcoSeminovoController = new BarcoSeminovoController()
    barcoSeminovoController.postBarcoSeminovo(req, res)
})

export default router