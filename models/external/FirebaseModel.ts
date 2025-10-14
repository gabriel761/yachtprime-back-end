import { CustomError } from "../../infra/CustoError.js";
import { admin } from "../../infra/firebase/firebase-config.js"
import verifyFirebaseErrorCode from "../../util/verifyFirebaseErrorCode.js";

export class FirebaseModel{
    async deleteImage(folderName:string, fileName:string){
        try {
            await admin.storage().bucket().file(`${folderName}/${fileName}`).delete();    
        } catch (error:any) {
          throw new CustomError("Firebase storage error: "+error.message, error.code)
        }
    }

    async createUser(email:string, password: string){
        try {
            const user = await admin.auth().createUser({email, password})
            return user.uid
        } catch (error:any) {
            const errorMessage = verifyFirebaseErrorCode(error.code)
            throw new CustomError("Firebase auth error: "+ errorMessage, 500)
        }
    }

    async updateUser(firebaseId: string, email: string) {
        try {
            await admin.auth().updateUser(firebaseId, {email})
        } catch (error: any) {
            const errorMessage = verifyFirebaseErrorCode(error.code)
            throw new CustomError("Firebase auth error: " + errorMessage, 500)
        }
    }

    async updateUserPassword(firebaseId: string, password: string) {
        try {
            const user = await admin.auth().updateUser(firebaseId, { password })
            return user.uid
        } catch (error: any) {
            const errorMessage = verifyFirebaseErrorCode(error.code)
            throw new CustomError("Firebase auth error: " + errorMessage, 500)
        }
    }

    async deleteUser(idFirebase: string){
        try {
            await admin.auth().deleteUser(idFirebase)
        } catch (error:any) {
            const errorMessage = verifyFirebaseErrorCode(error.code)
            throw new CustomError("Firebase auth error: " + errorMessage, 500)
        }
    }
} 