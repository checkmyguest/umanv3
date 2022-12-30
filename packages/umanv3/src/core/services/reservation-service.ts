/* eslint-disable no-unused-vars */
import { injectable } from "inversify";
import { Reservation } from "../@models/reservation";
import { IReservationData } from "../@models/reservation-database";

@injectable()
export class ReservationServiceData implements IReservationData{
    public async setReservation(reservation: Reservation): Promise<void> { 
        //api request
        throw new Error("Method not implemented.");
    }
    public async getReservation(): Promise<Reservation[]> {
        const reservation: Reservation[] = [];
        reservation.push(new Reservation("Nguyen", 22));
        return reservation;
    }
}
