import { CustomError } from "../../infra/CustoError.js";
import db from "../../infra/database.js";
import { Passageiros } from "../../types/charter/Passageiros.js";

export class PassageirosRepository {
    async insertPassageiros(passageiros: Passageiros) {
        const idPassageiros = await db.one("INSERT INTO passageiros (passageiros, passageiros_pernoite, tripulacao) VALUES ($1, $2, $3) RETURNING id", [passageiros.passageiros, passageiros.passageirosPernoite, passageiros.tripulacao]).catch((error) => {
            throw new CustomError(`Repository lever Error: PassageirosRepository insertPassageiros:  ${error}`, 500)
        })
        return idPassageiros.id
    }

    async updatePassageiros(passageiros: Passageiros) {
         await db.none("UPDATE passageiros SET passageiros=$1, passageiros_pernoite=$2, tripulacao=$3 WHERE id=$4", [passageiros.passageiros, passageiros.passageirosPernoite, passageiros.tripulacao, passageiros.id]).catch((error) => {
            throw new CustomError(`Repository lever Error: PassageirosRepository insertPassageiros:  ${error}`, 500)
        })
    }
}