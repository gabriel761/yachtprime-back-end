import env from 'env-var'

const config = {
    limitQuery: env.get('LIMITQUERY').asInt(),
    port: env.get('PORT').asInt(),
    database: env.get('DATABASE').required().asJsonObject(),
    firebaseCredentials: env.get('FIREBASE_CREDENTIALS').required().asJsonObject()
}

export default config