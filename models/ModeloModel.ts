
import { CustomError } from "../infra/CustoError.js"
import { ModeloRepository } from "../repository/ModeloRepository.js"

export class ModeloModel {

    

    async getIdModeloByName(opcao: string, modeloRepository: ModeloRepository): Promise<number> {
        const { id } = await modeloRepository.getIdModeloByName(opcao)
        if (typeof id != "number") {
            throw new CustomError("Modelo de barco não encontrado", 404)
        }
        return id
    }

    async listModelo(modeloRepository: ModeloRepository) {
        const result = await modeloRepository.listModelo()
        return result
    }
}