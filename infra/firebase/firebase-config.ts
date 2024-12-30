import admin from "firebase-admin"
import config from "../../config.js";






admin.initializeApp({
    credential: admin.credential.cert(config.firebaseCredentials),
    storageBucket: "yachtprime-bd970.firebasestorage.app"
});

export {admin}

export const bucket:any = admin.storage().bucket()

