import pgPromise from 'pg-promise';
import config from "../config.js"

const pgp = pgPromise();
const dbUser = pgp(config.databaseUser)

export default dbUser