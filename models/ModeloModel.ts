import { ModeloDto } from "../dto/ModeloDto.ts"
import { CustomError } from "../infra/CustoError.ts"
import { ModeloRepository } from "../repository/ModeloRepository.ts"

export class ModeloModel {

    modeloDTOFactory(modelo: string, marca?:string, id?: number) {
        const modeloDTO = new ModeloDto(modelo, marca, id)
        return modeloDTO
    }

    async getIdModeloByName(opcao: string, modeloRepository: ModeloRepository): Promise<number> {
        const { id } = await modeloRepository.getIdModeloByName(opcao)
        if (typeof id != "number") {
            throw new CustomError("Modelo de barco não encontrado", 404)
        }
        return id
    }
}