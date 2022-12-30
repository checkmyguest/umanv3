import { injectable } from "inversify";
import { Reservation } from "../@models/reservation";
import { IReservationData } from "../@models/reservation-database";

@injectable()
export class ReservationServiceMock implements IReservationData{
    getReservation(): Promise<Reservation[]> {
        const reservation: Reservation[] = [];
        reservation.push(new Reservation("hello", 123));
        return Promise.resolve(reservation);
    }
    setReservation(_reservation: Reservation): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
