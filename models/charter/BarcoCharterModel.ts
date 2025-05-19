import { BarcoCharterRepository } from "../../repository/charter/BarcoCharterRepository.js";
import { ModeloRepository } from "../../repository/ModeloRepository.js";
import { BarcoCharterDatabase, BarcoCharterInput, BarcoCharterInputWithId, BarcoCharterOutput } from "../../types/charter/BarcoCharter.js";
import { ItemCharter } from "../../types/charter/ItemCharter.js";
import { RoteiroOutput } from "../../types/charter/Roteiro.js";
import { Imagem } from "../../types/Imagem.js";
import { converterPrecoBrasilParaEUA, converterPrecoEUAParaBrasil } from "../../util/transformationUtil.js";
import { BarcoCharterInputVO } from "../../value_object/input/charter/BarcoCharterInputVO.js";
import { PassageirosInputVO } from "../../value_object/input/charter/PassageirosInputVO.js";
import { TaxaChurrascoInputVO } from "../../value_object/input/charter/TaxaChurrascoInputVO.js";
import { PrecoInputVO } from "../../value_object/input/PrecoInputVO.js";
import { BarcoCharterOutputVO } from "../../value_object/output/charter/BarcoCharterOutputVO.js";
import { ConsumoCombustivelOutputVO } from "../../value_object/output/charter/ConsumoCombustivelOutputVO.js";
import { PassageirosOutputVO } from "../../value_object/output/charter/PassageirosOutputVO.js";
import { TaxaChurrascoOutputVO } from "../../value_object/output/charter/TaxaChurrascoOutputVO.js";
import { PrecoOutputVO } from "../../value_object/output/PrecoOutputVO.js";
import { ModeloModel } from "../ModeloModel.js";

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

    async saveBarcoCharter(barcoCharter: BarcoCharterInput, barcoCharterRepository: BarcoCharterRepository, modeloModel: ModeloModel, idPrecoBarco: number, idPassageiros: number, idPetFriendly: number, idConsumo: number, idTipoPasseio: number, idTripulacaoSkipper: number, idPrecoHoraExtra: number, idPrecoAluguelLancha: number, idTaxaChurrasco: number) {
        const idModel = await modeloModel.getIdModeloByName(barcoCharter.modelo, new ModeloRepository())
        const idBarcoCharter = await barcoCharterRepository.insertBarcoCharter(barcoCharter, idModel, idPrecoBarco, idPassageiros, idPetFriendly, idConsumo,idTipoPasseio,  idTripulacaoSkipper, idPrecoHoraExtra, idPrecoAluguelLancha, idTaxaChurrasco)
        return idBarcoCharter
    }

    async updateBarcoCharter(barcoCharter: BarcoCharterInputWithId, barcoCharterRepository: BarcoCharterRepository, modeloModel: ModeloModel, idConsumo: number) {
        
        const idModel = await modeloModel.getIdModeloByName(barcoCharter.modelo, new ModeloRepository())
        await barcoCharterRepository.updateBarcoCharter(barcoCharter, idModel, barcoCharter.preco.id, barcoCharter.passageiros.id,  idConsumo, barcoCharter.horaExtra.id, barcoCharter.aluguelLancha.id, barcoCharter.taxaChurrasco.id)
       
    }


    validateBarcoCharter(barcoCharter: BarcoCharterInput, barcoCharterVO: BarcoCharterInputVO, precoVO: PrecoInputVO, passageirosVO: PassageirosInputVO, taxaChurrascoVO: TaxaChurrascoInputVO) {

        const precoBarcoValor = converterPrecoBrasilParaEUA(barcoCharter.preco.valor)
        precoVO.setValor(precoBarcoValor)
        precoVO.setMoeda(barcoCharter.preco.moeda)

        const precoBarco = precoVO.extractData()

        passageirosVO.setPassageiros(barcoCharter.passageiros.passageiros)
        passageirosVO.setPassageirosPernoite(barcoCharter.passageiros.passageirosPernoite)
        passageirosVO.setTripulacao(barcoCharter.passageiros.tripulacao)
        const passageiros = passageirosVO.extractData()

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

    async validateBarcoCharterWithId(barcoCharter: BarcoCharterInputWithId, barcoCharterVO: BarcoCharterInputVO, precoVO: PrecoInputVO, passageirosVO: PassageirosInputVO, taxaChurrascoVO: TaxaChurrascoInputVO) {

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

    buildBarcoCharterOutputObject(barcoCharterDatabase: BarcoCharterDatabase, barcoCharterVO: BarcoCharterOutputVO, precoVO: PrecoOutputVO, passageirosVO: PassageirosOutputVO, consumoCombustivelOutputVO: ConsumoCombustivelOutputVO, taxaChurrascoVO: TaxaChurrascoOutputVO, itensCharterArray: ItemCharter[], imagensArray: Imagem[], roteirosArray: RoteiroOutput[]): BarcoCharterOutput {
        const precoBarcoValor = converterPrecoEUAParaBrasil(barcoCharterDatabase.preco_valor)
        precoVO.setValor(precoBarcoValor)
        precoVO.setMoeda(barcoCharterDatabase.preco_moeda)
        const precoBarco = precoVO.extractData()

        passageirosVO.setPassageiros(barcoCharterDatabase.passageiros_passageiros)
        passageirosVO.setPassageirosPernoite(barcoCharterDatabase.passageiros_pernoite)
        passageirosVO.setTripulacao(barcoCharterDatabase.passageiros_tripulacao)
        const passageiros = passageirosVO.extractData()

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
        barcoCharterVO.setTaxaChurrasco(taxaChurrasco)
        barcoCharterVO.setVideoPromocional(barcoCharterDatabase.video_promocional)

        const barcoCharter: BarcoCharterOutput = barcoCharterVO.extractData()
        return barcoCharter
    }
}