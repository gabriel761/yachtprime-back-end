import BarcoSeminovoDto from "../dto/BarcoSeminovoDto.ts";
import { BarcoSeminovoType } from "../types/BarcoSeminovoType.ts";
import { Cabine } from "../types/Cabine.ts";
import { Imagem } from "../types/Imagem.ts";
import { ItemSeminovo } from "../types/ItemSeminovo.ts";
import { Motorizacao } from "../types/Motorizacao.ts";
import { Preco } from "../types/Preco.ts";



class BarcoSeminovoModel {
    buildBarcoSeminovoDTOFromDatabase(barcoSeminovoDados:Record<string,any>, imagens: Imagem[], itens:ItemSeminovo[], motor:Motorizacao, cabine: Cabine, preco:Preco ){
        const barcoSeminovoDTO = new BarcoSeminovoDto(barcoSeminovoDados.modelo_modelo, barcoSeminovoDados.nome_barco, barcoSeminovoDados.ano_barco, barcoSeminovoDados.tamanho_barco, motor, barcoSeminovoDados.potencia_total, barcoSeminovoDados.tipo_combustivel, barcoSeminovoDados.tipo_propulsao, cabine, barcoSeminovoDados.procedencia, preco, imagens, itens, null, barcoSeminovoDados.id_barco, barcoSeminovoDados.destaque)
        return barcoSeminovoDTO
    }

    buildBarcoSeminovoDTOFromClient(body: BarcoSeminovoType){
        const barcoSeminovoDTO = new BarcoSeminovoDto(body.modelo, body.nome, body.ano, body.tamanho, body.motorizacao, body.potenciaTotal, body.combustivel, body.propulsao, body.cabines, body.procedencia, body.preco, body.imagens, body.equipadoCom, body.videoPromocional, undefined, body.destaque)
        return barcoSeminovoDTO
    }
}

export default BarcoSeminovoModel