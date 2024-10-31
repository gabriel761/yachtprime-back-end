export class MotorDto {
    constructor(
       public modelo: string,
       public quantidade: number,
       public potencia: number,
       public horas: number,
       public ano: number,
       public observacoes?: string,
    ){

    }
}