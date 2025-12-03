import { RoteiroRepository } from "../../repository/charter/RoteiroRepository.js";
import { MoedaRepository } from "../../repository/MoedaRepository.js";
import { PrecoRepository } from "../../repository/PrecoRepository.js";
import { RoteiroDataBase, RoteiroInput } from "../../types/charter/Roteiro.js";
import { converterPrecoBrasilParaEUA, converterPrecoEUAParaBrasil } from "../../util/transformationUtil.js";
import { RoteiroInputVO } from "../../value_object/input/charter/RoteiroInputVO.js";
import { PrecoInputVO } from "../../value_object/input/PrecoInputVO.js";
import { RoteiroOutputVO } from "../../value_object/output/charter/RoteiroOutputVO.js";
import { PrecoOutputVO } from "../../value_object/output/PrecoOutputVO.js";
import { PrecoModel } from "../PrecoModel.js";

export class RoteiroModel {
  async getRoteirosByIdCharter(idCharter: number, roteiroRepository: RoteiroRepository, roteiroOutputVO: RoteiroOutputVO, precoOutputVO: PrecoOutputVO) {
    const roteirosDB = await roteiroRepository.getRoteirosByIdCharter(idCharter)
    const roteirosArray = roteirosDB.map((roteiro) => {
      roteiroOutputVO.setNome(roteiro.nome)
      const valorConvertido = converterPrecoEUAParaBrasil(roteiro.preco_valor)
      precoOutputVO.setValor(valorConvertido)
      precoOutputVO.setMoeda(roteiro.preco_moeda)
      const precoTratado = precoOutputVO.extractData()

      roteiroOutputVO.setId(roteiro.id)
      roteiroOutputVO.setNome(roteiro.nome)
      roteiroOutputVO.setDescricao(roteiro.descricao)
      roteiroOutputVO.setPreco(precoTratado)
      roteiroOutputVO.setDetalhesPagamento(roteiro.detalhes_pagamento)
      return roteiroOutputVO.extractData()
    })
    return roteirosArray
  }

  validateRoteiro(roteiroArray: RoteiroInput[], roteiroInputVO: RoteiroInputVO) {
    const roteirosArray = roteiroArray.map((roteiro) => {
      roteiroInputVO.setNome(roteiro.nome)
      roteiro.preco.valor = converterPrecoBrasilParaEUA(roteiro.preco.valor)
      roteiroInputVO.setNome(roteiro.nome)
      roteiroInputVO.setDescricao(roteiro.descricao)
      roteiroInputVO.setPreco(roteiro.preco)
      roteiroInputVO.setDetalhesPagamento(roteiro.detalhesPagamento)
      return roteiroInputVO.extractData()
    })
    return roteirosArray
  }

  async saveRoteiro(idCharter: number, roteiroArray: RoteiroInput[], roteiroRepository: RoteiroRepository, precoModel: PrecoModel) {
    for (let i = 0; i < roteiroArray.length; i++) {
      const idPreco = await precoModel.savePreco(roteiroArray[i].preco, new PrecoRepository(), new MoedaRepository())
      await roteiroRepository.insertRoteiro(roteiroArray[i].nome, roteiroArray[i].descricao, idPreco, roteiroArray[i].detalhesPagamento, idCharter)
    }
  }

  async deleteAllRoteirosFromCharter(idCharter: number, roteiroRepository: RoteiroRepository, precoRepository: PrecoRepository) {
    const roteirosCharter = await roteiroRepository.getRoteirosByIdCharter(idCharter)
    const roteirosCharterPromises = roteirosCharter.map(async (roteiro: RoteiroDataBase) => {
      await roteiroRepository.deleteRoteiroById(roteiro.id)
      await precoRepository.deletePrecoById(roteiro.preco_id)
    })
    await Promise.all(roteirosCharterPromises);
  }
}