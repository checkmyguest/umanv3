/* eslint-disable no-unused-vars */
import { Reservation } from "./reservation";

export interface IReservationData {
  getReservation(): Promise<Reservation[]>;
  setReservation(reservation: Reservation): Promise<void>;
}
