import { admin } from "../../infra/firebase/firebase-config.ts"

export class FirebaseModel{
    async deleteImage(folderName:string, fileName:string){
        await admin.storage().bucket().file(`${folderName}/${fileName}`).delete();
    }
} 