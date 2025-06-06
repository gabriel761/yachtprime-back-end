
import BarcoSeminovoRepository from "../../repository/seminovo/BarcoSeminovoRepository.js";
import { BarcoSeminovoDatabase, BarcoSeminovoFilters, BarcoSeminovoFrontEndList, BarcoSeminovoInput, BarcoSeminovoInputWithId, BarcoSeminovoRelated } from "../../types/seminovo/BarcoSeminovo.js";
import { BarcoSeminovoOutput } from "../../types/seminovo/BarcoSeminovo.js";
import { Imagem } from "../../types/Imagem.js";
import { ItemSeminovo } from "../../types/seminovo/ItemSeminovo.js";
import { BarcoSeminovoInputVO } from "../../value_object/input/seminovo/BarcoSeminovoInputVO.js";
import { BarcoSeminovoOutputVO } from "../../value_object/output/seminovo/BarcoSeminovoOutputVO.js";
import { CabinesOutputVO } from "../../value_object/output/seminovo/CabinesOutputVO.js";
import { CombustivelOutputVO } from "../../value_object/output/seminovo/CombustivelOutputVO.js";
import { ModeloOutputVO } from "../../value_object/output/ModeloOutputVO.js";
import { MotorizacaoOutputVO } from "../../value_object/output/seminovo/MotorizacaoOutputVO.js";
import { PrecoOutputVO } from "../../value_object/output/PrecoOutputVO.js";
import { PropulsaoOutputVO } from "../../value_object/output/seminovo/PropulsaoOutputVO.js";
import { CabinesInputVO } from "../../value_object/input/seminovo/CabinesInputVO.js";
import { CombustivelInputVO } from "../../value_object/input/seminovo/CombustivelInputVO.js";
import { ModeloInputVO } from "../../value_object/input/ModeloInputVO.js";
import { MotorizacaoInputVO } from "../../value_object/input/seminovo/MotorizacaoInputVO.js";
import { PrecoInputVO } from "../../value_object/input/PrecoInputVO.js";
import { PropulsaoInputVO } from "../../value_object/input/seminovo/PropulsaoInputVO.js";
import { CustomError } from "../../infra/CustoError.js";
import { modelos } from "../../test/mocks/modelos.js";
import { converterPrecoBrasilParaEUA, converterPrecoEUAParaBrasil } from "../../util/transformationUtil.js";

export class BarcoSeminovoModel {

    async getBarcoSeminovo(idBarcoSeminovo: number, barcoSeminovoRepository: BarcoSeminovoRepository): Promise<BarcoSeminovoDatabase> {
        const barcoSeminovoDB = await barcoSeminovoRepository.getBarcoSeminovo(idBarcoSeminovo)
        return barcoSeminovoDB
    }

    async listBarcoSeminovoDashboard(barcoSeminovoRepository: BarcoSeminovoRepository) {
        const result = await barcoSeminovoRepository.listBarcoSeminovoDashboard()
        const updatedList = result.map((seminovo) => {
            seminovo.valor = converterPrecoEUAParaBrasil(seminovo.valor)
            return seminovo
        })
        return updatedList
    }

    async listBarcoSeminovoFrontEnd(filters: BarcoSeminovoFilters, barcoSeminovoRepository: BarcoSeminovoRepository) {
        const result = await barcoSeminovoRepository.listBarcoSeminovoFrontEnd(filters)

        const barcoSeminovoListFrontEnd = result.map((item: any): BarcoSeminovoFrontEndList => {
            const barcoSeminovoForList: BarcoSeminovoFrontEndList = {
                id: item.id,
                imagem: item.imagem,
                modelo: item.modelo,
                ano: item.ano,
                tamanho: item.tamanho,
                combustivel: item.combustivel,
                potencia: item.potencia_total,
                motorizacao: {
                    quantidade: item.motor_quantidade,
                    modelo: item.motor_modelo
                }
            }
            return barcoSeminovoForList
        })
        if (!filters.page) {
            return {
                data: barcoSeminovoListFrontEnd
            }
        }
        return {
            data: barcoSeminovoListFrontEnd,
            totalPages: await barcoSeminovoRepository.getTotalPagesForPagination()
        }
    }

