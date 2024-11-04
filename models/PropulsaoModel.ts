import { PropulsaoDto } from "../dto/PropulsaoDto.ts"
import { CustomError } from "../infra/CustoError.ts"
import { PropulsaoRepository } from "../repository/PropulsaoRepository.ts"

export class PropulsaoModel {

    propulsaolDTOFactory(opcao:string, id?: number) {
        const propulsaoDTO = new PropulsaoDto(opcao, id)
        return propulsaoDTO
    }

    async getIdPropulsaoByName(opcao: string, propulsaoRepository: PropulsaoRepository): Promise<number> {
        const { id } = await propulsaoRepository.getIdPropulsaoByName(opcao)
        if (typeof id != "number") {
            throw new CustomError("Tipo de propulsão não encontrado", 404)
        }
        return id
    }
}