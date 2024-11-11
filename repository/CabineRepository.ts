import { CustomError } from "../infra/CustoError.ts";
import db from "../infra/database.ts";
import { Cabine } from "../types/Cabine.ts";

export class CabineRepository {
    async insertCabine(cabine: Cabine) {
        const idCabine = await db.one("INSERT INTO cabine (passageiro, tripulacao) VALUES($1,$2) RETURNING id", [cabine.passageiros, cabine.tripulacao]);
        return idCabine
    }
    async deleteCabineById(idCabine: number) {
        try {
            await db.query("DELETE FROM cabine WHERE id = $1", [idCabine])
        } catch (error: any) {
            throw new CustomError(`Repository lever Error: CabineRepository deleteByIdSeminovo: ${error}`, 500)
        }

    }
}