<script setup lang="ts">
import { ReservationServiceData } from "../../core/services/reservation-service";

const reservationServiceData = new ReservationServiceData();
function injection() {
  reservationServiceData.getReservation().then((value) => {
    console.log(value);
  });
}
injection();
const test = "On teste un bail ici";
</script>

<template>
  <h1>{{ test }}</h1>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 3rem;
}
</style>
