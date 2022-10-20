<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { Reservation } from '../../../core/@models/reservation';
import { ReservationServiceData } from '../../../core/services/reservation-service';
import { useReservationStore } from '../../../stores/fake-use-reservation';

  const storeReservation = useReservationStore();
  const { reservation } = storeToRefs(storeReservation);
  const reservationContainer: Reservation[] = [];
  const hello = "This is a message";
  const entree = ref('');
  const reservationServiceData = new ReservationServiceData();
  function loadReservation(): Promise<void>{
    return reservationServiceData.getReservation().then((result)=>{
      storeReservation.createNewItem(result);
      return;
    })
  }
  Promise.all([
    loadReservation()
  ]);
  function envoieUnNom(){
    reservationContainer.splice(0, reservationContainer.length);
    reservationContainer.push({
      test1: entree.value,
      test2: 99
    });
    storeReservation.createNewItem(reservationContainer);
  }
</script>

<template>
  <div>
    <h1>Calendar</h1>
    <p>{{ hello }}</p>
    <el-input
      v-model="entree"
      placeholder="Please input"
    />
    <button @click="envoieUnNom">
      Click Me
    </button>
    <p
      v-for="(item, index) in reservation"
      :key="index"
    >
      {{ item }}
    </p>
  </div>
</template>
