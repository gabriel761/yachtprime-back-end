import { FormModel } from "../models/external/FormModel.js"
import { PrecoModel } from "../models/PrecoModel.js"
import { MoedaRepository } from "../repository/MoedaRepository.js"
import { Form } from "../types/Form.js"

const precoModel = new PrecoModel()
const formModel = new FormModel()

export class ResourcesService {
    
    async listModeda() {
        const result = precoModel.listMoeda(new MoedaRepository())
        return result
    }

    async formularioContato(formData: Form) {
        const result = formModel.enviarEmail(formData)
        return result
    }
}