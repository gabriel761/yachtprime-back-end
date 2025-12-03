import { NextFunction, Request, Response } from 'express';
import { ResourcesService } from "../service/ResourcesService.js"
import { Form } from '../types/Form.js';
import { Modelo } from '../types/Modelo.js';
import { Motor } from '../types/seminovo/Motor.js';
import { Proprietario } from '../types/Proprietario.js';
import { CustomError } from '../infra/CustoError.js';
import { validateIntegerPositiveNumber } from '../util/validationUtil.js';
import { BarcoCharterService } from '../service/BarcoCharterService.js';
import BarcoSeminovoService from '../service/BarcoSeminovoService.js';
import { FirebaseModel } from '../models/external/FirebaseModel.js';

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
        try {
            const modeloInput: Modelo = req.body
            await resourcesService.insertModelo(modeloInput)
            res.sendStatus(200)
        } catch (error) {
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

    async searchProprietario(req: Request, res: Response, next: NextFunction) {
        try {
           const nome = req.params.nome
           const firebaseId = req.user?.uid
           if(!firebaseId) throw new CustomError("Firebase id indefinido", 403)
            const proprietarioResult = await resourcesService.searchProprietario(nome, firebaseId)
            res.json(proprietarioResult)
        } catch (error) {
            next(error)
        }
    }
    async listProprietariosDashboard(req: Request, res: Response, next: NextFunction) {
        try {
            const proprietariosResult = await resourcesService.listProprietariosDashboard()
            res.json(proprietariosResult)
        } catch (error) {
            next(error)
        }
    }
    async listAllBoatsFromProprietario(req: Request, res: Response, next: NextFunction) {
        try {
            const idProprietario = parseInt(req.params.id) 
            const proprietariosResult = await resourcesService.listAllBoatsFromProprietario(idProprietario)
            res.json(proprietariosResult)
        } catch (error) {
            next(error)
        }
    }
    async insertProprietario(req: Request, res: Response, next: NextFunction) {
        try {
            const proprietario: Proprietario = req.body
            await resourcesService.insertProprietario(proprietario)
            res.sendStatus(200)
        } catch (error) {
            next(error)
        }
    }
    async getProprietario(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = parseInt(req.params.id)
            const proprietarioResult = await resourcesService.getProprietario(id)
            res.json(proprietarioResult)
        } catch (error) {
            next(error)
        }
    }
    async getProprietarioDashboard(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = parseInt(req.params.id)
            const proprietarioResult = await resourcesService.getProprietarioDashboard(id)
            res.json(proprietarioResult)
        } catch (error) {
            next(error)
        }
    }

    async updateProprietario(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body
            await resourcesService.updateProprietario(body)
            res.sendStatus(200)
        } catch (error) {
            next(error)
        }
    }

    async deleteProprietario(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body
            if (!body) throw new CustomError("Empty body delete", 400)
            validateIntegerPositiveNumber(body.id, "id", "Proprietário")
            await resourcesService.deleteProprietarioAndAllAssociatedBoats(body.id, new BarcoCharterService(), new BarcoSeminovoService(), new FirebaseModel())
            res.sendStatus(200)
        } catch (error) {
            next(error)
        }
    }
}

