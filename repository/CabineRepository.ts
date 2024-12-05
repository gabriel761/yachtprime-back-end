import { CustomError } from "../infra/CustoError.ts";
import db from "../infra/database.ts";
import { Cabine } from "../types/Cabine.ts";

export class CabineRepository {
    async insertCabine(cabine: Cabine) {
        const idCabine = await db.one("INSERT INTO cabine (passageiro, tripulacao) VALUES($1,$2) RETURNING id", [cabine.passageiros, cabine.tripulacao])
            .catch((error) => {
                throw new CustomError(`Repository lever Error: CabineRepository: insertCabine: ${error.message}`, 500)
            });
        return idCabine
    }
    async getCabineById(idCabine: number) {

        const cabine = await db.oneOrNone("SELECT * FROM cabine WHERE id = $1", [idCabine])
            .catch((error) => {
                throw new CustomError(`Repository lever Error: CabineRepository: getCabineById: ${error.message}`, 500)
            })
        if (!cabine) {
            throw new CustomError("Cabine não encontrada idCabine=" + idCabine, 404)
        }
        return cabine

    }
    async deleteCabineById(idCabine: number) {
        try {
            await db.query("DELETE FROM cabine WHERE id = $1", [idCabine])
        } catch (error: any) {
            throw new CustomError(`Repository lever Error: CabineRepository deleteByIdSeminovo: ${error.message}`, 500)
        }

    }
}