import { TripulacaoSkipperRepository } from "../../repository/charter/TripulacaoSkipperRepo.js";

export class TripulacaoSkipperModel {
    async getIdTripulacaoSkipperByString(tripulacaoSkipper:string, tripulacaoSkipperRepository: TripulacaoSkipperRepository){
        const idTripulacaoSkipper = await tripulacaoSkipperRepository.getIdTripulacaoSkipperByString(tripulacaoSkipper)
        return idTripulacaoSkipper
    }
}