import { BarcoSeminovoClientDto } from "../dto/BarcoSeminovoClientDto.ts";
import {BarcoSeminovoPersistenceDto} from "../dto/BarcoSeminovoPersistenceDto.ts";
import { BarcoSeminovoClient } from "../types/BarcoSeminovoClient.ts";
import { BarcoSeminovoPersistence } from "../types/BarcoSeminovoPersistence.ts";
import { Cabine } from "../types/Cabine.ts";
import { Combustivel } from "../types/Combustivel.ts";
import { Imagem } from "../types/Imagem.ts";
import { ItemSeminovo } from "../types/ItemSeminovo.ts";
import { Modelo } from "../types/Modelo.ts";
import { Motorizacao } from "../types/Motorizacao.ts";
import { Preco } from "../types/Preco.ts";
import { Propulsao } from "../types/Propulsao.ts";



class BarcoSeminovoModel {
    buildBarcoSeminovoDTOFromDatabaseToClient(barcoSeminovoDados:Record<string,any>, imagens: Imagem[], itens:ItemSeminovo[], motor:Motorizacao, cabine: Cabine, preco:Preco){
        const barcoSeminovoDTO = new BarcoSeminovoClientDto(barcoSeminovoDados.modelo_modelo, barcoSeminovoDados.nome_barco, barcoSeminovoDados.ano_barco, barcoSeminovoDados.tamanho_barco, motor, barcoSeminovoDados.potencia_total, barcoSeminovoDados.tipo_combustivel, barcoSeminovoDados.tipo_propulsao, cabine, barcoSeminovoDados.procedencia, preco, imagens, itens, null, barcoSeminovoDados.id_barco, barcoSeminovoDados.destaque)
        return barcoSeminovoDTO
    }

    buildBarcoSeminovoDTOFromClientToDatabase(body: BarcoSeminovoClient){
        const barcoSeminovoDTO = new BarcoSeminovoClientDto(body.modelo, body.nome, body.ano, body.tamanho, body.motorizacao, body.potenciaTotal, body.combustivel, body.propulsao, body.cabines, body.procedencia, body.preco, body.imagens, body.equipadoCom, body.videoPromocional, undefined, body.destaque)
        return barcoSeminovoDTO
    }
}

export default BarcoSeminovoModel