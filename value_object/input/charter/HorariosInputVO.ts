import { CustomError } from "../../../infra/CustoError.js";
import { HorariosInput } from "../../../types/charter/Horarios.js";
import { validateIntegerPositiveNumber, validateString } from "../../../util/validationUtil.js";


export class HorariosInputVO {
    private id!: number;
    private horarioInicio!: string;
    private horarioFim!: string;

    constructor() { }

    setId(id: number) {
        validateIntegerPositiveNumber(id, "id", "Horários")
        this.id = id;
    }

    setHoraInicio(horaInicio: string) {
        validateString(horaInicio, "hora início", "Horários")
        this.horarioInicio = horaInicio;
    }

    setHorarioFim(horarioFim: string) {
        validateString(horarioFim, "hora fim", "Horários")
        this.horarioFim = horarioFim;
    }

    extractData(): HorariosInput {
        return {
            id: this.id,
            horarioInicio: this.horarioInicio,
            horarioFim: this.horarioFim
        };
    }
}
