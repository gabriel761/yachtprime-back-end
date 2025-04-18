import { CustomError } from "../../infra/CustoError.js";
import db from "../../infra/database.js";
import { TaxaChurrascoInput } from "../../types/charter/TaxaChurrasco.js";

export class TaxaChurrascoRepository {
    async insertTaxaChurrasco(mensagem: string, idPrecoChurrasco: number) {
      const idTaxaChurrasco = await  db.one("INSERT INTO taxa_churrasco (id_preco, mensagem) VALUES ($1, $2) RETURNING id", [idPrecoChurrasco, mensagem]).catch((error) => {
            throw new CustomError(`Repository lever Error: TaxaChurrascoRepository insertTaxaChurrasco: ${error}`, 500)
        });
        return idTaxaChurrasco.id
    }

    async updateTaxaChurrasco(mensagem: string, idTaxaChurrasco: number | undefined) {
         await db.query("UPDATE taxa_churrasco SET mensagem=$1 WHERE id=$2", [mensagem, idTaxaChurrasco]).catch((error) => {
            throw new CustomError(`Repository lever Error: TaxaChurrascoRepository insertTaxaChurrasco: ${error}`, 500)
        });
    }
}