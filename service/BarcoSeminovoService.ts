import BarcoSeminovoRepository from "../repository/BarcoSeminovoRepository.ts";
import { ImagensRepository } from "../repository/ImagensRepository.ts";
import { ItemSeminovoRepository } from "../repository/ItemSeminovoRepository.ts";
import BarcoSeminovoModel from "../models/BarcoSeminovoModel.ts";
import { BarcoSeminovoType } from "../types/BarcoSeminovoType.ts";
import { PrecoDto } from "../dto/PrecoDto.ts";
import { PrecoModel } from "../models/PrecoModel.ts";
import { CabineModel } from "../models/CabinesModel.ts";
import { ImagemModel } from "../models/ImagemModel.ts";
import { MotorModel } from "../models/MotorModel.ts";
import { ItemSeminovoModel } from "../models/ItemSeminovoModel.ts";


class BarcoSeminovoService{
    async getBarcoSeminovoById(id:number) {
        const barcoSeminovoRepository = new BarcoSeminovoRepository()
        const imagemRepository = new ImagensRepository()
        const itemSeminovoRepository = new ItemSeminovoRepository()
        const barcoSeminovoModel = new BarcoSeminovoModel()
        const imagemModel = new ImagemModel()
        const itemSeminovoModel = new ItemSeminovoModel()
        const motorModel = new MotorModel()
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

    async postBarcoSeminovo(body: BarcoSeminovoType){
        const barcoSeminovoModel = new BarcoSeminovoModel()
        const precoModel = new PrecoModel();
        const cabineModel = new CabineModel();
        const imagemModel = new ImagemModel();
        const motorModel = new MotorModel();
        const itemSeminovoModel = new ItemSeminovoModel();
        const precoDto = precoModel.buildPrecoDtoFromClient()
        const cabineDto = cabineModel.buildCabineDtoFromClient()
        const imagemDto = imagemModel.buildImagemDtoFromClient()
        const MotorDto = motorModel.buildMotorDtoFromClient()
        const itemSeminovoDto = itemSeminovoModel.buildItemSeminovoDtoFromClient()
        const barcoSeminovoDTO = barcoSeminovoModel.buildBarcoSeminovoDTOFromClient(body)
        const barcoSeminovoRepository = new BarcoSeminovoRepository()
        barcoSeminovoRepository.saveBarcoSeminovo(body)
    }
}
export default BarcoSeminovoService