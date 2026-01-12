import { BarcoCharterModel } from "../models/charter/BarcoCharterModel.js"
import { FirebaseModel } from "../models/external/FirebaseModel.js"
import { FormModel } from "../models/external/FormModel.js"
import { ModeloModel } from "../models/ModeloModel.js"
import { MotorModel } from "../models/MotorModel.js"
import { PrecoModel } from "../models/PrecoModel.js"
import { ProprietarioModel } from "../models/ProprietarioModel.js"
import { ModeloMotorRepository } from "../repository/ModeloMotorRepository.js"
import { ModeloRepository } from "../repository/ModeloRepository.js"
import { MoedaRepository } from "../repository/MoedaRepository.js"
import { ProprietarioRepository } from "../repository/ProprietarioRepository.js"
import { Form } from "../types/Form.js"
import { Modelo } from "../types/Modelo.js"
import { Proprietario, ProprietarioWithUsers } from "../types/Proprietario.js"
import { Motor } from "../types/seminovo/Motor.js"
import { ProprietarioInputVO } from "../value_object/input/ProprietarioInputVO.js"
import { BarcoCharterService } from "./BarcoCharterService.js"
import BarcoSeminovoService from "./BarcoSeminovoService.js"

const precoModel = new PrecoModel()
const formModel = new FormModel()
const modeloModel = new ModeloModel()
const motorModel = new MotorModel()
const proprietarioModel = new ProprietarioModel()

export class ResourcesService {

    async listModeda() {
        const result = precoModel.listMoeda(new MoedaRepository())
        return result
    }

    async formularioContato(formData: Form) {
        const result = formModel.enviarEmail(formData)
        return result
    }

    async insertModelo(modelo: Modelo) {
        await modeloModel.insertModelo(new ModeloRepository(), modelo)
    }

    async insertModeloMotor(motor: Motor) {
        await motorModel.insertModeloMotor(new ModeloMotorRepository(), motor)
    }

    async searchProprietario(nome: string, firebaseId: string) {
        const result = await proprietarioModel.getProprietariosByName(nome, firebaseId, new ProprietarioRepository())
        return result
    }

    async listProprietariosDashboard() {
        const result = await proprietarioModel.listProprietariosDashboard( new ProprietarioRepository())
        return result
    }
    async listAllBoatsFromProprietario(idProprietario: number){
      const result = await  proprietarioModel.listAllBoatsFromProprietario(idProprietario,new ProprietarioRepository)
      return result
    }
    async insertProprietario(proprietario:Proprietario){
        await proprietarioModel.saveProprietario(proprietario, new ProprietarioRepository())
    }

    async getProprietario(id: number) {
        const result = await proprietarioModel.getProprietarioById(id, new ProprietarioRepository())
        return result
    }

    async getProprietarioDashboard(id: number) {
        const result = await proprietarioModel.getProprietarioDashboardById(id, new ProprietarioRepository())
      return result
    }

    async updateProprietario(proprietario: ProprietarioWithUsers) {
        const validatedProprietario = proprietarioModel.validateProprietarioObject(proprietario, new ProprietarioInputVO)
        await proprietarioModel.deleteAllAssotiationWithUser(new ProprietarioRepository(), proprietario.id)
        await proprietarioModel.associateProprietarioWithUsers(proprietario, new ProprietarioRepository())
        await proprietarioModel.updateProprietario(validatedProprietario, new ProprietarioRepository())
    }

    async deleteProprietarioAndAllAssociatedBoats(idProprietario:number, charterService: BarcoCharterService, seminovoService: BarcoSeminovoService, firebaseModel: FirebaseModel){
        const associatedBoatsList = await proprietarioModel.listAllBoatsFromProprietario(idProprietario, new ProprietarioRepository())
        const deletePromises = associatedBoatsList.map(async (barco)=> {
            if(barco.tipo == "charter"){
                await charterService.deleteBarcoCharter(barco.id, firebaseModel)
            }
            if(barco.tipo == "seminovo"){
              await  seminovoService.deleteBarcoSeminovo(barco.id, firebaseModel)
            }
        })
        await Promise.all(deletePromises)
        await proprietarioModel.deleteAllAssotiationWithUser(new ProprietarioRepository(), idProprietario)
        await proprietarioModel.deleteProprietario(idProprietario, new ProprietarioRepository())
    }
}