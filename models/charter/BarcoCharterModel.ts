import { BarcoCharterRepository } from "../../repository/charter/BarcoCharterRepository.js";
import { CidadeRepository } from "../../repository/charter/CidadeRepository.js";
import { ModeloRepository } from "../../repository/ModeloRepository.js";
import { BarcoCharterDatabase, BarcoCharterFilters, BarcoCharterInput, BarcoCharterInputWithId, BarcoCharterListDashboard, BarcoCharterListDashboardDatabase, BarcoCharterListFrontEnd, BarcoCharterOutput, BarcoCharterRelated } from "../../types/charter/BarcoCharter.js";
import { Condicao } from "../../types/charter/Condicoes.js";
import { ItemCharter } from "../../types/charter/ItemCharter.js";
import { RoteiroOutput } from "../../types/charter/Roteiro.js";
import { Imagem } from "../../types/Imagem.js";
import { BarcoSeminovoFilters } from "../../types/seminovo/BarcoSeminovo.js";
import { converterPrecoBrasilParaEUA, converterPrecoEUAParaBrasil } from "../../util/transformationUtil.js";
import { BarcoCharterInputVO } from "../../value_object/input/charter/BarcoCharterInputVO.js";
import { PassageirosInputVO } from "../../value_object/input/charter/PassageirosInputVO.js";
import { TaxaChurrascoInputVO } from "../../value_object/input/charter/TaxaChurrascoInputVO.js";
import { ModeloInputVO } from "../../value_object/input/ModeloInputVO.js";
import { PrecoInputVO } from "../../value_object/input/PrecoInputVO.js";
import { BarcoCharterOutputVO } from "../../value_object/output/charter/BarcoCharterOutputVO.js";
import { ConsumoCombustivelOutputVO } from "../../value_object/output/charter/ConsumoCombustivelOutputVO.js";
import { PassageirosOutputVO } from "../../value_object/output/charter/PassageirosOutputVO.js";
import { TaxaChurrascoOutputVO } from "../../value_object/output/charter/TaxaChurrascoOutputVO.js";
import { ModeloOutputVO } from "../../value_object/output/ModeloOutputVO.js";
import { PrecoOutputVO } from "../../value_object/output/PrecoOutputVO.js";
import { ModeloModel } from "../ModeloModel.js";
import { CidadeModel } from "./CidadeModel.js";

export class BarcoCharterModel {
    getBarcoCharter(id: number, barcoCharterRepository: BarcoCharterRepository): Promise<BarcoCharterDatabase> {
        return barcoCharterRepository.getBarcoCharter(id)
    }

    async getIdsByIdCharter(idChater: number, barcoCharterRepository: BarcoCharterRepository) {
        const result = await barcoCharterRepository.getIdsByIdCharter(idChater)
        const structuredResult = {
            idPrecoTaxaChurrasco: result.taxa_churrasco_id_preco,
            idPrecoBarco: result.id_preco,
            idPrecoHoraExtra: result.id_preco_hora_extra,
            idPrecoAluguelLancha: result.id_preco_aluguel_lancha,
            idPassageiros: result.id_passageiros,
            idPetFriendly: result.id_pet_friendly,
            idConsumo: result.id_consumo,
            idTipoPasseio: result.id_tipo_passeio,
            idTaxaChurrasco: result.id_taxa_churrasco,
            idTripulacaoSkipper: result.id_tripulacao_skipper
        }
        return structuredResult
    }

    async listBarcoCharterDashboard(barcoCharterRepository: BarcoCharterRepository){
        const barcoCharterListDatabase = await barcoCharterRepository.listBarcoCharterDashboard()
        const barcoCharterList = barcoCharterListDatabase.map((item) => {
            const barcoCharter: BarcoCharterListDashboard = {
                id: item.id,
                imagem: item.imagem,
                nome: item.nome,
                modelo: item.modelo,
                tamanho: item.tamanho,
                preco: {
                    moeda: item.preco_moeda,
                    valor: converterPrecoEUAParaBrasil(item.preco_valor)
                },
                passageiros: item.passageiros
            }
            return barcoCharter
        })
        return barcoCharterList
    }

