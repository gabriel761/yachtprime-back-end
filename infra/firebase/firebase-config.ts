import admin from "firebase-admin"
import { ServiceAccount } from "firebase-admin";
import serviceAccount from "./yachtprime-bd970-firebase-adminsdk-t6uei-6d8f7d46b9.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    storageBucket: "yachtprime-bd970.firebasestorage.app"
});

export {admin}

export const bucket = admin.storage().bucket()

