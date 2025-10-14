import express, { NextFunction, Request, Response } from 'express';
import { decodeToken } from "../infra/middlewares/decodeToken.js"
import { UserController } from '../controller/UserController.js';

const router = express.Router();
const userController = new UserController()

router.get('/', decodeToken, (req, res, next) => {
    try {
        res.status(200).end()
    } catch (error) {
        next()
    }
})

router.get('/all-users', async (req: Request, res: Response, next: NextFunction) => {
    await userController.listUsers(req, res, next)
})

router.get('/user-types', async (req: Request, res: Response, next: NextFunction) => {
    await userController.listUserTypes(req, res, next)
})

router.post('/user', async (req: Request, res: Response, next: NextFunction) => {
    await userController.insertUser(req, res, next)
})

router.delete('/user', async (req: Request, res: Response, next: NextFunction) => {
    await userController.deleteUser(req, res, next)
})

router.put('/user', async (req: Request, res: Response, next: NextFunction) => {
    await userController.updateUser(req, res, next)
})

router.put('/user-password', async (req: Request, res: Response, next: NextFunction) => {
    await userController.updateUserPassword(req, res, next)
})



export default router