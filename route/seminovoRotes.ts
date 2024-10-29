import express, {Request, Response} from 'express';
import BarcoSeminovoRepository from '../repository/BarcoSeminovoRepository.ts';
const router = express.Router();


router.get('/seminovo', async (req:Request, res:Response) => {
    const barcoSeminovo = new BarcoSeminovoRepository()
    const barcoSeminovoResult = await barcoSeminovo.getBarcoSeminovo()
    res.json(barcoSeminovoResult)
})

export default router