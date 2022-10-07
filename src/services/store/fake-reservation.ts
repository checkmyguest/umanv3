import { defineStore } from "pinia";
import { Reservation } from "../../core/@models/reservation";

export type RootState = {
    reservation: Reservation[];
}

export const useReservationStore = defineStore({
    id: "fake-reservation",
    state: () => ({
        reservation: []
    } as RootState)
});