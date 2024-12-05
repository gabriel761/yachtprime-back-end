import { CustomError } from "../../infra/CustoError.ts";
import { admin } from "../../infra/firebase/firebase-config.ts"

export class FirebaseModel{
    async deleteImage(folderName:string, fileName:string){
        try {
            await admin.storage().bucket().file(`${folderName}/${fileName}`).delete();    
        } catch (error:any) {
          throw new CustomError("Firebase storage error: "+error.message, error.code)
        }
    }
} 