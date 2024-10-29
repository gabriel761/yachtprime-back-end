import env from 'env-var'

const config = {
    port: env.get('PORT').required().asInt(),
    database: env.get('DATABASE').required().asJsonObject()
}

export default config