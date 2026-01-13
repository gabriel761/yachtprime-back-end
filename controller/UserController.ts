import { NextFunction, Request, Response } from 'express';
import { UserService } from '../service/UserService.js';
import { FirebaseModel } from '../models/external/FirebaseModel.js';
import { CustomError } from '../infra/CustoError.js';
import { validateIntegerPositiveNumber } from '../util/validationUtil.js';

const userService = new UserService()

export class UserController {

    async listUserTypes(req: Request, res: Response, next: NextFunction) {
        try {
            const userTypes = await userService.getUserTypes()
            res.json(userTypes)
        } catch (error) {
            next(error)
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (Array.isArray(id)) {
                return res.status(400).json({ error: 'Invalid id' });
            }
            const idUser = parseInt(id)
            const userTypes = await userService.getUserById(idUser)
            res.json(userTypes)
        } catch (error) {
            next(error)
        }
    }

    async getUserDashboardById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (Array.isArray(id)) {
                return res.status(400).json({ error: 'Invalid id' });
            }
            const idUser = parseInt(id)
            const userTypes = await userService.getUserDashboardById(idUser)
            res.json(userTypes)
        } catch (error) {
            next(error)
        }
    }

    async listUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const userTypes = await userService.getUsers()
            res.json(userTypes)
        } catch (error) {
            next(error)
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body
            if (!body) throw new CustomError("Empty body delete", 400)
            validateIntegerPositiveNumber(body.id, "id", "Barco Seminovo")
            const userTypes = await userService.deleteUser(body.id, new FirebaseModel)
            res.json(userTypes)
        } catch (error) {
            next(error)
        }
    }

    async insertUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body
            await userService.insertUser(user, new FirebaseModel())
            res.sendStatus(200)
        } catch (error) {
            next(error)
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body
            await userService.updateUser(user, new FirebaseModel())
            res.sendStatus(200)
        } catch (error) {
            next(error)
        }
    }

    async updateUserPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body
            await userService.updateUserPassword(user, new FirebaseModel())
            res.sendStatus(200)
        } catch (error) {
            next(error)
        }
    }
}