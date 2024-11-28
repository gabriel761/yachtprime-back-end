import express from 'express';
import seminovoRoute from './route/seminovoRotes.ts'
import seminovoResourcesRoute from './route/seminovoResorcesRoutes.ts'
import resourcesRoute from './route/resorcesRoutes.ts'
import config from './config.js';
import errorHandler from './infra/middlewares/errorHandler.ts';
import cors from "cors"


const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/barco', seminovoRoute);
app.use('/resources', resourcesRoute);
app.use('/resources/seminovo', seminovoResourcesRoute);


app.use(errorHandler);

app.listen(config.port, () => {
    console.log("\x1b[32m%s\x1b[0m", `running on port ${config.port}\n`)
})