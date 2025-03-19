import { BarcoCharterRepository } from "../../repository/charter/BarcoCharterRepository.js";
import { ModeloRepository } from "../../repository/ModeloRepository.js";
import { BarcoCharterDatabase, BarcoCharterInput, BarcoCharterOutput } from "../../types/charter/BarcoCharter.js";
import { ItemCharter } from "../../types/charter/ItemCharter.js";
import { Passageiros } from "../../types/charter/Passageiros.js";
import { PasseioOutput } from "../../types/charter/Passeio.js";
import { Imagem } from "../../types/Imagem.js";
import { PrecoOutput } from "../../types/Preco.js";
import { converterPrecoBrasilParaEUA, converterPrecoEUAParaBrasil } from "../../util/transformationUtil.js";
import { BarcoCharterInputVO } from "../../value_object/input/charter/BarcoSeminovoInputVO.js";
import { PassageirosInputVO } from "../../value_object/input/charter/PassageirosInputVO.js";
import { TaxaChurrascoInputVO } from "../../value_object/input/charter/TaxaChurrascoInputVO.js";
import { PrecoInputVO } from "../../value_object/input/PrecoInputVO.js";
import { BarcoCharterOutputVO } from "../../value_object/output/charter/BarcoSeminovoOutputVO.js";
import { CondicoesVO } from "../../value_object/output/charter/Condicoes.js";
import { ConsumoCombustivelOutputVO } from "../../value_object/output/charter/ConsumoCombustivelOutputVO.js";
import { PassageirosOutputVO } from "../../value_object/output/charter/PassageirosOutputVO.js";
import { TaxaChurrascoOutputVO } from "../../value_object/output/charter/TaxaChurrascoOutputVO.js";
import { PrecoOutputVO } from "../../value_object/output/PrecoOutputVO.js";
import { ModeloModel } from "../ModeloModel.js";

export class BarcoCharterModel {
    getBarcoCharter(id:number,barcoCharterRepository:BarcoCharterRepository):Promise<BarcoCharterDatabase>{
        return barcoCharterRepository.getBarcoCharter(id)
    }

    async saveBarcoCharter(barcoCharter: BarcoCharterInput, barcoCharterRepository: BarcoCharterRepository, modeloModel: ModeloModel, idPreco: number, idPassageiros: number, idPasseio: number, idPetFriendly: number, idConsumo: number, idPrecoHora: number, idPrecoAluguel: number, idTaxaChurrasco: number){
        const idModel = await modeloModel.getIdModeloByName(barcoCharter.modelo, new ModeloRepository())
        const idBarcoCharter = await barcoCharterRepository.insertBarcoCharter(barcoCharter, idModel, idPreco, idPassageiros, idPasseio, idPetFriendly, idConsumo, idPrecoHora, idPrecoAluguel, idTaxaChurrasco)
        return idBarcoCharter
    }

    validateBarchoCharter(barcoCharter: BarcoCharterInput, barcoCharterVO: BarcoCharterInputVO, precoVO: PrecoInputVO, passageirosVO: PassageirosInputVO, taxaChurrascoVO: TaxaChurrascoInputVO){

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
        barcoCharterVO.setPasseio(barcoCharter.passeio)
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


    buildBarcoSeminovoOutputObject(barcoCharterDatabase:BarcoCharterDatabase, barcoCharterVO:BarcoCharterOutputVO, precoVO:PrecoOutputVO, passageirosVO: PassageirosOutputVO, consumoCombustivelOutputVO:ConsumoCombustivelOutputVO, taxaChurrascoVO: TaxaChurrascoOutputVO, passeio:PasseioOutput, itensCharterArray: ItemCharter[], imagensArray: Imagem[] ):BarcoCharterOutput{
        const precoBarcoValor = converterPrecoEUAParaBrasil(barcoCharterDatabase.preco_valor)
        precoVO.setValor(precoBarcoValor)
        precoVO.setMoeda(barcoCharterDatabase.preco_moeda)
        const precoBarco = precoVO.extractData()

        passageirosVO.setPassageiros(barcoCharterDatabase.passageiros_passageiros)
        passageirosVO.setPassageirosPernoite(barcoCharterDatabase.passageiros_pernoite)
        passageirosVO.setTripulacao(barcoCharterDatabase.passageiros_tripulacao)
        const passageiros = passageirosVO.extractData()

        consumoCombustivelOutputVO.setLitrosHora(barcoCharterDatabase.consumo_combustivel_litros)
        consumoCombustivelOutputVO.setTipoCombustivel(barcoCharterDatabase.consumo_combustivel_tipo_combustivel)
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

        barcoCharterVO.setModelo(barcoCharterDatabase.modelo_modelo)
        barcoCharterVO.setNome(barcoCharterDatabase.nome)
        barcoCharterVO.setAno(barcoCharterDatabase.ano)
        barcoCharterVO.setTamanho(barcoCharterDatabase.tamanho)
        barcoCharterVO.setPreco(precoBarco) 
        barcoCharterVO.setPassageiros(passageiros)
        barcoCharterVO.setPasseio(passeio)
        barcoCharterVO.setPernoite(barcoCharterDatabase.passageiros_pernoite != null)
        barcoCharterVO.setPetFriendly(barcoCharterDatabase.pet_friendly)
        barcoCharterVO.setItensDisponiveis(itensCharterArray)
        barcoCharterVO.setImagens(imagensArray)
        barcoCharterVO.setConsumoCombustivel(consumoCombustivel) 
        barcoCharterVO.setHoraExtra(precoHoraExtra)
        barcoCharterVO.setAluguelLancha(precoAluguelLancha) 
        barcoCharterVO.setTaxaChurrasco(taxaChurrasco)
        barcoCharterVO.setVideoPromocional(barcoCharterDatabase.video_promocional)

        const barcoCharter: BarcoCharterOutput = barcoCharterVO.extractData()
        return barcoCharter
    }
}