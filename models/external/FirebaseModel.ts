import { CustomError } from "../../infra/CustoError.js";
import { admin } from "../../infra/firebase/firebase-config.js"

export class FirebaseModel{
    async deleteImage(folderName:string, fileName:string){
        try {
            await admin.storage().bucket().file(`${folderName}/${fileName}`).delete();    
        } catch (error:any) {
          throw new CustomError("Firebase storage error: "+error.message, error.code)
        }
    }
} 