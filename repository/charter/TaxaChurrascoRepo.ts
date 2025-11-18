import { CustomError } from "../../infra/CustoError.js";
import db from "../../infra/database.js";
import { TaxaChurrascoDatabase, TaxaChurrascoInput } from "../../types/charter/TaxaChurrasco.js";

export class TaxaChurrascoRepository {
    async getTaxaChurrascoById(idTaxaChurrasco: number):Promise<TaxaChurrascoDatabase>{
       const result = await db.one("SELECT * FROM taxa_churrasco WHERE id=$1",[idTaxaChurrasco]).catch((error) => {
            throw new CustomError(`Repository level Error: TaxaChurrascoRepository getTaxaChurrasco: ${error}`, 500)
        });
        if(!result){
            throw new CustomError(`Repository level Error: TaxaChurrascoRepository getTaxaChurrasco: Taxa churrasco não encontrada`, 500)
        }
        return result
    }

    async insertTaxaChurrasco(mensagem: string, idPrecoChurrasco: number) {
      const idTaxaChurrasco = await  db.one("INSERT INTO taxa_churrasco (id_preco, mensagem) VALUES ($1, $2) RETURNING id", [idPrecoChurrasco, mensagem]).catch((error) => {
            throw new CustomError(`Repository level Error: TaxaChurrascoRepository insertTaxaChurrasco: ${error}`, 500)
        });
        return idTaxaChurrasco.id
    }

    async updateTaxaChurrasco(mensagem: string, idTaxaChurrasco: number | undefined) {
         await db.query("UPDATE taxa_churrasco SET mensagem=$1 WHERE id=$2", [mensagem, idTaxaChurrasco]).catch((error) => {
            throw new CustomError(`Repository level Error: TaxaChurrascoRepository insertTaxaChurrasco: ${error}`, 500)
        });
    }

    async deleteTaxaChurrasco(idTaxaChurrasco: number){
        db.query("DELETE FROM taxa_churrasco WHERE id=$1", [idTaxaChurrasco]).catch((error) => {
            throw new CustomError(`Repository level Error: TaxaChurrascoRepository deleteTaxaChurrasco: ${error}`, 500)
        });
    }
}