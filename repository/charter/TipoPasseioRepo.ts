import { CustomError } from "../../infra/CustoError.js";
import db from "../../infra/database.js";

export class TipoPasseioRepository {
    async getIdTipoPasseioByString(tipoPasseio: string) {
        const result = await db.one("SELECT id FROM tipo_passeio WHERE opcao = $1", [tipoPasseio]).catch((error) => {
            throw new CustomError(`Repository level error: TipoPasseioRepository:getIdTipoPasseioByString: ${error.message}`, 500)
        })
        
        return result.id
    }
}