import { LocalEmbarqueRepository } from "../../repository/charter/LocalEmbarqueRepository.js";
import { MoedaRepository } from "../../repository/MoedaRepository.js";
import { PrecoRepository } from "../../repository/PrecoRepository.js";
import { LocalEmbarqueInput, LocalEmbarqueOutput } from "../../types/charter/LocalEmbarque.js";
import { converterPrecoBrasilParaEUA, converterPrecoEUAParaBrasil } from "../../util/transformationUtil.js";

export class LocalEmbarqueModel {
    async getLocaisByIdPasseio(idPasseio: number, localEmbarqueRepository: LocalEmbarqueRepository) {
        const locaisEmbarqueDb = await localEmbarqueRepository.getLocaisByIdPasseio(idPasseio)
        const locaisEmbarqueArray = locaisEmbarqueDb.map((item): LocalEmbarqueOutput => {
            const precoTaxaExtra = item.taxa_extra_valor != null ?
                {
                    valor: converterPrecoEUAParaBrasil(item.taxa_extra_valor) ,
                    moeda: item.taxa_extra_moeda
                }
                : null

            const localEmbarque: LocalEmbarqueOutput = {
                id: item.id,
                idPasseio: item.id_passeio,
                nomeLocal: item.nome_local,
                pontoEncontro: item.ponto_encontro,
                preco: precoTaxaExtra
            }
            return localEmbarque
        })
        return locaisEmbarqueArray
    }
    async postLocaisAlternativos(idPasseio: number, localEmbarqueArray: LocalEmbarqueInput[], localEmbarqueRepository: LocalEmbarqueRepository, precoRepository:PrecoRepository, moedaRepository: MoedaRepository){
        for (let i = 0; i < localEmbarqueArray.length; i++) {
            let precoId = null
            if(!!localEmbarqueArray[i].preco){
                const valorPreco = converterPrecoBrasilParaEUA(localEmbarqueArray[i].preco!.valor)
                const idMoeda = await moedaRepository.getIdMoedaBySimbolo(localEmbarqueArray[i].preco!.moeda)
                precoId = await precoRepository.insertPreco(valorPreco, idMoeda.id)
            }
            localEmbarqueRepository.postLocalEmbarqueAleternativo(idPasseio,false, localEmbarqueArray[i], precoId.id)
        }
        
    }
}