    async getRelatedSeminovos(idSeminovo: number, barcoSeminovoRepository: BarcoSeminovoRepository): Promise<BarcoSeminovoRelated[]> {
        const result = await barcoSeminovoRepository.getRelatedSeminovos(idSeminovo)
        const barcoSeminovosRelatedList = result.map((item): BarcoSeminovoRelated => {
            const barcoSeminovoRelated: BarcoSeminovoRelated = {
                id: item.barco_id,
                modelo: item.modelo,
                imagem: item.primeira_imagem
            }
            return barcoSeminovoRelated
        })
        return barcoSeminovosRelatedList
    }

    async getIdsByIdSeminovo(idSeminovo: number | undefined, barcoSeminovoRepository: BarcoSeminovoRepository) {
        if (!idSeminovo) {
            throw new CustomError("Erro: idSeminovo não encontrado na requisição ", 400);
        }
        const result = await barcoSeminovoRepository.getIdsByIdSeminovo(idSeminovo)
        const structuredResult = {
            idMotorizacao: result.id_motorizacao,
            idPreco: result.id_preco,
            idCabine: result.id_cabine
        }
        return structuredResult
    }
    async saveBarcoSeminovo(barcoSeminovoDTO: BarcoSeminovoInput, idMotorizacao: number, idCabine: number, idPreco: number, barcoSeminovoRepository: BarcoSeminovoRepository) {
        const barcoSeminovoId = await barcoSeminovoRepository.insertBarcoSeminovo(barcoSeminovoDTO, idMotorizacao, idCabine, idPreco)
        return barcoSeminovoId
    }

    async updateBarcoSeminovo(barcoSeminovoDTO: BarcoSeminovoInputWithId, barcoSeminovoRepository: BarcoSeminovoRepository) {
        await barcoSeminovoRepository.updateBarcoSeminovo(barcoSeminovoDTO,)
    }

    async deleteBarcoSeminovo(idBarcoSeminovo: number, barcoSeminovoRepository: BarcoSeminovoRepository) {
        await barcoSeminovoRepository.deleteBarcoSeminovo(idBarcoSeminovo)
    }

