import { ProprietarioRepository } from "../repository/ProprietarioRepository.js";
import {Proprietario } from "../types/Proprietario.js";
import { ProprietarioInputVO } from "../value_object/input/ProprietarioInputVO.js";

export class ProprietarioModel {
    async getProprietarioById(id: number, proprietarioRepository: ProprietarioRepository) {
        const result = proprietarioRepository.getProprietarioById(id)
        return result
    }
    async listProprietariosDashboard(proprietarioRepository: ProprietarioRepository) {
        const result = await proprietarioRepository.listProprietariosDashboard()
        return result
    }
    async getProprietariosByName(nome: string, firebaseId:string, proprietarioRepository: ProprietarioRepository){
        const result = proprietarioRepository.getProprietariosByName(nome, firebaseId)
        return result
    }
    async saveProprietario(proprietario: Proprietario, proprietarioRepository: ProprietarioRepository){
        const idProprietario = await proprietarioRepository.insertProprietario(proprietario)
        return idProprietario
    }
    async associateProprietarioWithUser(idUser: number, idProprietario: number, proprietarioRepository: ProprietarioRepository){
        await proprietarioRepository.associateProprietarioWithUser(idUser, idProprietario)
    }
    async updateProprietario(proprietario: Proprietario, proprietarioRepository: ProprietarioRepository) {
        const idProprietario = await proprietarioRepository.updateProprietario(proprietario)
        return idProprietario
    }
    async deleteProprietario(idProprietario: number, proprietarioRepository: ProprietarioRepository){
       await proprietarioRepository.deleteProprietario(idProprietario)
    }

    validateProprietarioObject(proprietario: Proprietario, proprietarioVO: ProprietarioInputVO){
        proprietarioVO.setId(proprietario.id)
        proprietarioVO.setNome(proprietario.nome)
        proprietarioVO.setEmail(proprietario.email)
        proprietarioVO.setTelefone(proprietario.telefone)

        return proprietarioVO.extractDataWithId()
    }
}