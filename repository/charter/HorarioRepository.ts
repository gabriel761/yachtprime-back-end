import { CustomError } from "../../infra/CustoError.js";
import db from "../../infra/database.js";
import { HorariosDb, HorariosInput } from "../../types/charter/Horarios.js";

export class HorarioRepository {
    async getHorarioRepositoryByIdPasseio(idPasseio: number):Promise<HorariosDb[]> {
        const result = await db.query("SELECT * FROM horarios_disponiveis WHERE id_passeio = $1", [idPasseio])
            .catch((error) => {
                throw new CustomError(`Repository lever Error: HorarioRepository getHorarioRepositoryByIdPasseio: ${error}`, 500)
            });
            if(result.length == 0){
                throw new CustomError(`Não foram encontrados horários disponíveis para o passeio`, 500)
            }
            return result
    }

    async postHorario(horario: HorariosInput){
        db.query("INSERT INTO horarios_disponiveis (horario_inicio, horario_fim) VALUES ($1, $2)",[horario.horarioInicio, horario.horarioFim])
    }
}