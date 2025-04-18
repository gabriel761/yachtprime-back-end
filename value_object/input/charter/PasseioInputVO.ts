import { CustomError } from "../../../infra/CustoError.js";
import { Condicao } from "../../../types/charter/Condicoes.js";
import { HorariosInput } from "../../../types/charter/Horarios.js";
import { LocalEmbarqueInput, LocalEmbarqueOutput } from "../../../types/charter/LocalEmbarque.js";
import { PasseioInput } from "../../../types/charter/Roteiro.js";
import { validateIntegerPositiveNumber, validateString } from "../../../util/validationUtil.js";


export class PasseioInputVO {
    private id!: number;
    private tipoPasseio!: string;
    private embarquePrincipal!: LocalEmbarqueInput;
    private embarquesAlternativos!: LocalEmbarqueInput[];
    private horarios!: HorariosInput[];
    private duracaoPasseio!: number;
    private tripulacaoSkipper!: string;
    private condicoes!: Condicao[]

    constructor() { }

    setId(id: number) {
       validateIntegerPositiveNumber(id, "id", "Passeio")
        this.id = id;
    }

    setTipoPasseio(tipoPasseio: string) {
        validateString(tipoPasseio, "tipoPasseio", "Passeio")
        this.tipoPasseio = tipoPasseio;
    }

    setEmbarquePrincipal(embarquePrincipal: LocalEmbarqueInput) {
       if(!this.tipoPasseio) throw new CustomError("PasseioVO: Embarque principal inválido", 500)
        this.embarquePrincipal = embarquePrincipal;
    }

    setEmbarquesAlternativos(embarquesAlternativos: LocalEmbarqueInput[]) {
       embarquesAlternativos.forEach(item => {
           if (!this.tipoPasseio) throw new CustomError("PasseioVO: Embarque principal inválido", 500)
       });
        this.embarquesAlternativos = embarquesAlternativos;
    }

    setHorarios(horarios: HorariosInput[]) {
        if (!horarios || typeof horarios !== "object") {
            throw new CustomError("Horários inválidos", 400);
        }
        this.horarios = horarios;
    }

    setDuracaoPasseio(duracaoPasseio: number) {
        validateIntegerPositiveNumber(duracaoPasseio, 'duracaoPasseio', 'Passeio')
        this.duracaoPasseio = duracaoPasseio;
    }

    setTripulacaoSkipper(tripulacaoSkipper: string) {
        validateString(tripulacaoSkipper, 'tripulacaoSkipper', 'Passeio')
        this.tripulacaoSkipper = tripulacaoSkipper;
    }

    extractData(): PasseioInput {
        return {
            id: this.id,
            tipoPasseio: this.tipoPasseio,
            embarquePrincipal: this.embarquePrincipal,
            embarquesAlternativos: this.embarquesAlternativos,
            horarios: this.horarios,
            duracaoPasseio: this.duracaoPasseio,
            tripulacaoSkipper: this.tripulacaoSkipper,
            condicoes: this.condicoes
        };
    }
}
