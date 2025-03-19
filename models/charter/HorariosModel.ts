import { HorarioRepository } from "../../repository/charter/HorarioRepository.js";
import { HorariosInput, HorariosOutput } from "../../types/charter/Horarios.js";


export class HorariosModel {
    async getHorariosByIdPasseio (idPasseio: number, horarioRepository:HorarioRepository){
       const horariosDb  = await horarioRepository.getHorarioRepositoryByIdPasseio(idPasseio)
       const horariosArray: HorariosOutput[] = horariosDb.map((item):HorariosOutput => {
            const horario: HorariosOutput = {
                id: item.id,
                idPasseio: item.id_passeio,
                horarioInicio: item.horario_inicio,
                horarioFim: item.horario_fim
            }
            return horario
       })
       return horariosArray
    }

    async postHorariosPasseio(horarios: HorariosInput[], horarioRepository: HorarioRepository, idPasseio: number){
        for (let i = 0; i < horarios.length; i++) {
            const horario = horarios[i]
            await horarioRepository.postHorario(idPasseio,horario)
            
        }
       
    }
}