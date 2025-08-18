import { NextFunction, Request, Response } from 'express';
import { ResourcesService } from "../service/ResourcesService.js"
import { Form } from '../types/Form.js';

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
            console.log(formData)
            const moedaResult = await resourcesService.formularioContato(formData)
            res.json(moedaResult)
        } catch (error) {
            next(error)
        }
    }
}

 