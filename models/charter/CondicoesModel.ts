import { CondicoesRepository } from "../../repository/charter/CondicoesRepository.js";
import { Condicao } from "../../types/charter/Condicoes.js";
import { CondicoesVO } from "../../value_object/output/charter/Condicoes.js";

export class CondicoesModel {
    async getCondicoesByIdCharter(idCharter: number, condicoesRepository: CondicoesRepository) {
        const condicoesDb = await condicoesRepository.getCondicoesByIdCharter(idCharter)
        return condicoesDb
    }

    async getCondicoesPadrao(condicoesRepository: CondicoesRepository) {
        const result = await condicoesRepository.getCondicoesPadrao()
        return result
    }

    async postCondicaoPadrao(condicao: Condicao, condicoesRepository: CondicoesRepository) {
        const result = await condicoesRepository.insertCondicaoPadrao(condicao)
        return result
    }

    async updateAllCondicoesPadrao(condicoes: Condicao[], condicoesRepository: CondicoesRepository) {
        await condicoesRepository.deleteAllCondicoesPadrao()
        for (const condicao of condicoes) {
            await condicoesRepository.insertCondicaoPadrao(condicao)
        }
    }


    async saveCondicoes(idCharter: number, condicoes: Condicao[], condicoesRepository: CondicoesRepository) {
        if (!condicoes || condicoes.length === 0) return;

        for (const condicao of condicoes) {
            // Sempre insere uma nova condição na tabela condicoes_charter
            const newCondicaoId = await condicoesRepository.postCondicaoCharter(condicao);
            // Associa a nova condição ao barco
            await condicoesRepository.associateCondicaoCharter(idCharter.toString(), newCondicaoId);
        }
    }

    async updateCondicoes(idCharter: number, condicoes: Condicao[], condicoesRepository: CondicoesRepository) {
        await this.deleteCondicoes(idCharter, condicoesRepository);
        await this.saveCondicoes(idCharter, condicoes, condicoesRepository);
    }

    async deleteCondicoes(idCharter: number, condicoesRepository: CondicoesRepository) {
        await condicoesRepository.deleteCondicoesByCharterId(idCharter);
    }

    validateCondicoes(condicoes: Condicao[], condicoesVO: CondicoesVO) {
        const validatedCondicoes = condicoes.map((condicao) => {
            condicoesVO.setId(condicao.id)
            condicoesVO.setOpcao(condicao.opcao)
            return condicoesVO.extractData()
        })
        return validatedCondicoes
    }
}