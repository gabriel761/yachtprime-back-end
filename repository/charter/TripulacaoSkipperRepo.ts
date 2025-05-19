import { CustomError } from "../../infra/CustoError.js";
import db from "../../infra/database.js";

export class TripulacaoSkipperRepository {
    async getIdTripulacaoSkipperByString(tripulacaoSkipper: string) {
       const result = await db.one("SELECT id FROM tripulacao_skipper WHERE opcao = $1", [tripulacaoSkipper]).catch((error) => {
            throw new CustomError(`Repository level error: TripulacaoSkipperRepository:getIdTripulacaoSkipperByString: ${error.message}`, 500)
        })
        return result.id
    }

    async listTripulacaoSkipper() {
        const result = await db.query("SELECT * FROM tripulacao_skipper").catch((error) => {
            throw new CustomError(`Repository level error: TripulacaoSkipperRepository:listTripulacaoSkipper: ${error.message}`, 500)
        })
        return result
    }
}