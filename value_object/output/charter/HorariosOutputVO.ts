import { CustomError } from "../../../infra/CustoError.js";
import { Horarios } from "../../../types/charter/Horarios.js";


export class HorariosOutputVO {
    private id!: number;
    private horaInicio!: string;
    private horarioFim!: string;

    constructor() { }

    setId(id: number) {
        this.id = id;
    }

    setHoraInicio(horaInicio: string) {
        this.horaInicio = horaInicio;
    }

    setHorarioFim(horarioFim: string) {
        this.horarioFim = horarioFim;
    }

    extractData(): Horarios {
        return {
            id: this.id,
            horaInicio: this.horaInicio,
            horarioFim: this.horarioFim
        };
    }
}
