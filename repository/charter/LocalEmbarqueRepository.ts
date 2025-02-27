import { CustomError } from "../../infra/CustoError.js";
import db from "../../infra/database.js";
import { LocalEmbarqueDb, LocalEmbarqueInput } from "../../types/charter/LocalEmbarque.js";

export class LocalEmbarqueRepository {
    async getLocaisByIdPasseio(idPasseio: number): Promise<LocalEmbarqueDb[]> {
        const result = await db.query(`
            SELECT  
                le.id,
                le.id_passeio,
                le.nome_local,
                le.ponto_encontro,
                preco.valor AS taxa_extra_valor,
                moeda.simbolo AS taxa_extra_moeda

                FROM local_embarque le
                JOIN preco ON le.id_preco_taxa_extra = preco.id
                JOIN moeda ON preco.id_moeda = moeda.id

            WHERE id_passeio = 1 AND principal = false
            `, [idPasseio])
            .catch((error) => {
                throw new CustomError(`Repository lever Error: HorarioRepository getHorarioRepositoryByIdPasseio: ${error}`, 500)
            });
        if (result.length == 0) {
            throw new CustomError(`Não foram encontrados horários disponíveis para o passeio`, 404)
        }
        return result
    }

    async postLocalEmbarquePrincipal(localPrincipal: LocalEmbarqueInput){
        db.query("INSERT INTO local_embarque (idPasseio, nome_local, ponto_encontro, id_preco_taxa, principal)")
    }
}