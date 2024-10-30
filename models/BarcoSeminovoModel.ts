import DTOBarcoSeminovo from "../dto/DtoSeminovo.ts";
import { BarcoSeminovoFromClientType } from "../types/BarcoSeminovoFromClientType.ts";

interface itemSeminovoInterface {
    item_id: number,
    nome_item: string,
    quantidade_item: number
}

interface imagemInterface {
    imagem_id: number,
    link_imagem: string
}

class BarcoSeminovoModel {
    buildBarcoSeminovoDTOFromDatabase(barcoSeminovoData: any, itensSeminovo:any, imagensSeminovo:any){
        const motor = {
            modelo: barcoSeminovoData.modelo_motor,
            quantidade:barcoSeminovoData.quantidade_motor,
            potencia: barcoSeminovoData.potencia_motor,
            horas: barcoSeminovoData.horas_motor,
            ano: barcoSeminovoData.ano_motor,
            observacoes: barcoSeminovoData.observacoes_motor
        }
    
        const cabines = {
            passageiros: barcoSeminovoData.capacidade_passageiro,
            tripulacao: barcoSeminovoData.capacidade_tripulacao
        }
        const preco = {
            moeda:barcoSeminovoData.moeda_simbolo,
            valor: parseFloat(barcoSeminovoData.preco)
        }
        const itens = itensSeminovo.map((obj: itemSeminovoInterface) => {
            
            return {item:obj.nome_item, quantidade:obj.quantidade_item}
        })
        const imagens = imagensSeminovo.map((img: imagemInterface) => {
            return { id: img.imagem_id, link: img.link_imagem }
        })
        const barcoSeminovoDTO = new DTOBarcoSeminovo(barcoSeminovoData.modelo_modelo, barcoSeminovoData.nome_barco, barcoSeminovoData.ano_barco,  barcoSeminovoData.tamanho_barco, motor, barcoSeminovoData.potencia_total, barcoSeminovoData.tipo_combustivel, barcoSeminovoData.tipo_propulsao, cabines, barcoSeminovoData.procedencia, barcoSeminovoData.destaque, preco,imagens,itens, null  )
        return barcoSeminovoDTO
    }

    buildBarcoSeminovoDTOFromClient(body: BarcoSeminovoFromClientType){
        const barcoSeminovoDTO = new DTOBarcoSeminovo( body.modelo, body.nome, body.ano, body.tamanho, body.motorizacao, body.potenciaTotal, body.combustivel, body.propulsao, body.cabines, body.procedencia, body.destaque, body.preco, body.imagens, body.equipadoCom, body.videoPromocional)
        return barcoSeminovoDTO
    }
}

export default BarcoSeminovoModel