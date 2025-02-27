import { BarcoCharterRepository } from "../../repository/charter/BarcoCharterRepository.js";
import { BarcoCharterDatabase, BarcoCharterOutput } from "../../types/charter/BarcoCharter.js";
import { ItemCharterOutput } from "../../types/charter/ItemCharter.js";
import { Passageiros } from "../../types/charter/Passageiros.js";
import { PasseioOutput } from "../../types/charter/Passeio.js";
import { Imagem } from "../../types/Imagem.js";
import { PrecoOutput } from "../../types/Preco.js";
import { converterPrecoEUAParaBrasil } from "../../util/transformationUtil.js";
import { PrecoInputVO } from "../../value_object/input/PrecoInputVO.js";
import { BarcoCharterOutputVO } from "../../value_object/output/charter/BarcoSeminovoOutputVO.js";
import { CondicoesVO } from "../../value_object/output/charter/Condicoes.js";
import { ConsumoCombustivelOutputVO } from "../../value_object/output/charter/ConsumoCombustivelOutputVO.js";
import { PassageirosOutputVO } from "../../value_object/output/charter/PassageirosOutputVO.js";
import { TaxaChurrascoOutputVO } from "../../value_object/output/charter/TaxaChurrascoOutputVO.js";
import { PrecoOutputVO } from "../../value_object/output/PrecoOutputVO.js";

export class BarcoCharterModel {
    getBarcoCharter(id:number,barcoCharterRepository:BarcoCharterRepository):Promise<BarcoCharterDatabase>{
        return barcoCharterRepository.getBarcoCharter(id)
    }
    buildBarcoSeminovoOutputObject(barcoCharterDatabase:BarcoCharterDatabase, barcoCharterVO:BarcoCharterOutputVO, precoVO:PrecoOutputVO, passageirosVO: PassageirosOutputVO, consumoCombustivelOutputVO:ConsumoCombustivelOutputVO, taxaChurrascoVO: TaxaChurrascoOutputVO, condicoesVO:CondicoesVO, passeio:PasseioOutput, itensCharterArray: ItemCharterOutput[], imagensArray: Imagem[] ):BarcoCharterOutput{
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