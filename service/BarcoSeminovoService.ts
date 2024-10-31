import BarcoSeminovoRepository from "../repository/BarcoSeminovoRepository.ts";
import { ImagensRepository } from "../repository/ImagensRepository.ts";
import { ItemSeminovoRepository } from "../repository/ItemSeminovoRepository.ts";
import BarcoSeminovoModel from "../models/BarcoSeminovoModel.ts";
import { BarcoSeminovoType } from "../types/BarcoSeminovoType.ts";
import { PrecoDto } from "../dto/PrecoDto.ts";
import { PrecoModel } from "../models/PrecoModel.ts";
import { CabineModel } from "../models/CabinesModel.ts";
import { ImagemModel } from "../models/ImagemModel.ts";
import { MotorizacaoModel } from "../models/MotorizacaoModel.ts";
import { ItemSeminovoModel } from "../models/ItemSeminovoModel.ts";
import { PrecoRepository } from "../repository/PrecoRepository.ts";
import { MoedaRepository } from "../repository/MoedaRepository.ts";
import { MotorizacaoRepository } from "../repository/MotorizacaoRepository.ts";
import { ModeloMotorRepository } from "../repository/ModeloMotorRepository.ts";
import { CabineRepository } from "../repository/CabineRepository.ts";


class BarcoSeminovoService{
    async getBarcoSeminovoById(id:number) {
        const barcoSeminovoRepository = new BarcoSeminovoRepository()
        const imagemRepository = new ImagensRepository()
        const itemSeminovoRepository = new ItemSeminovoRepository()
        const barcoSeminovoModel = new BarcoSeminovoModel()
        const imagemModel = new ImagemModel()
        const itemSeminovoModel = new ItemSeminovoModel()
        const motorModel = new MotorizacaoModel()
        const cabineModel = new CabineModel()
        const precoModel = new PrecoModel()
        const barcoSeminovoDados = await barcoSeminovoRepository.getBarcoSeminovo(id)
        const imagemSeminovoDados = await imagemRepository.getImagensByIdSeminovo(id)
        const itemSeminovoDados = await itemSeminovoRepository.getItensSeminovoByIdSeminovo(id)
        const imagemSeminovoDtoCollection = imagemModel.buildImagemDtoCollectionFromDatabase(imagemSeminovoDados)
        const itemSeminovoDtoCollection = itemSeminovoModel.buildItemSeminovoDtoCollectionFromDatabase(itemSeminovoDados)
        const motorDto = motorModel.buildMotorDtoFromDatabase(barcoSeminovoDados)
        const cabineDto = cabineModel.buildCabineDtoFromDatabase(barcoSeminovoDados)
        const precoDto = precoModel.buildPrecoDtoFromDatabase(barcoSeminovoDados)
        const barcoSeminovoResult = barcoSeminovoModel.buildBarcoSeminovoDTOFromDatabase(barcoSeminovoDados, imagemSeminovoDtoCollection, itemSeminovoDtoCollection, motorDto, cabineDto, precoDto)
        return barcoSeminovoResult
    }

    async postBarcoSeminovo(barcoSeminovoClient: BarcoSeminovoType){
        const barcoSeminovoModel = new BarcoSeminovoModel()
        const precoModel = new PrecoModel()
        const motorModel = new MotorizacaoModel()
        const precoRepository = new PrecoRepository()
        const moedaRepository = new MoedaRepository()
        const motorRepository = new MotorizacaoRepository()
        const modeloMotorRepository = new ModeloMotorRepository()
        const cabineRepository = new CabineRepository()
        const idPreco = precoModel.savePreco(barcoSeminovoClient.preco, precoRepository, moedaRepository)
        const idMotor = motorModel.saveMotor(barcoSeminovoClient.motorizacao,modeloMotorRepository, motorRepository)
        const idCabine = cabineRepository.insertCabine(barcoSeminovoClient.cabines)
        
        // const barcoSeminovoDTO = barcoSeminovoModel.buildBarcoSeminovoDTOFromClient(barcoSeminovoClient)
        // const barcoSeminovoRepository = new BarcoSeminovoRepository()
        //barcoSeminovoRepository.insertBarcoSeminovo(barcoSeminovoClient)
    }
}
export default BarcoSeminovoService