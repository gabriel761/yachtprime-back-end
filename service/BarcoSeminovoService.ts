import BarcoSeminovoRepository from "../repository/BarcoSeminovoRepository.ts";
import { ImagemRepository } from "../repository/ImagemRepository.ts";
import { ItemSeminovoRepository } from "../repository/ItemSeminovoRepository.ts";
import { BarcoSeminovoModel } from "../models/BarcoSeminovoModel.ts";
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
import { BarcoSeminovoFilters, BarcoSeminovoInput, BarcoSeminovoInputWithId } from "../types/BarcoSeminovo.ts";
import { ModeloOutputVO } from "../value_object/output/ModeloOutputVO.ts";
import { MotorizacaoOutputVO } from "../value_object/output/MotorizacaoOutputVO.ts";
import { CombustivelOutputVO } from "../value_object/output/CombustivelOutputVO.ts";
import { PropulsaoOutputVO } from "../value_object/output/PropulsaoOutputVO.ts";
import { CabinesOutputVO } from "../value_object/output/CabinesOutputVO.ts";
import { PrecoOutputVO } from "../value_object/output/PrecoOutputVO.ts";
import { BarcoSeminovoOutputVO } from "../value_object/output/BarcoSeminovoOutputVO.ts";
import { ModeloInputVO } from "../value_object/input/ModeloInputVO.ts";
import { MotorizacaoInputVO } from "../value_object/input/MotorizacaoInputVO.ts";
import { CombustivelInputVO } from "../value_object/input/CombustivelInputVO.ts";
import { PropulsaoInputVO } from "../value_object/input/PropulsaoInputVO.ts";
import { CabinesInputVO } from "../value_object/input/CabinesInputVO.ts";
import { PrecoInputVO } from "../value_object/input/PrecoInputVO.ts";
import { BarcoSeminovoInputVO } from "../value_object/input/BarcoSeminovoInputVO.ts";
import { ImagemInputVO } from "../value_object/input/ImagemInputVO.ts";
import { ItemSeminovoInputVO } from "../value_object/input/ItemSeminovoInputVO.ts";
import { FirebaseModel } from "../models/external/FirebaseModel.ts";


const cabineModel = new CabineModel()
const precoModel = new PrecoModel()
const motorizacaoModel = new MotorizacaoModel()
const imagemModel = new ImagemModel()
const itemSeminovoModel = new ItemSeminovoModel()
const barcoSeminovoModel = new BarcoSeminovoModel()
const itensSeminovoModel = new ItemSeminovoModel()




class BarcoSeminovoService {
    async getBarcoSeminovoById(id: number) {
        const barcoSeminovoDatabase = await barcoSeminovoModel.getBarcoSeminovo(id, new BarcoSeminovoRepository)
        const imagemSeminovoDtoCollection = await imagemModel.getImagesByIdSeminovo(id, new ImagemRepository)
        const itemSeminovoDtoCollection = await itemSeminovoModel.getItensByIdSeminovo(id, new ItemSeminovoRepository)
        const barcoSeminovoResult = barcoSeminovoModel.buildBarcoSeminovoOutputObject(barcoSeminovoDatabase, new BarcoSeminovoOutputVO(), imagemSeminovoDtoCollection, itemSeminovoDtoCollection, new ModeloOutputVO(), new MotorizacaoOutputVO(), new CombustivelOutputVO(), new PropulsaoOutputVO(), new CabinesOutputVO(), new PrecoOutputVO())
        return barcoSeminovoResult
    }

    async listBarcoSeminovoDashboard(){
        const result = await barcoSeminovoModel.listBarcoSeminovoDashboard(new BarcoSeminovoRepository())
        return result
    }
    async listBarcoSeminovoFrontEnd(query: any) {
        const filters: BarcoSeminovoFilters = query
        const result = await barcoSeminovoModel.listBarcoSeminovoFrontEnd(filters,new BarcoSeminovoRepository())
        return result
    }
    async getRelatedSeminovos(idSeminovo:number){
        const result = await barcoSeminovoModel.getRelatedSeminovos(idSeminovo, new BarcoSeminovoRepository())
        return result
    }