    async listBarcoCharterFrontEnd(filters: BarcoCharterFilters, barcoCharterRepository: BarcoCharterRepository) {
        const barcoCharterListDatabase = await barcoCharterRepository.listBarcoCharterFrontEnd(filters)
        const barcoCharterList = barcoCharterListDatabase.map((item) => {
            const barcoCharter: BarcoCharterListFrontEnd = {
                id: item.id,
                imagem: item.imagem,
                modelo: item.modelo,
                tamanho: item.tamanho,
                cidade: item.cidade,
                pernoite: !!item.passageiros_pernoite,
                tripulacaoSkipper: item.tripulacao_skipper, 
                preco: {
                    moeda: item.preco_moeda,
                    valor: converterPrecoEUAParaBrasil(item.preco_valor)
                },
                passageiros: item.passageiros
            }
            return barcoCharter
        })
        if (!filters.page) {
            return {
                data: barcoCharterList
            }
        }
        return {
            data: barcoCharterList,
            totalPages: await barcoCharterRepository.getTotalPagesForPagination(filters)
        }
    }

    async getRelatedCharters(idCharter: number, barcoCharterRepository: BarcoCharterRepository){
        const result =  await barcoCharterRepository.getRelatedCharters(idCharter)
        const charterRelated = result.map((charter): BarcoCharterRelated => {
            return {
                id: charter.id,
                preco: {
                    valor: charter.preco_valor,
                    moeda: charter.preco_moeda
                },
                modelo: charter.modelo,
                imagem: charter.imagem
            }
        })
        return charterRelated
    }

    async saveBarcoCharter(barcoCharter: BarcoCharterInput, barcoCharterRepository: BarcoCharterRepository, modeloModel: ModeloModel, idPrecoBarco: number, idPassageiros: number, idCidade: number, idPetFriendly: number, idConsumo: number, idTipoPasseio: number, idTripulacaoSkipper: number, idPrecoHoraExtra: number, idPrecoAluguelLancha: number, idTaxaChurrasco: number) {
        const idModel = await modeloModel.getIdModeloByName(barcoCharter.modelo, new ModeloRepository())
        const idBarcoCharter = await barcoCharterRepository.insertBarcoCharter(barcoCharter, idModel, idPrecoBarco, idPassageiros,
            idCidade, idPetFriendly, idConsumo,idTipoPasseio,  idTripulacaoSkipper, idPrecoHoraExtra, idPrecoAluguelLancha, idTaxaChurrasco)
        return idBarcoCharter
    }

    async updateBarcoCharter(barcoCharter: BarcoCharterInputWithId, barcoCharterRepository: BarcoCharterRepository, modeloModel: ModeloModel, cidadeModel: CidadeModel, idConsumo: number) {
        
        const idModel = await modeloModel.getIdModeloByName(barcoCharter.modelo, new ModeloRepository())
        const idCidade = await cidadeModel.getIdCidadeByString(barcoCharter.cidade, new CidadeRepository())
        await barcoCharterRepository.updateBarcoCharter(barcoCharter, idModel, idCidade)
       
    }

    async deleteBarcoCharterModel(idBarcoCharter: number, barcoCharterRepository: BarcoCharterRepository){
      await  barcoCharterRepository.deleteBarcoCharter(idBarcoCharter)
    }

