import pgPromise from 'pg-promise';
import config from "../config.js"

const pgp = pgPromise();
const db = pgp(config.database)

export default db