    buildBarcoSeminovoOutputObject(barcoSeminovoDB: BarcoSeminovoDatabase, barcoseminovoOutputVO: BarcoSeminovoOutputVO, imagens: Imagem[], itens: ItemSeminovo[], modeloVO: ModeloOutputVO, motorizacaoVO: MotorizacaoOutputVO, combustivelVO: CombustivelOutputVO, propulsaoVO: PropulsaoOutputVO, cabinesVO: CabinesOutputVO, precoVO: PrecoOutputVO): BarcoSeminovoOutput {

        barcoSeminovoDB.preco = converterPrecoEUAParaBrasil(barcoSeminovoDB.preco)
        modeloVO.setModelo(barcoSeminovoDB.modelo_modelo)
        modeloVO.setMarca(barcoSeminovoDB.marca_modelo)
        modeloVO.setId(barcoSeminovoDB.id_modelo)
        motorizacaoVO.setModelo(barcoSeminovoDB.modelo_motor)
        motorizacaoVO.setQuantidade(barcoSeminovoDB.quantidade_motorizacao)
        motorizacaoVO.setPotencia(barcoSeminovoDB.potencia_motorizacao)
        motorizacaoVO.setHoras(barcoSeminovoDB.horas_motorizacao)
        motorizacaoVO.setAno(barcoSeminovoDB.ano_motorizacao)
        motorizacaoVO.setObservacoes(barcoSeminovoDB.observacoes_motorizacao)
        combustivelVO.setId(barcoSeminovoDB.id_combustivel)
        combustivelVO.setOpcao(barcoSeminovoDB.tipo_combustivel)
        propulsaoVO.setId(barcoSeminovoDB.id_propulsao)
        propulsaoVO.setOpcao(barcoSeminovoDB.tipo_propulsao)
        cabinesVO.setPassageiros(barcoSeminovoDB.capacidade_passageiro)
        cabinesVO.setTripulacao(barcoSeminovoDB.capacidade_tripulacao)
        precoVO.setMoeda(barcoSeminovoDB.moeda_simbolo)
        precoVO.setValor(barcoSeminovoDB.preco)
        barcoseminovoOutputVO.setId(barcoSeminovoDB.barco_id);
        barcoseminovoOutputVO.setModelo(modeloVO.extractData());
        barcoseminovoOutputVO.setNome(barcoSeminovoDB.nome_barco);
        barcoseminovoOutputVO.setAno(barcoSeminovoDB.ano_barco);
        barcoseminovoOutputVO.setTamanho(barcoSeminovoDB.tamanho_barco);
        barcoseminovoOutputVO.setMotorizacao(motorizacaoVO.extractData());
        barcoseminovoOutputVO.setPotenciaTotal(barcoSeminovoDB.potencia_total);
        barcoseminovoOutputVO.setCombustivel(combustivelVO.extractData());
        barcoseminovoOutputVO.setPropulsao(propulsaoVO.extractData());
        barcoseminovoOutputVO.setCabine(cabinesVO.extractData());
        barcoseminovoOutputVO.setProcedencia(barcoSeminovoDB.procedencia);
        barcoseminovoOutputVO.setDestaque(barcoSeminovoDB.destaque);
        barcoseminovoOutputVO.setPreco(precoVO.extractData());
        barcoseminovoOutputVO.setImagens(imagens);
        barcoseminovoOutputVO.setItens(itens);
        barcoseminovoOutputVO.setVideoPromocional(barcoSeminovoDB.video);
        barcoseminovoOutputVO.setOportunidade(barcoSeminovoDB.oportunidade)

        return barcoseminovoOutputVO.extractData()
    }
    buildBarcoSeminovoInputObject(barcoSeminovoInput: BarcoSeminovoInput, barcoseminovoInputVO: BarcoSeminovoInputVO, imagens: Imagem[], itens: ItemSeminovo[], modeloVO: ModeloInputVO, motorizacaoVO: MotorizacaoInputVO, combustivelVO: CombustivelInputVO, propulsaoVO: PropulsaoInputVO, cabinesVO: CabinesInputVO, precoVO: PrecoInputVO): BarcoSeminovoInput {
        barcoSeminovoInput.preco.valor = converterPrecoBrasilParaEUA(barcoSeminovoInput.preco.valor)
        modeloVO.setId(barcoSeminovoInput.modelo.id)
        modeloVO.setModelo(barcoSeminovoInput.modelo.modelo)
        modeloVO.setMarca(barcoSeminovoInput.modelo.marca)
        motorizacaoVO.setModelo(barcoSeminovoInput.motorizacao.modelo)
        motorizacaoVO.setQuantidade(barcoSeminovoInput.motorizacao.quantidade)
        motorizacaoVO.setPotencia(barcoSeminovoInput.motorizacao.potencia)
        motorizacaoVO.setHoras(barcoSeminovoInput.motorizacao.horas)
        motorizacaoVO.setAno(barcoSeminovoInput.motorizacao.ano)
        motorizacaoVO.setObservacoes(barcoSeminovoInput.motorizacao.observacoes)
        combustivelVO.setId(barcoSeminovoInput.combustivel.id)
        combustivelVO.setOpcao(barcoSeminovoInput.combustivel.opcao)
        propulsaoVO.setId(barcoSeminovoInput.propulsao.id)
        propulsaoVO.setOpcao(barcoSeminovoInput.propulsao.opcao)
        cabinesVO.setPassageiros(barcoSeminovoInput.cabines.passageiros)
        cabinesVO.setTripulacao(barcoSeminovoInput.cabines.tripulacao)
        precoVO.setMoeda(barcoSeminovoInput.preco.moeda)
        precoVO.setValor(barcoSeminovoInput.preco.valor)
        barcoseminovoInputVO.setModelo(modeloVO.extractData());
        barcoseminovoInputVO.setNome(barcoSeminovoInput.nome);
        barcoseminovoInputVO.setAno(barcoSeminovoInput.ano);
        barcoseminovoInputVO.setTamanho(barcoSeminovoInput.tamanho);
        barcoseminovoInputVO.setMotorizacao(motorizacaoVO.extractData());
        barcoseminovoInputVO.setPotenciaTotal(barcoSeminovoInput.potenciaTotal);
        barcoseminovoInputVO.setCombustivel(combustivelVO.extractData());
        barcoseminovoInputVO.setPropulsao(propulsaoVO.extractData());
        barcoseminovoInputVO.setCabine(cabinesVO.extractData());
        barcoseminovoInputVO.setProcedencia(barcoSeminovoInput.procedencia);
        barcoseminovoInputVO.setDestaque(barcoSeminovoInput.destaque);
        barcoseminovoInputVO.setPreco(precoVO.extractData());
        barcoseminovoInputVO.setImagens(imagens);
        barcoseminovoInputVO.setItens(itens);
        barcoseminovoInputVO.setVideoPromocional(barcoSeminovoInput.videoPromocional);
        barcoseminovoInputVO.setOportunidade(barcoSeminovoInput.oportunidade)

        return barcoseminovoInputVO.extractData()
    }
    buildBarcoSeminovoInputObjectWithId(barcoSeminovoInput: BarcoSeminovoInput, barcoseminovoInputVO: BarcoSeminovoInputVO, imagens: Imagem[], itens: ItemSeminovo[], modeloVO: ModeloInputVO, motorizacaoVO: MotorizacaoInputVO, combustivelVO: CombustivelInputVO, propulsaoVO: PropulsaoInputVO, cabinesVO: CabinesInputVO, precoVO: PrecoInputVO, idSeminovo: number): BarcoSeminovoInputWithId {
        barcoSeminovoInput.preco.valor = converterPrecoBrasilParaEUA(barcoSeminovoInput.preco.valor)
        modeloVO.setId(barcoSeminovoInput.modelo.id)
        modeloVO.setModelo(barcoSeminovoInput.modelo.modelo)
        modeloVO.setMarca(barcoSeminovoInput.modelo.marca)
        motorizacaoVO.setModelo(barcoSeminovoInput.motorizacao.modelo)
        motorizacaoVO.setQuantidade(barcoSeminovoInput.motorizacao.quantidade)
        motorizacaoVO.setPotencia(barcoSeminovoInput.motorizacao.potencia)
        motorizacaoVO.setHoras(barcoSeminovoInput.motorizacao.horas)
        motorizacaoVO.setAno(barcoSeminovoInput.motorizacao.ano)
        motorizacaoVO.setObservacoes(barcoSeminovoInput.motorizacao.observacoes)
        combustivelVO.setId(barcoSeminovoInput.combustivel.id)
        combustivelVO.setOpcao(barcoSeminovoInput.combustivel.opcao)
        propulsaoVO.setId(barcoSeminovoInput.propulsao.id)
        propulsaoVO.setOpcao(barcoSeminovoInput.propulsao.opcao)
        cabinesVO.setPassageiros(barcoSeminovoInput.cabines.passageiros)
        cabinesVO.setTripulacao(barcoSeminovoInput.cabines.tripulacao)
        precoVO.setMoeda(barcoSeminovoInput.preco.moeda)
        precoVO.setValor(barcoSeminovoInput.preco.valor)
        barcoseminovoInputVO.setId(idSeminovo)
        barcoseminovoInputVO.setModelo(modeloVO.extractData());
        barcoseminovoInputVO.setNome(barcoSeminovoInput.nome);
        barcoseminovoInputVO.setAno(barcoSeminovoInput.ano);
        barcoseminovoInputVO.setTamanho(barcoSeminovoInput.tamanho);
        barcoseminovoInputVO.setMotorizacao(motorizacaoVO.extractData());
        barcoseminovoInputVO.setPotenciaTotal(barcoSeminovoInput.potenciaTotal);
        barcoseminovoInputVO.setCombustivel(combustivelVO.extractData());
        barcoseminovoInputVO.setPropulsao(propulsaoVO.extractData());
        barcoseminovoInputVO.setCabine(cabinesVO.extractData());
        barcoseminovoInputVO.setProcedencia(barcoSeminovoInput.procedencia);
        barcoseminovoInputVO.setDestaque(barcoSeminovoInput.destaque);
        barcoseminovoInputVO.setPreco(precoVO.extractData());
        barcoseminovoInputVO.setImagens(imagens);
        barcoseminovoInputVO.setItens(itens);
        barcoseminovoInputVO.setVideoPromocional(barcoSeminovoInput.videoPromocional);
        barcoseminovoInputVO.setOportunidade(barcoSeminovoInput.oportunidade)

        return barcoseminovoInputVO.extractDataWithId()
    }
}

