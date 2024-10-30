import BarcoSeminovoRepository from "../repository/BarcoSeminovoRepository.ts";
import DTOBarcoSeminovo from "../dto/DtoSeminovo.ts";
import { ImagensRepository } from "../repository/ImagensRepository.ts";
import { ItemSeminovoRepository } from "../repository/ItemSeminovoRepository.ts";
import BarcoSeminovoModel from "../models/BarcoSeminovoModel.ts";
import { BarcoSeminovoFromClientType } from "../types/BarcoSeminovoFromClientType.ts";


class BarcoSeminovoService{
    async getBarcoSeminovoById(id:number) {
        const barcoSeminovoRepository = new BarcoSeminovoRepository()
        const barcoSeminovoData = await barcoSeminovoRepository.getBarcoSeminovo(id)
        const imagemRepository = new ImagensRepository()
        const imagensSeminovo = await imagemRepository.getImagensByIdSeminovo(id)
        const itemSeminovoRepository = new ItemSeminovoRepository()
        const itensSeminovo = await itemSeminovoRepository.getItensSeminovoByIdSeminovo(id)
        const barcoSeminovoModel = new BarcoSeminovoModel()
        const barcoSeminovoResult = barcoSeminovoModel.buildBarcoSeminovoDTOFromDatabase(barcoSeminovoData, itensSeminovo, imagensSeminovo)
        return barcoSeminovoResult
    }

    async postBarcoSeminovo(body: BarcoSeminovoFromClientType){
        const barcoSeminovoModel = new BarcoSeminovoModel()
        const barcoSeminovoDTO = barcoSeminovoModel.buildBarcoSeminovoDTOFromClient(body)
        const barcoSeminovoRepository = new BarcoSeminovoRepository()
        barcoSeminovoRepository.saveBarcoSeminovo(body)
    }
}
export default BarcoSeminovoService