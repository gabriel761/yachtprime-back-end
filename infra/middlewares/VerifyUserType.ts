import { Request, Response, NextFunction } from "express"
import { UserRepository } from "../../repository/UserRepository.js"

type UserRole = "Dono" | "Administrador" | "Editor" 


export const verifyUserRole = (roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const firebaseId = req.firebaseUser?.uid
            const userRepository = new UserRepository()
            const result = await userRepository.getUserTypeByIdFirebase(firebaseId || "")
            if (!result) res.status(403).json({ message: "Middleware level error: Usuário não encontrado" })
            if (!roles.includes(result)) res.status(403).json({ message: "Tipo de usuário não autorizado" })
        } catch (error) {
            res.status(500).json({ message: "Middleware level error"+error })
        } 
        next()
    }
}
