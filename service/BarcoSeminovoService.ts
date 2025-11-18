import BarcoSeminovoRepository from "../repository/seminovo/BarcoSeminovoRepository.js";
import { ImagemRepository } from "../repository/ImagemRepository.js";
import { ItemSeminovoRepository } from "../repository/seminovo/ItemSeminovoRepository.js";
import { BarcoSeminovoModel } from "../models/seminovo/BarcoSeminovoModel.js";
import { PrecoModel } from "../models/PrecoModel.js";
import { CabineModel } from "../models/seminovo/CabineModel.js";
import { ImagemModel } from "../models/ImagemModel.js";
import { MotorizacaoModel } from "../models/seminovo/MotorizacaoModel.js";
import { ItemSeminovoModel } from "../models/seminovo/ItemSeminovoModel.js";
import { PrecoRepository } from "../repository/PrecoRepository.js";
import { MoedaRepository } from "../repository/MoedaRepository.js";
import { MotorizacaoRepository } from "../repository/seminovo/MotorizacaoRepository.js";
import { ModeloMotorRepository } from "../repository/ModeloMotorRepository.js";
import { CabineRepository } from "../repository/seminovo/CabineRepository.js";
import { BarcoSeminovoFilters, BarcoSeminovoInput, BarcoSeminovoInputWithId } from "../types/seminovo/BarcoSeminovo.js";
import { ModeloOutputVO } from "../value_object/output/ModeloOutputVO.js";
import { MotorizacaoOutputVO } from "../value_object/output/seminovo/MotorizacaoOutputVO.js";
import { CombustivelOutputVO } from "../value_object/output/seminovo/CombustivelOutputVO.js";
import { PropulsaoOutputVO } from "../value_object/output/seminovo/PropulsaoOutputVO.js";
import { CabinesOutputVO } from "../value_object/output/seminovo/CabinesOutputVO.js";
import { PrecoOutputVO } from "../value_object/output/PrecoOutputVO.js";
import { BarcoSeminovoOutputVO } from "../value_object/output/seminovo/BarcoSeminovoOutputVO.js";
import { ModeloInputVO } from "../value_object/input/ModeloInputVO.js";
import { MotorizacaoInputVO } from "../value_object/input/seminovo/MotorizacaoInputVO.js";
import { CombustivelInputVO } from "../value_object/input/seminovo/CombustivelInputVO.js";
import { PropulsaoInputVO } from "../value_object/input/seminovo/PropulsaoInputVO.js";
import { CabinesInputVO } from "../value_object/input/seminovo/CabinesInputVO.js";
import { PrecoInputVO } from "../value_object/input/PrecoInputVO.js";
import { BarcoSeminovoInputVO } from "../value_object/input/seminovo/BarcoSeminovoInputVO.js";
import { ImagemInputVO } from "../value_object/input/ImagemInputVO.js";
import { ItemSeminovoInputVO } from "../value_object/input/seminovo/ItemSeminovoInputVO.js";
import { FirebaseModel } from "../models/external/FirebaseModel.js";
import { ModeloModel } from "../models/ModeloModel.js";
import { ProprietarioInputVO } from "../value_object/input/ProprietarioInputVO.js";
import { BarcoSeminovoDashboardOutputVO } from "../value_object/output/seminovo/BarcoSeminovoDashboardOutputVO.js";
import { ProprietarioModel } from "../models/ProprietarioModel.js";
import { ProprietarioRepository } from "../repository/ProprietarioRepository.js";
import { ProprietarioOutputVO } from "../value_object/output/ProprietarioOutputVO.js";
import { UserModel } from "../models/UserModel.js";
import { UserRepository } from "../repository/UserRepository.js";


const cabineModel = new CabineModel()
const precoModel = new PrecoModel()
const motorizacaoModel = new MotorizacaoModel()
const imagemModel = new ImagemModel()
const itemSeminovoModel = new ItemSeminovoModel()
const barcoSeminovoModel = new BarcoSeminovoModel()
const itensSeminovoModel = new ItemSeminovoModel()
const proprietarioModel = new ProprietarioModel()
const userModel = new UserModel()



