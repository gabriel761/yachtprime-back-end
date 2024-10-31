import express from 'express';
import seminovoroute from './route/seminovoRotes.ts'
import config from './config.js';
import errorHandler from './infra/middlewares/errorHandler.ts';


const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/barco', seminovoroute);

app.use(errorHandler);

app.listen(config.port, () => {
    console.log("\x1b[32m%s\x1b[0m", `running on port ${config.port}\n`)
})