    validateBarcoCharter(barcoCharter: BarcoCharterInput, barcoCharterVO: BarcoCharterInputVO, precoVO: PrecoInputVO, passageirosVO: PassageirosInputVO, modeloVO:ModeloInputVO, taxaChurrascoVO: TaxaChurrascoInputVO) {

        const precoBarcoValor = converterPrecoBrasilParaEUA(barcoCharter.preco.valor)
        precoVO.setValor(precoBarcoValor)
        precoVO.setMoeda(barcoCharter.preco.moeda)

        const precoBarco = precoVO.extractData()

        passageirosVO.setPassageiros(barcoCharter.passageiros.passageiros)
        passageirosVO.setPassageirosPernoite(barcoCharter.passageiros.passageirosPernoite)
        passageirosVO.setTripulacao(barcoCharter.passageiros.tripulacao)
        const passageiros = passageirosVO.extractData()

        // modeloVO.setId(barcoCharter.modelo.id)
        // modeloVO.setMarca(barcoCharter.modelo.marca)
        // modeloVO.setModelo(barcoCharter.modelo.modelo)
        // const modelo = modeloVO.extractData()

        const precoChurracsoValor = converterPrecoBrasilParaEUA(barcoCharter.taxaChurrasco.preco.valor)
        precoVO.setValor(precoChurracsoValor)
        precoVO.setMoeda(barcoCharter.taxaChurrasco.preco.moeda)
        taxaChurrascoVO.setPreco(precoVO.extractData())
        taxaChurrascoVO.setMensagem(barcoCharter.taxaChurrasco.mensagem)
        const taxaChurrasco = taxaChurrascoVO.extractData()

        const precoHoraExtraValor = converterPrecoBrasilParaEUA(barcoCharter.horaExtra.valor)
        precoVO.setValor(precoHoraExtraValor)
        precoVO.setMoeda(barcoCharter.horaExtra.moeda)
        const precoHoraExtra = precoVO.extractData()

        const precoAluguelLanchaValor = converterPrecoBrasilParaEUA(barcoCharter.aluguelLancha.valor)
        precoVO.setValor(precoAluguelLanchaValor)
        precoVO.setMoeda(barcoCharter.aluguelLancha.moeda)
        const precoAluguelLancha = precoVO.extractData()

        barcoCharterVO.setModelo(barcoCharter.modelo)
        barcoCharterVO.setNome(barcoCharter.nome)
        barcoCharterVO.setAno(barcoCharter.ano)
        barcoCharterVO.setTamanho(barcoCharter.tamanho)
        barcoCharterVO.setCidade(barcoCharter.cidade)
        barcoCharterVO.setPreco(precoBarco)
        barcoCharterVO.setPassageiros(passageiros)
        barcoCharterVO.setPernoite(barcoCharter.passageiros.passageirosPernoite != null)
        barcoCharterVO.setPetFriendly(barcoCharter.petFriendly)
        barcoCharterVO.setItensDisponiveis(barcoCharter.itensDisponiveis)
        barcoCharterVO.setImagens(barcoCharter.imagens)
        barcoCharterVO.setConsumoCombustivel(barcoCharter.consumoCombustivel)
        barcoCharterVO.setHoraExtra(precoHoraExtra)
        barcoCharterVO.setAluguelLancha(precoAluguelLancha)
        barcoCharterVO.setTaxaChurrasco(taxaChurrasco)
        barcoCharterVO.setVideoPromocional(barcoCharter.videoPromocional)
        const barcoCharterValidated = barcoCharterVO.extractData()
        return barcoCharterValidated
    }

