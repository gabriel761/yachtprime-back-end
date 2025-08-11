import { CidadeRepository } from "../../repository/charter/CidadeRepository.js";

export class CidadeModel{

    async getCidades(cidadeRepository: CidadeRepository) {
        const cidades = cidadeRepository.getCidades()
        return cidades
    }

    async getIdCidadeByString(cidade: string, cidadeRepository: CidadeRepository){
        const idCidade = await cidadeRepository.getIdCidadeByString(cidade)
        return idCidade
    }

}