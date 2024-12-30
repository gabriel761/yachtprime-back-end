import { CustomError } from "../infra/CustoError.js"
import { CombustivelModel } from "../models/CombustivelModel.js"
import { FirebaseModel } from "../models/external/FirebaseModel.js"
import { ImagemModel } from "../models/ImagemModel.js"
import { ItemSeminovoModel } from "../models/ItemSeminovoModel.js"
import { ModeloModel } from "../models/ModeloModel.js"
import { MotorModel } from "../models/MotorModel.js"
import { PrecoModel } from "../models/PrecoModel.js"
import { PropulsaoModel } from "../models/PropulsaoModel.js"
import { CombustivelRepository } from "../repository/CombustivelRepository.js"
import { ImagemRepository } from "../repository/ImagemRepository.js"
import { ItemSeminovoRepository } from "../repository/ItemSeminovoRepository.js"
import { ModeloMotorRepository } from "../repository/ModeloMotorRepository.js"
import { ModeloRepository } from "../repository/ModeloRepository.js"
import { MoedaRepository } from "../repository/MoedaRepository.js"
import { PropulsaoRepository } from "../repository/PropulsaoRepository.js"

const combustivelModel = new CombustivelModel()
const modeloModel = new ModeloModel()
const motorModel = new MotorModel()
const propulsaoModel = new PropulsaoModel()
const itemSeminovoModel = new ItemSeminovoModel()
const imagemModel = new ImagemModel()

export class BarcoSeminovoResourcesService {
    async listCombustivel() {
        const result = await combustivelModel.listCombustivel(new CombustivelRepository())
        return result
    }
    async listModelo() {
        const result = await modeloModel.listModelo(new ModeloRepository())
        return result
    }
    async listModeloMotor() {
        const modeloMotorList = await motorModel.listMotor(new ModeloMotorRepository())
        return modeloMotorList
    }
    async listPropulsao() {
        const result = await propulsaoModel.listPropulsao(new PropulsaoRepository())
        return result
    }
    async listItemSeminovo(){
        const result = await itemSeminovoModel.listItemSeminovo(new ItemSeminovoRepository)
        return result
    }
    async listImagensByIdSeminovo(idSeminovo: number){
        const result = await imagemModel.getImagesByIdSeminovo(idSeminovo, new ImagemRepository())
        return result
    }
   async deleteImagesFromFirebase(images:[]){
        try {
            imagemModel.deleteImagesFromFirebase(images, new FirebaseModel)
        } catch (error: any) {
            throw new CustomError(error.message, 500)
        }
  
   }
}