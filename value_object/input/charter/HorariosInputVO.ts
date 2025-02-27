import { CustomError } from "../../../infra/CustoError.js";
import { Horarios } from "../../../types/charter/Horarios.js";
import { validateIntegerPositiveNumber, validateString } from "../../../util/validationUtil.js";


export class HorariosInputVO {
    private id!: number;
    private horaInicio!: string;
    private horarioFim!: string;

    constructor() { }

    setId(id: number) {
        validateIntegerPositiveNumber(id, "id", "Horários")
        this.id = id;
    }

    setHoraInicio(horaInicio: string) {
        validateString(horaInicio, "hora início", "Horários")
        this.horaInicio = horaInicio;
    }

    setHorarioFim(horarioFim: string) {
        validateString(horarioFim, "hora fim", "Horários")
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
