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
LEFT JOIN preco ON le.id_preco_taxa_extra = preco.id
LEFT JOIN moeda ON preco.id_moeda = moeda.id
WHERE le.id_passeio = 1 AND principal = false;
            `, [idPasseio])
            .catch((error) => {
                throw new CustomError(`Repository lever Error: LocalEmbarqueRepository getLocaisByIdPasseio: ${error}`, 500)
            });
        if (result.length == 0) {
            throw new CustomError(`Não foram encontrados locais de embarque para o passeio`, 404)
        }
        return result
    }

    async postLocalEmbarquePrincipal(idPasseio:number, principal:boolean, local: LocalEmbarqueInput){
        console.log(local)
        db.query("INSERT INTO local_embarque (id_passeio, nome_local, ponto_encontro, id_preco_taxa_extra, principal) VALUES ($1,$2,$3,$4,$5)", [idPasseio, local.nomeLocal, local.pontoEncontro, local.preco?.id, principal])
    }

    async postLocalEmbarqueAleternativo(idPasseio: number, principal: boolean, local: LocalEmbarqueInput, precoId: number) {
        console.log(local)
        db.query("INSERT INTO local_embarque (id_passeio, nome_local, ponto_encontro, id_preco_taxa_extra, principal) VALUES ($1,$2,$3,$4,$5)", [idPasseio, local.nomeLocal, local.pontoEncontro, precoId, principal])
    }
}