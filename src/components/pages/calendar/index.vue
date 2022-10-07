<script lang="ts" setup>
import { Reservation } from '../../../core/@models/reservation';
import { ReservationServiceData } from '../../../core/services/reservation-service';

  const hello = "This is a message"
  const reservationServiceData = new ReservationServiceData();
  const reservation: Reservation[] = [];
  
  function loadReservation(): Promise<Reservation[]>{
    return reservationServiceData.getReservation().then((values)=>{
      for (const value of values) {
        reservation.push({
          test1: value.test1,
          test2: value.test2
        })
      }
      return reservation;
    });
  }
  Promise.all([
    loadReservation()
  ]);
  
</script>
<template>
  <div>
    <h1>Calendar</h1>
    <p>{{ hello }}</p>
    <button @click="loadReservation()">
      Click Me
    </button>
    <p>{{ reservation[0] }}</p>
  </div>
</template>
