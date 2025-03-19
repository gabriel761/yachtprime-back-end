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
}