class BarcoSeminovoService {
    async getBarcoSeminovoById(id: number) {
        const barcoSeminovoDatabase = await barcoSeminovoModel.getBarcoSeminovo(id, new BarcoSeminovoRepository)
        const imagemSeminovoDtoCollection = await imagemModel.getImagesByIdSeminovo(id, new ImagemRepository)
        const itemSeminovoDtoCollection = await itemSeminovoModel.getItensByIdSeminovo(id, new ItemSeminovoRepository)
        const barcoSeminovoResult = barcoSeminovoModel.buildBarcoSeminovoOutputObject(barcoSeminovoDatabase, new BarcoSeminovoOutputVO(), imagemSeminovoDtoCollection, itemSeminovoDtoCollection, new ModeloOutputVO(), new MotorizacaoOutputVO(), new CombustivelOutputVO(), new PropulsaoOutputVO(), new CabinesOutputVO(), new PrecoOutputVO())
        return barcoSeminovoResult
    }

    async getBarcoSeminovoDashboardById(id: number) {
        const barcoSeminovoDatabase = await barcoSeminovoModel.getBarcoSeminovoDashboard(id, new BarcoSeminovoRepository)
        const imagemSeminovoDtoCollection = await imagemModel.getImagesByIdSeminovo(id, new ImagemRepository)
        const itemSeminovoDtoCollection = await itemSeminovoModel.getItensByIdSeminovo(id, new ItemSeminovoRepository)
        const barcoSeminovoResult = barcoSeminovoModel.buildBarcoSeminovoDashboardOutputObject(barcoSeminovoDatabase, new BarcoSeminovoDashboardOutputVO(), imagemSeminovoDtoCollection, itemSeminovoDtoCollection, new ModeloOutputVO(), new MotorizacaoOutputVO(), new CombustivelOutputVO(), new PropulsaoOutputVO(), new ProprietarioOutputVO(), new CabinesOutputVO(), new PrecoOutputVO())
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

    async postBarcoSeminovo(barcoSeminovoClient: BarcoSeminovoInput, firebaseId: string) {
            
            const validatedImages = imagemModel.validateImages(barcoSeminovoClient.imagens, new ImagemInputVO())
            const validatedItems = itensSeminovoModel.validateItensSeminovo(barcoSeminovoClient.equipadoCom, new ItemSeminovoInputVO())
            const barcoSeminovoValidated = barcoSeminovoModel.buildBarcoSeminovoInputObject(barcoSeminovoClient, new BarcoSeminovoInputVO, validatedImages, validatedItems, new ModeloInputVO(), new MotorizacaoInputVO(), new CombustivelInputVO(), new PropulsaoInputVO(), new CabinesInputVO(), new PrecoInputVO(), new ModeloModel())

            const idPreco = await precoModel.savePreco(barcoSeminovoValidated.preco, new PrecoRepository(), new MoedaRepository())
            const idMotorizacao = await motorizacaoModel.saveMotorizacao(barcoSeminovoValidated.motorizacao, new ModeloMotorRepository(), new MotorizacaoRepository())
            const idCabine = await cabineModel.saveCabine(barcoSeminovoValidated.cabines, new CabineRepository())
            let idProprietario 
            if(!barcoSeminovoClient.proprietario.id){
                const idUser = await userModel.getUserIdByIdFirebase(firebaseId, new UserRepository())
                idProprietario = await proprietarioModel.saveProprietario(barcoSeminovoClient.proprietario, new ProprietarioRepository())
                await proprietarioModel.associateProprietarioWithUser(idUser,idProprietario, new ProprietarioRepository())
            }else{
                idProprietario = barcoSeminovoClient.proprietario.id
            }
            const idBarco = await barcoSeminovoModel.saveBarcoSeminovo(barcoSeminovoValidated, idMotorizacao, idCabine, idPreco, new BarcoSeminovoRepository(), new ModeloModel(), idProprietario)
            await imagemModel.insertImagensForSeminovo(barcoSeminovoValidated.imagens, idBarco, new ImagemRepository())
            await itensSeminovoModel.associateItemWithSeminovo(idBarco, barcoSeminovoValidated.equipadoCom, new ItemSeminovoRepository())
    
    }
    async updateBarcoSeminovo(barcoSeminovoClient: BarcoSeminovoInputWithId, firebaseId: string) {
        let idProprietario
        if (!barcoSeminovoClient.proprietario.id) {
            const idUser = await userModel.getUserIdByIdFirebase(firebaseId, new UserRepository())
            idProprietario = await proprietarioModel.saveProprietario(barcoSeminovoClient.proprietario, new ProprietarioRepository())
            await proprietarioModel.associateProprietarioWithUser(idUser, idProprietario, new ProprietarioRepository())
            barcoSeminovoClient.proprietario.id = idProprietario
        } 

        const validatedImages = imagemModel.validateImages(barcoSeminovoClient.imagens, new ImagemInputVO())
        const validatedItems = itensSeminovoModel.validateItensSeminovo(barcoSeminovoClient.equipadoCom, new ItemSeminovoInputVO())
        const barcoSeminovoValidated = barcoSeminovoModel.buildBarcoSeminovoInputObjectWithId(barcoSeminovoClient, new BarcoSeminovoInputVO, validatedImages, validatedItems, new ModeloInputVO(), new MotorizacaoInputVO(), new CombustivelInputVO(), new PropulsaoInputVO(), new CabinesInputVO(), new ProprietarioInputVO(), new PrecoInputVO(), barcoSeminovoClient.id)

        const {idPreco, idMotorizacao, idCabine} = await barcoSeminovoModel.getIdsByIdSeminovo(barcoSeminovoValidated.id, new BarcoSeminovoRepository())
        await precoModel.updatePreco(barcoSeminovoValidated.preco, idPreco, new PrecoRepository(), new MoedaRepository())
        await motorizacaoModel.updateMotorizacao(barcoSeminovoValidated.motorizacao, idMotorizacao, new MotorizacaoRepository())
        await cabineModel.updateCabine(barcoSeminovoValidated.cabines, idCabine, new CabineRepository())
        
        await barcoSeminovoModel.updateBarcoSeminovo(barcoSeminovoValidated, new BarcoSeminovoRepository(), new ModeloModel())
        await imagemModel.deleteAllImagesFromSeminovo(barcoSeminovoValidated.id, new ImagemRepository())
        await itemSeminovoModel.deleteAllAssotiationsItemSeminovo(barcoSeminovoValidated.id, new ItemSeminovoRepository())
        await imagemModel.insertImagensForSeminovo(barcoSeminovoValidated.imagens, barcoSeminovoValidated.id, new ImagemRepository())
        await itensSeminovoModel.associateItemWithSeminovo(barcoSeminovoValidated.id, barcoSeminovoValidated.equipadoCom, new ItemSeminovoRepository())

    }

    async rollbackPost(barcoSeminovoClient: BarcoSeminovoInput) {
        imagemModel.deleteImagesFromFirebase(barcoSeminovoClient.imagens, new FirebaseModel, "seminovos")
    }

    async deleteBarcoSeminovo(idBarcoSeminovo: number, firebaseModel: FirebaseModel) {
        const barcoSeminovoData = await barcoSeminovoModel.getBarcoSeminovoDashboard(idBarcoSeminovo, new BarcoSeminovoRepository())
        const imagensFromSeminovo = await imagemModel.getImagesByIdSeminovo(idBarcoSeminovo, new ImagemRepository())
        await imagemModel.deleteAllImagesFromSeminovo(idBarcoSeminovo, new ImagemRepository())
        await itemSeminovoModel.deleteAllAssotiationsItemSeminovo(idBarcoSeminovo, new ItemSeminovoRepository())
        await barcoSeminovoModel.deleteBarcoSeminovo(idBarcoSeminovo, new BarcoSeminovoRepository())
        await cabineModel.deleteCabineByIdCabine(barcoSeminovoData.capacidade_id, new CabineRepository())
        await precoModel.deletePrecoByidPreco(barcoSeminovoData.preco_id, new PrecoRepository())
        await motorizacaoModel.deleteMotorizacaoByIdMotorizacao(barcoSeminovoData.motorizacao_id, new MotorizacaoRepository())
        await imagemModel.deleteImagesFromFirebase(imagensFromSeminovo, firebaseModel, "seminovos")
    }
}
export default BarcoSeminovoService