    async validateBarcoCharterWithId(barcoCharter: BarcoCharterInputWithId, barcoCharterVO: BarcoCharterInputVO, precoVO: PrecoInputVO, passageirosVO: PassageirosInputVO, modeloVO:ModeloInputVO, taxaChurrascoVO: TaxaChurrascoInputVO) {

        const { idPrecoTaxaChurrasco, idPrecoBarco, idPassageiros, idPrecoHoraExtra, idPrecoAluguelLancha, idTaxaChurrasco, idConsumo} = await this.getIdsByIdCharter(barcoCharter.id, new BarcoCharterRepository())

        

        const precoBarcoValor = converterPrecoBrasilParaEUA(barcoCharter.preco.valor)
        precoVO.setValor(precoBarcoValor)
        precoVO.setMoeda(barcoCharter.preco.moeda)
        precoVO.setId(idPrecoBarco)
        const precoBarco = precoVO.extractData();

        passageirosVO.setPassageiros(barcoCharter.passageiros.passageiros)
        passageirosVO.setPassageirosPernoite(barcoCharter.passageiros.passageirosPernoite)
        passageirosVO.setTripulacao(barcoCharter.passageiros.tripulacao)
        passageirosVO.setId(idPassageiros)
        const passageiros = passageirosVO.extractData()

        // modeloVO.setId(barcoCharter.modelo.id)
        // modeloVO.setMarca(barcoCharter.modelo.marca)
        // modeloVO.setModelo(barcoCharter.modelo.modelo)
        // const modelo = modeloVO.extractData()

        const precoChurrascoValor = converterPrecoBrasilParaEUA(barcoCharter.taxaChurrasco.preco.valor)
        precoVO.setId(idPrecoTaxaChurrasco)
        precoVO.setValor(precoChurrascoValor)
        precoVO.setMoeda(barcoCharter.taxaChurrasco.preco.moeda)
        taxaChurrascoVO.setPreco(precoVO.extractData())
        taxaChurrascoVO.setMensagem(barcoCharter.taxaChurrasco.mensagem)
        taxaChurrascoVO.setId(idTaxaChurrasco)
        const taxaChurrasco = taxaChurrascoVO.extractData()

        const precoHoraExtraValor = converterPrecoBrasilParaEUA(barcoCharter.horaExtra.valor)
        precoVO.setValor(precoHoraExtraValor)
        precoVO.setMoeda(barcoCharter.horaExtra.moeda)
        precoVO.setId(idPrecoHoraExtra)
        const precoHoraExtra = precoVO.extractData()

        const precoAluguelLanchaValor = converterPrecoBrasilParaEUA(barcoCharter.aluguelLancha.valor)
        precoVO.setValor(precoAluguelLanchaValor)
        precoVO.setMoeda(barcoCharter.aluguelLancha.moeda)
        precoVO.setId(idPrecoAluguelLancha)
        const precoAluguelLancha = precoVO.extractData()


        barcoCharterVO.setId(barcoCharter.id)
        barcoCharterVO.setModelo(barcoCharter.modelo)
        barcoCharterVO.setNome(barcoCharter.nome)
        barcoCharterVO.setAno(barcoCharter.ano)
        barcoCharterVO.setTamanho(barcoCharter.tamanho)
        barcoCharterVO.setCidade(barcoCharter.cidade)
        barcoCharterVO.setPreco(precoBarco)
        barcoCharterVO.setPassageiros(passageiros)
        barcoCharterVO.setPernoite(barcoCharter.passageiros.passageirosPernoite != null)
        barcoCharterVO.setPetFriendly(barcoCharter.petFriendly)
        barcoCharterVO.setItensDisponiveis(barcoCharter.itensDisponiveis)
        barcoCharterVO.setImagens(barcoCharter.imagens)
        barcoCharterVO.setRoteiros(barcoCharter.roteiros)
        barcoCharterVO.setConsumoCombustivel(barcoCharter.consumoCombustivel)
        barcoCharterVO.setHoraExtra(precoHoraExtra)
        barcoCharterVO.setAluguelLancha(precoAluguelLancha)
        barcoCharterVO.setTaxaChurrasco(taxaChurrasco)
        barcoCharterVO.setTripulacaoSkipper(barcoCharter.tripulacaoSkipper)
        barcoCharterVO.setTipoPasseio(barcoCharter.tipoPasseio)
        barcoCharterVO.setVideoPromocional(barcoCharter.videoPromocional)
        const barcoCharterValidated = barcoCharterVO.extractData()
        return {barcoCharterValidated, idConsumo, idTaxaChurrasco}
    }

