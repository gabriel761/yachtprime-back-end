import express, { NextFunction, Request, Response } from 'express';
import { decodeToken } from "../infra/middlewares/decodeToken.js"
import { UserController } from '../controller/UserController.js';
import { mainMiddleware } from '../infra/middlewares/mainMiddleware.js';
import { verifyUserRole } from '../infra/middlewares/VerifyUserType.js';

const router = express.Router();
const userController = new UserController()

router.get('/', mainMiddleware, (req, res, next) => {
    try {
        res.status(200).end()
    } catch (error) {
        next()
    }
})

router.get('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
    await userController.getUserById(req, res, next)
})
router.get('/user-dashboard/:id', async (req: Request, res: Response, next: NextFunction) => {
    await userController.getUserDashboardById(req, res, next)
})
router.get('/all-users', mainMiddleware, verifyUserRole(["Dono"]), async (req: Request, res: Response, next: NextFunction) => {
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