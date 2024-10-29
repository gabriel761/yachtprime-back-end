import express from 'express';
import DtoSeminovo from './dto/DtoSeminovo.js';
import barcoSeminovo from './test/mocks/barco_seminovo.js';



const app = express()
const router = express.Router()

app.get('/', (req,res) => {
    const seminovo = barcoSeminovo
    console.log(seminovo)
    res.json(seminovo)
})



app.listen(5000, () => {
    console.log("\x1b[32m%s\x1b[0m", "running on port 5000\n")
})