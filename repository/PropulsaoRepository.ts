import db from "../infra/database.ts";

export class PropulsaoRepository {
   async getIdPropulsaoByName(opcao:string){
        const result = await db.oneOrNone("SELECT id FROM propulsao WHERE opcao = $1",[opcao])
        return result
    }
}