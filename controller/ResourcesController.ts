import { NextFunction, Request, Response } from 'express';
import { ResourcesService } from "../service/ResourcesService.js"
import { Form } from '../types/Form.js';
import { Modelo } from '../types/Modelo.js';
import { Motor } from '../types/seminovo/Motor.js';

const resourcesService = new ResourcesService()
export class ResourcesController {
    async listMoeda(req: Request, res: Response, next: NextFunction) {
        try {
            const moedaResult = await resourcesService.listModeda()
            res.json(moedaResult)
        } catch (error) {
            next(error)
        }
    }

    async formularioContato(req: Request, res: Response, next: NextFunction) {
        try {
            const formData: Form = req.body
            const moedaResult = await resourcesService.formularioContato(formData)
            res.json(moedaResult)
        } catch (error) {
            next(error)
        }
    }

    async insertModelo(req: Request, res: Response, next: NextFunction) {
        try{
            const modeloInput: Modelo = req.body
            await resourcesService.insertModelo(modeloInput)
            res.sendStatus(200)
        } catch(error){
            next(error)
        }
    }

    async insertMotor(req: Request, res: Response, next: NextFunction) {
        try {
            const motorInput: Motor = req.body
            await resourcesService.insertModeloMotor(motorInput)
            res.sendStatus(200)
        } catch (error) {
            next(error)
        }
    }
}

 