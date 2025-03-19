import express, { NextFunction, Request, Response } from 'express';
import barcoCharterOUtput from '../test/mocks/barcoCharterOutput.js'
import { BarcoCharterController } from '../controller/BarcoCharterControler.js';
import { BarcoCharterService } from '../service/BarcoCharterService.js';

const router = express.Router();
const barcoCharterController = new BarcoCharterController(new BarcoCharterService)

router.get("/:id", async (req:Request, res: Response, next) => {
    await barcoCharterController.getBarcoCharterById(req, res, next)
})

router.post("/", async (req: Request, res: Response, next) => {
    await barcoCharterController.postBarcoCharterById(req, res, next)
})

export default router