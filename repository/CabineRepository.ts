import db from "../infra/database.ts";
import { Cabine } from "../types/Cabine.ts";

export class CabineRepository {
    async insertCabine(cabine: Cabine){
        const idCabine = await db.one("INSERT INTO cabines (passageiro, tripulacao) VALUES($1,$2) RETURNING id",[cabine.passageiros, cabine.tripulacao]);
        return idCabine
    }
}