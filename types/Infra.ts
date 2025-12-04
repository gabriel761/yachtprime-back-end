import { DecodedIdToken } from "firebase-admin/auth";
import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            firebaseUser?: DecodedIdToken;
        }
    }
}
