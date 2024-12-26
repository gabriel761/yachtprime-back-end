import env from 'env-var'

const config = {
    limitQuery: env.get('LIMITQUERY').asInt(),
    port: env.get('PORT').required().asInt(),
    database: env.get('DATABASE').required().asJsonObject()
}

export default config