import express from 'express';
import seminovoRoute from './route/seminovoRotes.js'
import charterRoute from './route/charterRoute.js'
import seminovoResourcesRoute from './route/seminovoResorcesRoutes.js'
import charterResourcesRoute from './route/charterResourcesRoute.js'
import userRoutes from './route/userRoutes.js'
import resourcesRoute from './route/resorcesRoutes.js'
import config from './config.js';
import errorHandler from './infra/middlewares/errorHandler.js';
import cors from "cors"
import { decodeToken } from './infra/middlewares/decodeToken.js';

const corsOrigin = ['http://localhost:3000', 'https://yacht-prime-dashboard-mvy5.vercel.app', 'https://yacht-prime-front-end.vercel.app', 'https://yacht-prime-dashboard-mvy5.vercel.app/']
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use('/barco/seminovo', seminovoRoute);
app.use('/barco/charter', charterRoute);
app.use('/resources', resourcesRoute);
app.use('/resources/seminovo', seminovoResourcesRoute);
app.use('/resources/charter', charterResourcesRoute);
app.use('/user', userRoutes)


app.use(errorHandler);

app.listen(config.port, () => {
    console.log("\x1b[32m%s\x1b[0m", `running on port ${config.port}\n`)
})