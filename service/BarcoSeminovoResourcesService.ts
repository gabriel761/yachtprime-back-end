import { CustomError } from "../infra/CustoError.ts"
import { CombustivelModel } from "../models/CombustivelModel.ts"
import { FirebaseModel } from "../models/external/FirebaseModel.ts"
import { ImagemModel } from "../models/ImagemModel.ts"
import { ItemSeminovoModel } from "../models/ItemSeminovoModel.ts"
import { ModeloModel } from "../models/ModeloModel.ts"
import { MotorModel } from "../models/MotorModel.ts"
import { PrecoModel } from "../models/PrecoModel.ts"
import { PropulsaoModel } from "../models/PropulsaoModel.ts"
import { CombustivelRepository } from "../repository/CombustivelRepository.ts"
import { ImagemRepository } from "../repository/ImagemRepository.ts"
import { ItemSeminovoRepository } from "../repository/ItemSeminovoRepository.ts"
import { ModeloMotorRepository } from "../repository/ModeloMotorRepository.ts"
import { ModeloRepository } from "../repository/ModeloRepository.ts"
import { MoedaRepository } from "../repository/MoedaRepository.ts"
import { PropulsaoRepository } from "../repository/PropulsaoRepository.ts"

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