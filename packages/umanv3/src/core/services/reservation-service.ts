import { injectable } from "inversify";
import { Reservation } from "../@models/reservation";
import { IReservationData } from "../@models/reservation-database";

@injectable()
export class ReservationServiceData implements IReservationData{
    public getReservation(): Promise<Reservation[]> {
        throw new Error("Method not implemented.");
    }
    public setReservation(reservation: Reservation): Promise<void> {
        throw new Error("Method not implemented.");
    }  
}