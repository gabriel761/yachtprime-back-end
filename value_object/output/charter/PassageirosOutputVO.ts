import { CustomError } from "../../../infra/CustoError.js";
import { Passageiros } from "../../../types/charter/Passageiros.js";


export class PassageirosOutputVO {
    private id!: number;
    private passageiros!: number;
    private passageirosPernoite!: number | null;
    private tripulacao!: number;

    constructor() { }

    setId(id: number) {
        this.id = id;
    }

    setPassageiros(passageiros: number) {
        this.passageiros = passageiros;
    }

    setPassageirosPernoite(passageirosPernoite: number | null) {
        this.passageirosPernoite = passageirosPernoite;
    }

    setTripulacao(tripulacao: number) {
        this.tripulacao = tripulacao;
    }

    extractData(): Passageiros {
        return {
            id: this.id,
            passageiros: this.passageiros,
            passageirosPernoite: this.passageirosPernoite,
            tripulacao: this.tripulacao
        };
    }
}
