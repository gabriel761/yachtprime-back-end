import express from 'express';
import seminovoroute from './route/seminovoRotes.ts'
import config from './config.js';


const app = express()
const router = express.Router()


app.use('/barco', seminovoroute);



app.listen(config.port, () => {
    console.log("\x1b[32m%s\x1b[0m", `running on port ${config.port}\n`)
})