    buildBarcoCharterOutputObject(barcoCharterDatabase: BarcoCharterDatabase, barcoCharterVO: BarcoCharterOutputVO, precoVO: PrecoOutputVO, passageirosVO: PassageirosOutputVO, modeloVO: ModeloOutputVO, consumoCombustivelOutputVO: ConsumoCombustivelOutputVO, taxaChurrascoVO: TaxaChurrascoOutputVO, itensCharterArray: ItemCharter[], imagensArray: Imagem[], roteirosArray: RoteiroOutput[], condicoesArray: Condicao[]): BarcoCharterOutput {
        const precoBarcoValor = converterPrecoEUAParaBrasil(barcoCharterDatabase.preco_valor)
        precoVO.setValor(precoBarcoValor)
        precoVO.setMoeda(barcoCharterDatabase.preco_moeda)
        const precoBarco = precoVO.extractData()

        passageirosVO.setPassageiros(barcoCharterDatabase.passageiros_passageiros)
        passageirosVO.setPassageirosPernoite(barcoCharterDatabase.passageiros_pernoite)
        passageirosVO.setTripulacao(barcoCharterDatabase.passageiros_tripulacao)
        const passageiros = passageirosVO.extractData()

        // modeloVO.setId(barcoCharterDatabase.modelo_id)
        // modeloVO.setMarca(barcoCharterDatabase.modelo_marca)
        // modeloVO.setModelo(barcoCharterDatabase.modelo_modelo)
        // const modelo = modeloVO.extractData()

        const tipoCombustivel = { 
            id: barcoCharterDatabase.consumo_combustivel_tipo_combustivel_id , 
            opcao: barcoCharterDatabase.consumo_combustivel_tipo_combustivel 
        }
        consumoCombustivelOutputVO.setLitrosHora(barcoCharterDatabase.consumo_combustivel_litros)
        consumoCombustivelOutputVO.setTipoCombustivel(tipoCombustivel)
        const precoCombustivelValor = converterPrecoEUAParaBrasil(barcoCharterDatabase.consumo_combustivel_valor)
        precoVO.setValor(precoCombustivelValor)
        precoVO.setMoeda(barcoCharterDatabase.comsumo_combustivel_moeda)
        consumoCombustivelOutputVO.setPrecoHora(precoVO.extractData())
        const consumoCombustivel = consumoCombustivelOutputVO.extractData()

        const precoChurracsoValor = converterPrecoEUAParaBrasil(barcoCharterDatabase.taxa_churrasco_valor)
        precoVO.setValor(precoChurracsoValor)
        precoVO.setMoeda(barcoCharterDatabase.taxa_churrasco_moeda)
        taxaChurrascoVO.setPreco(precoVO.extractData())
        taxaChurrascoVO.setMensagem(barcoCharterDatabase.taxa_churrasco_mensagem)
        const taxaChurrasco = taxaChurrascoVO.extractData()

        const precoHoraExtraValor = converterPrecoEUAParaBrasil(barcoCharterDatabase.preco_hora_extra_valor)
        precoVO.setValor(precoHoraExtraValor)
        precoVO.setMoeda(barcoCharterDatabase.preco_hora_extra_moeda)
        const precoHoraExtra = precoVO.extractData()

        const precoAluguelLanchaValor = converterPrecoEUAParaBrasil(barcoCharterDatabase.preco_aluguel_lancha_valor)
        precoVO.setValor(precoAluguelLanchaValor)
        precoVO.setMoeda(barcoCharterDatabase.preco_aluguel_lancha_moeda)
        const precoAluguelLancha = precoVO.extractData()

        barcoCharterVO.setId(barcoCharterDatabase.id)
        barcoCharterVO.setModelo(barcoCharterDatabase.modelo_modelo)
        barcoCharterVO.setNome(barcoCharterDatabase.nome)
        barcoCharterVO.setAno(barcoCharterDatabase.ano)
        barcoCharterVO.setTamanho(barcoCharterDatabase.tamanho)
        barcoCharterVO.setCidade(barcoCharterDatabase.cidade)
        barcoCharterVO.setPreco(precoBarco)
        barcoCharterVO.setPassageiros(passageiros)
        barcoCharterVO.setRoteiros(roteirosArray)
        barcoCharterVO.setPernoite(!!barcoCharterDatabase.passageiros_pernoite)
        barcoCharterVO.setPetFriendly({id:barcoCharterDatabase.pet_friendly_id, opcao:barcoCharterDatabase.pet_friendly})
        barcoCharterVO.setItensDisponiveis(itensCharterArray)
        barcoCharterVO.setImagens(imagensArray)
        barcoCharterVO.setTipoPasseio({id:barcoCharterDatabase.tipo_passeio_id, opcao:barcoCharterDatabase.tipo_passeio})
        barcoCharterVO.setTripulacaoSkipper({id:barcoCharterDatabase.tripulacao_skipper_id, opcao:barcoCharterDatabase.tripulacao_skipper})
        barcoCharterVO.setConsumoCombustivel(consumoCombustivel)
        barcoCharterVO.setHoraExtra(precoHoraExtra)
        barcoCharterVO.setAluguelLancha(precoAluguelLancha)
        barcoCharterVO.setCondicao(condicoesArray)
        barcoCharterVO.setTaxaChurrasco(taxaChurrasco)
        barcoCharterVO.setVideoPromocional(barcoCharterDatabase.video_promocional)

        const barcoCharter: BarcoCharterOutput = barcoCharterVO.extractData()
        return barcoCharter
    }
}