import env from 'env-var'
import dotenv from 'dotenv'

dotenv.config()

const config = {
    limitQuery: env.get('LIMITQUERY').asInt(),
    port: env.get('PORT').asInt(),
    database: env.get('DATABASE').required().asJsonObject(),
    databaseUser: env.get('DATABASE_USER').required().asJsonObject(),
    firebaseCredentials: env.get('FIREBASE_CREDENTIALS').required().asJsonObject(),
    formEmail: env.get('FORM_EMAIL').required().asString(),
    sendGridApiKey: env.get('SENDGRID_API_KEY').required().asString()
}

export default config