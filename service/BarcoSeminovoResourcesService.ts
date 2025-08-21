import { CustomError } from "../infra/CustoError.js"
import { CombustivelModel } from "../models/seminovo/CombustivelModel.js"
import { FirebaseModel } from "../models/external/FirebaseModel.js"
import { ImagemModel } from "../models/ImagemModel.js"
import { ItemSeminovoModel } from "../models/seminovo/ItemSeminovoModel.js"
import { ModeloModel } from "../models/ModeloModel.js"
import { MotorModel } from "../models/MotorModel.js"
import { PropulsaoModel } from "../models/seminovo/PropulsaoModel.js"
import { CombustivelRepository } from "../repository/seminovo/CombustivelRepository.js"
import { ImagemRepository } from "../repository/ImagemRepository.js"
import { ItemSeminovoRepository } from "../repository/seminovo/ItemSeminovoRepository.js"
import { ModeloMotorRepository } from "../repository/ModeloMotorRepository.js"
import { ModeloRepository } from "../repository/ModeloRepository.js"
import { PropulsaoRepository } from "../repository/seminovo/PropulsaoRepository.js"

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
            imagemModel.deleteImagesFromFirebase(images, new FirebaseModel, "seminovos")
        } catch (error: any) {
            throw new CustomError(error.message, 500)
        }
  
   }
}