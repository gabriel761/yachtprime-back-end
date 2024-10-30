import express, {Request, Response} from 'express';
import BarcoSeminovoRepository from '../repository/BarcoSeminovoRepository.ts';
import BarcoSeminovoService from '../service/BarcoSeminovoService.ts';
const router = express.Router();


router.get('/seminovo/:id', async (req:Request, res:Response) => {
    const id = parseInt(req.params.id)
    if(typeof id != "number"){
        res.status(400).json({error: "bad request"})
    } else{
        const barcoSeminovo = new BarcoSeminovoService()
        const barcoSeminovoResult = await barcoSeminovo.getBarcoSeminovoById(id)
        res.json(barcoSeminovoResult)
    }
    
})

export default router