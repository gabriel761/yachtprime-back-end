import BarcoSeminovoRepository from "../repository/BarcoSeminovoRepository.ts";
import DTOBarcoSeminovo from "../dto/DtoSeminovo.ts";
import BarcoSeminovo from "../modules/BarcoSeminovo.ts";
import { ImagensRepository } from "../repository/ImagensRepository.ts";
import { ItemSeminovoRepository } from "../repository/ItemSeminovoRepository.ts";

class BarcoSeminovoService{
    async getBarcoSeminovoById(id:number) {
        const barcoSeminovoRepository = new BarcoSeminovoRepository()
        const barcoSeminovoData = await barcoSeminovoRepository.getBarcoSeminovo(id)
        const imagemRepository = new ImagensRepository()
        const imagensSeminovo = await imagemRepository.getImagensByIdSeminovo(id)
        const itemSeminovoRepository = new ItemSeminovoRepository()
        const itensSeminovo = await itemSeminovoRepository.getItensSeminovoByIdSeminovo(id)
        const barcoSeminovoModule = new BarcoSeminovo()
        const barcoSeminovoResult = barcoSeminovoModule.buildBarcoSeminovoDTO(barcoSeminovoData, itensSeminovo, imagensSeminovo)
        return barcoSeminovoResult
    }
}
export default BarcoSeminovoService