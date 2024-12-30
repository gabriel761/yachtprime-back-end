import env from 'env-var'
import dotenv from 'dotenv'

dotenv.config()

const config = {
    limitQuery: env.get('LIMITQUERY').asInt(),
    port: env.get('PORT').asInt(),
    database: env.get('DATABASE').required().asJsonObject(),
    firebaseCredentials: env.get('FIREBASE_CREDENTIALS').required().asJsonObject()
}

export default config