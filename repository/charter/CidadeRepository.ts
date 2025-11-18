import { CustomError } from "../../infra/CustoError.js";
import db from "../../infra/database.js";
import { Cidade } from "../../types/charter/Cidade.js";

export class CidadeRepository {
    async getCidades():Promise<Cidade[]>{
        const cidades = db.query(`SELECT * FROM cidade`).catch((error) => {
            throw new CustomError(`Repository level Error: CidadeRepository getCidades:${error}`, 500)
        })

        if(!cidades){
            throw new CustomError(`Repository level Error: CidadeRepository getCidades: Nenhuma cidade encontrada`,404)
        }

        return cidades
        
    }
    async getIdCidadeByString(cidade: string):Promise<number>{
       const idCidade = await db.one(`SELECT id FROM cidade WHERE opcao = $1`, [cidade]).catch((error) => {
            throw new CustomError(`Repository level Error: CidadeRepository getIdCidadeByString:${error}`, 500)
        })

        return idCidade.id
    }
}