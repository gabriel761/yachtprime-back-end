import BarcoSeminovoRepository from "../repository/BarcoSeminovoRepository.ts";
import { ImagemRepository } from "../repository/ImagemRepository.ts";
import { ItemSeminovoRepository } from "../repository/ItemSeminovoRepository.ts";
import BarcoSeminovoModel from "../models/BarcoSeminovoModel.ts";
import { BarcoSeminovoPersistence } from "../types/BarcoSeminovoPersistence.ts";
import { PrecoDto } from "../dto/PrecoDto.ts";
import { PrecoModel } from "../models/PrecoModel.ts";
import { CabineModel } from "../models/CabineModel.ts";
import { ImagemModel } from "../models/ImagemModel.ts";
import { MotorizacaoModel } from "../models/MotorizacaoModel.ts";
import { ItemSeminovoModel } from "../models/ItemSeminovoModel.ts";
import { PrecoRepository } from "../repository/PrecoRepository.ts";
import { MoedaRepository } from "../repository/MoedaRepository.ts";
import { MotorizacaoRepository } from "../repository/MotorizacaoRepository.ts";
import { ModeloMotorRepository } from "../repository/ModeloMotorRepository.ts";
import { CabineRepository } from "../repository/CabineRepository.ts";
import { CombustivelModel } from "../models/CombustivelModel.ts";
import { ModeloModel } from "../models/ModeloModel.ts";
import { PropulsaoModel } from "../models/PropulsaoModel.ts";
import { CombustivelRepository } from "../repository/CombustivelRepository.ts";
import { PropulsaoRepository } from "../repository/PropulsaoRepository.ts";
import { BarcoSeminovoClient } from "../types/BarcoSeminovoClient.ts";
import { ModeloRepository } from "../repository/ModeloRepository.ts";


class BarcoSeminovoService{
    async getBarcoSeminovoById(id:number) {
        const barcoSeminovoRepository = new BarcoSeminovoRepository()
        const barcoSeminovoModel = new BarcoSeminovoModel()
        const imagemModel = new ImagemModel()
        const itemSeminovoModel = new ItemSeminovoModel()
        const motorModel = new MotorizacaoModel()
        const cabineModel = new CabineModel()
        const precoModel = new PrecoModel()
        const barcoSeminovoDados = await barcoSeminovoRepository.getBarcoSeminovo(id)
        const imagemSeminovoDtoCollection = await imagemModel.getImagesByIdSeminovo(id, new ImagemRepository)
        const itemSeminovoDtoCollection = await itemSeminovoModel.getItensByIdSeminovo(id, new ItemSeminovoRepository)
        const motorDto = motorModel.buildMotorDtoFromDatabase(barcoSeminovoDados)
        const cabineDto = cabineModel.buildCabineDtoFromDatabase(barcoSeminovoDados)
        const precoDto = precoModel.buildPrecoDtoFromDatabase(barcoSeminovoDados)
        const barcoSeminovoResult = barcoSeminovoModel.buildBarcoSeminovoDTOFromDatabaseToClient(barcoSeminovoDados, imagemSeminovoDtoCollection, itemSeminovoDtoCollection, motorDto, cabineDto, precoDto)
        return barcoSeminovoResult
    }

    async postBarcoSeminovo(barcoSeminovoClient: BarcoSeminovoClient){
        const barcoSeminovoModel = new BarcoSeminovoModel()
        const precoModel = new PrecoModel()
        const motorModel = new MotorizacaoModel()
        const cabineModel = new CabineModel()
        const combustivelModel = new CombustivelModel()
        const modeloModel = new ModeloModel()
        const propulsaoModel = new PropulsaoModel()
        const imagemModel = new ImagemModel()
        const itensSeminovoModel = new ItemSeminovoModel()

        const barcoSeminovoRepository = new BarcoSeminovoRepository()
    
        const idPreco = await precoModel.savePreco(barcoSeminovoClient.preco, new PrecoRepository(), new MoedaRepository())
        const idMotorizacao = await motorModel.saveMotorizacao(barcoSeminovoClient.motorizacao, new ModeloMotorRepository(), new MotorizacaoRepository())
        const idCabine = await cabineModel.saveCabine(barcoSeminovoClient.cabines, new CabineRepository())
        const idCombustivel = await combustivelModel.getIdCombustivelByName(barcoSeminovoClient.combustivel, new CombustivelRepository())
        const idModelo = await modeloModel.getIdModeloByName(barcoSeminovoClient.modelo, new ModeloRepository())
        const idPropulsao = await propulsaoModel.getIdPropulsaoByName(barcoSeminovoClient.propulsao, new PropulsaoRepository())        
        const idBarco = await barcoSeminovoRepository.insertBarcoSeminovo(barcoSeminovoClient,idMotorizacao, idCabine, idPreco, idCombustivel, idModelo, idPropulsao)
        await imagemModel.insertImagensForSeminovo(barcoSeminovoClient.imagens, idBarco, new ImagemRepository())
        await itensSeminovoModel.associateItemWithSeminovo(idBarco, barcoSeminovoClient.equipadoCom, new ItemSeminovoRepository())

    }
}
export default BarcoSeminovoService