    async postBarcoSeminovo(barcoSeminovoClient: BarcoSeminovoInput) {
            
            const validatedImages = imagemModel.validateImages(barcoSeminovoClient.imagens, new ImagemInputVO())
            const validatedItems = itensSeminovoModel.validateItensSeminovo(barcoSeminovoClient.equipadoCom, new ItemSeminovoInputVO())
            const barcoSeminovoValidated = barcoSeminovoModel.buildBarcoSeminovoInputObject(barcoSeminovoClient, new BarcoSeminovoInputVO, validatedImages, validatedItems, new ModeloInputVO(), new MotorizacaoInputVO(), new CombustivelInputVO(), new PropulsaoInputVO(), new CabinesInputVO(), new PrecoInputVO())

            const idPreco = await precoModel.savePreco(barcoSeminovoValidated.preco, new PrecoRepository(), new MoedaRepository())
            const idMotorizacao = await motorizacaoModel.saveMotorizacao(barcoSeminovoValidated.motorizacao, new ModeloMotorRepository(), new MotorizacaoRepository())
            const idCabine = await cabineModel.saveCabine(barcoSeminovoValidated.cabines, new CabineRepository())
            const idBarco = await barcoSeminovoModel.saveBarcoSeminovo(barcoSeminovoValidated, idMotorizacao, idCabine, idPreco, new BarcoSeminovoRepository())
            await imagemModel.insertImagensForSeminovo(barcoSeminovoValidated.imagens, idBarco, new ImagemRepository())
            await itensSeminovoModel.associateItemWithSeminovo(idBarco, barcoSeminovoValidated.equipadoCom, new ItemSeminovoRepository())
    
    }
    async updateBarcoSeminovo(barcoSeminovoClient: BarcoSeminovoInputWithId) {

        const validatedImages = imagemModel.validateImages(barcoSeminovoClient.imagens, new ImagemInputVO())
        const validatedItems = itensSeminovoModel.validateItensSeminovo(barcoSeminovoClient.equipadoCom, new ItemSeminovoInputVO())
        const barcoSeminovoValidated = barcoSeminovoModel.buildBarcoSeminovoInputObjectWithId(barcoSeminovoClient, new BarcoSeminovoInputVO, validatedImages, validatedItems, new ModeloInputVO(), new MotorizacaoInputVO(), new CombustivelInputVO(), new PropulsaoInputVO(), new CabinesInputVO(), new PrecoInputVO(), barcoSeminovoClient.id)

        const {idPreco, idMotorizacao, idCabine} = await barcoSeminovoModel.getIdsByIdSeminovo(barcoSeminovoValidated.id, new BarcoSeminovoRepository())
        await precoModel.updatePreco(barcoSeminovoValidated.preco, idPreco, new PrecoRepository(), new MoedaRepository())
        await motorizacaoModel.updateMotorizacao(barcoSeminovoValidated.motorizacao, idMotorizacao, new MotorizacaoRepository())
        await cabineModel.updateCabine(barcoSeminovoValidated.cabines, idCabine, new CabineRepository())
        await barcoSeminovoModel.updateBarcoSeminovo(barcoSeminovoValidated, new BarcoSeminovoRepository())
        await imagemModel.deleteAllImagesFromSeminovo(barcoSeminovoValidated.id, new ImagemRepository())
        await itemSeminovoModel.deleteAllAssotiationsItemSeminovo(barcoSeminovoValidated.id, new ItemSeminovoRepository())
        await imagemModel.insertImagensForSeminovo(barcoSeminovoValidated.imagens, barcoSeminovoValidated.id, new ImagemRepository())
        await itensSeminovoModel.associateItemWithSeminovo(barcoSeminovoValidated.id, barcoSeminovoValidated.equipadoCom, new ItemSeminovoRepository())

    }

    async rollbackPost(barcoSeminovoClient: BarcoSeminovoInput) {
        imagemModel.deleteImagesFromFirebase(barcoSeminovoClient.imagens, new FirebaseModel)
    }

    async deleteBarcoSeminovo(idBarcoSeminovo: number, firebaseModel: FirebaseModel) {
        const barcoSeminovoData = await barcoSeminovoModel.getBarcoSeminovo(idBarcoSeminovo, new BarcoSeminovoRepository())
        const imagensFromSeminovo = await imagemModel.getImagesByIdSeminovo(idBarcoSeminovo, new ImagemRepository())
        await imagemModel.deleteAllImagesFromSeminovo(idBarcoSeminovo, new ImagemRepository())
        await itemSeminovoModel.deleteAllAssotiationsItemSeminovo(idBarcoSeminovo, new ItemSeminovoRepository())
        await barcoSeminovoModel.deleteBarcoSeminovo(idBarcoSeminovo, new BarcoSeminovoRepository())
        await cabineModel.deleteCabineByIdCabine(barcoSeminovoData.capacidade_id, new CabineRepository())
        await precoModel.deletePrecoByidPreco(barcoSeminovoData.preco_id, new PrecoRepository())
        await motorizacaoModel.deleteMotorizacaoByIdMotorizacao(barcoSeminovoData.motorizacao_id, new MotorizacaoRepository())
       // await imagemModel.deleteImagesFromFirebase(imagensFromSeminovo, firebaseModel)
    }
}
export default BarcoSeminovoService