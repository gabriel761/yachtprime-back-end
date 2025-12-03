import { ProprietarioRepository } from "../repository/ProprietarioRepository.js";
import {Proprietario, ProprietarioWithUsers } from "../types/Proprietario.js";
import { ProprietarioInputVO } from "../value_object/input/ProprietarioInputVO.js";

export class ProprietarioModel {
    async getProprietarioById(id: number, proprietarioRepository: ProprietarioRepository) {
        const result = await proprietarioRepository.getProprietarioById(id)
        return result
    }
    async getProprietarioDashboardById(id: number, proprietarioRepository: ProprietarioRepository) {
        const result = await proprietarioRepository.getProprietarioDashboardById(id)
        return result
    }
    async listProprietariosDashboard(proprietarioRepository: ProprietarioRepository) {
        const result = await proprietarioRepository.listProprietariosDashboard()
        return result
    }
    async listAllBoatsFromProprietario(idProprietario: number,proprietarioRepository: ProprietarioRepository){
      const result =  await proprietarioRepository.listAllBoatsFromProprietario(idProprietario)
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
    async associateProprietarioWithUser(userId: number, proprietarioId: number,  proprietarioRepository: ProprietarioRepository) {
        await proprietarioRepository.associateProprietarioWithUser(userId, proprietarioId)
    }
    async associateProprietarioWithUsers( proprietario: ProprietarioWithUsers, proprietarioRepository: ProprietarioRepository){
        if (proprietario.usuarios?.length) {
            const promises = proprietario.usuarios.map(user =>
               proprietarioRepository.associateProprietarioWithUser(user.id, proprietario.id)
            )

        await Promise.all(promises)
        }
 
    }
    async updateProprietario(proprietario: Proprietario, proprietarioRepository: ProprietarioRepository) {
        const idProprietario = await proprietarioRepository.updateProprietario(proprietario)
        return idProprietario
    }
    async deleteAllAssotiationWithUser(proprietarioRepository: ProprietarioRepository, idProprietario?: number,){
        await proprietarioRepository.deleteAllAssociationWithUser(idProprietario)
    }
    async deleteProprietario(idProprietario: number, proprietarioRepository: ProprietarioRepository){
       await proprietarioRepository.deleteProprietario(idProprietario)
    }

    validateProprietarioObject(proprietario: ProprietarioWithUsers, proprietarioVO: ProprietarioInputVO){
        proprietarioVO.setId(proprietario.id)
        proprietarioVO.setNome(proprietario.nome)
        proprietarioVO.setEmail(proprietario.email)
        proprietarioVO.setTelefone(proprietario.telefone)
        proprietarioVO.setUsuarios(proprietario.usuarios)

        return proprietarioVO.extractDataWithIdAndUsers()
    }
}