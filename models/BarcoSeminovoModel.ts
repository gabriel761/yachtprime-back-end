
import BarcoSeminovoRepository from "../repository/BarcoSeminovoRepository.ts";
import { BarcoSeminovoDatabase, BarcoSeminovoInput } from "../types/BarcoSeminovo.ts";
import { BarcoSeminovoOutput } from "../types/BarcoSeminovo.ts";
import { Imagem } from "../types/Imagem.ts";
import { ItemSeminovo } from "../types/ItemSeminovo.ts";
import { BarcoSeminovoInputVO } from "../value_object/input/BarcoSeminovoInputVO.ts";
import { BarcoSeminovoOutputVO } from "../value_object/output/BarcoSeminovoOutputVO.ts";
import { CabinesOutputVO } from "../value_object/output/CabinesOutputVO.ts";
import { CombustivelOutputVO } from "../value_object/output/CombustivelOutputVO.ts";
import { ModeloOutputVO } from "../value_object/output/ModeloOutputVO.ts";
import { MotorizacaoOutputVO } from "../value_object/output/MotorizacaoOutputVO.ts";
import { PrecoOutputVO } from "../value_object/output/PrecoOutputVO.ts";
import { PropulsaoOutputVO } from "../value_object/output/PropulsaoOutputVO.ts";
import { CabinesInputVO } from "../value_object/input/CabinesInputVO.ts";
import { CombustivelInputVO } from "../value_object/input/CombustivelInputVO.ts";
import { ModeloInputVO } from "../value_object/input/ModeloInputVO.ts";
import { MotorizacaoInputVO } from "../value_object/input/MotorizacaoInputVO.ts";
import { PrecoInputVO } from "../value_object/input/PrecoInputVO.ts";
import { PropulsaoInputVO } from "../value_object/input/PropulsaoInputVO.ts";

export class BarcoSeminovoModel {
   
    async getBarcoSeminovo(idBarcoSeminovo: number, barcoSeminovoRepository: BarcoSeminovoRepository): Promise<BarcoSeminovoDatabase> {
        const barcoSeminovoDB = await barcoSeminovoRepository.getBarcoSeminovo(idBarcoSeminovo)
        return barcoSeminovoDB 
    }

    async saveBarcoSeminovo(barcoSeminovoDTO: BarcoSeminovoInput, idMotorizacao: number, idCabine: number, idPreco: number, barcoSeminovoRepository: BarcoSeminovoRepository){
        const barcoSeminovoId = await barcoSeminovoRepository.insertBarcoSeminovo(barcoSeminovoDTO, idMotorizacao, idCabine, idPreco)
        return barcoSeminovoId
    }
    buildBarcoSeminovoOutputObject(barcoSeminovoDB:BarcoSeminovoDatabase, barcoseminovoOutputVO: BarcoSeminovoOutputVO, imagens: Imagem[], itens: ItemSeminovo[], modeloVO: ModeloOutputVO, motorizacaoVO: MotorizacaoOutputVO, combustivelVO: CombustivelOutputVO, propulsaoVO: PropulsaoOutputVO, cabinesVO: CabinesOutputVO, precoVO: PrecoOutputVO):BarcoSeminovoOutput{

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

        return barcoseminovoOutputVO.extractData()
    }
    buildBarcoSeminovoInputObject(barcoSeminovoInput: BarcoSeminovoInput, barcoseminovoInputVO: BarcoSeminovoInputVO, imagens: Imagem[], itens: ItemSeminovo[], modeloVO: ModeloInputVO, motorizacaoVO: MotorizacaoInputVO, combustivelVO: CombustivelInputVO, propulsaoVO: PropulsaoInputVO, cabinesVO: CabinesInputVO, precoVO: PrecoInputVO): BarcoSeminovoOutput {

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

        return barcoseminovoInputVO.extractData()
    }
}

