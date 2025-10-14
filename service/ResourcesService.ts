import { FormModel } from "../models/external/FormModel.js"
import { ModeloModel } from "../models/ModeloModel.js"
import { MotorModel } from "../models/MotorModel.js"
import { PrecoModel } from "../models/PrecoModel.js"
import { ModeloMotorRepository } from "../repository/ModeloMotorRepository.js"
import { ModeloRepository } from "../repository/ModeloRepository.js"
import { MoedaRepository } from "../repository/MoedaRepository.js"
import { Form } from "../types/Form.js"
import { Modelo } from "../types/Modelo.js"
import { Motor } from "../types/seminovo/Motor.js"

const precoModel = new PrecoModel()
const formModel = new FormModel()
const modeloModel = new ModeloModel()
const motorModel = new MotorModel()

export class ResourcesService {
    
    async listModeda() {
        const result = precoModel.listMoeda(new MoedaRepository())
        return result
    }

    async formularioContato(formData: Form) {
        const result = formModel.enviarEmail(formData)
        return result
    }

    async insertModelo (modelo: Modelo){
        console.log(modelo)
       await modeloModel.insertModelo(new ModeloRepository() ,modelo)
    }

    async insertModeloMotor(motor: Motor) {
        await motorModel.insertModeloMotor(new ModeloMotorRepository(), motor)
    }
}