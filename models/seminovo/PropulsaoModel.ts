
import { CustomError } from "../../infra/CustoError.js"
import { PropulsaoRepository } from "../../repository/seminovo/PropulsaoRepository.js"

export class PropulsaoModel {

   

    async getIdPropulsaoByName(opcao: string, propulsaoRepository: PropulsaoRepository): Promise<number> {
        const { id } = await propulsaoRepository.getIdPropulsaoByName(opcao)
        if (typeof id != "number") {
            throw new CustomError("Tipo de propulsão não encontrado", 404)
        }
        return id
    }

    async listPropulsao(propulsaoRepository: PropulsaoRepository) {
        const result = await propulsaoRepository.listPropulsao()
        return result
    }
}