<script setup lang="ts">
import UmanCalendar from "@/assets/img/navbar/calendar.svg";
import UmanDepartureArrivals from "@/assets/img/navbar/departure-arrivals.svg";
import UmanLogements from "@/assets/img/navbar/housings.svg";
import UmanPrix from "@/assets/img/navbar/pricing.svg";
import UmanEvenement from "@/assets/img/navbar/reservation.svg";
import UmanTodo from "@/assets/img/navbar/todo.svg";
import { useRoute } from "vue-router";

interface Item {
  to: string;
  icon: string;
  label: string;
  name: string;
  is_active: boolean;
}

const route = useRoute();

let items: Item[] = [
  {
    to: "/event",
    icon: UmanEvenement,
    label: "Événements",
    is_active: false,
    name: "Event",
  },
  {
    to: "/reservation",
    icon: UmanDepartureArrivals,
    label: "Départs - Arrivées",
    is_active: false,
    name: "Reservation",
  },
  {
    to: "/housing",
    icon: UmanLogements,
    label: "Logements",
    is_active: false,
    name: "Housing",
  },
  {
    to: "/calendar",
    icon: UmanCalendar,
    label: "Calendrier",
    is_active: false,
    name: "Calendar",
  },
  {
    to: "/blender",
    icon: UmanTodo,
    label: "Todo",
    is_active: false,
    name: "Blender",
  },
  {
    to: "/price",
    icon: UmanPrix,
    label: "Prix",
    is_active: false,
    name: "Price",
  },
];

function activeNav(event: any) {
  // items.forEach((item) =>{
  //     if(item.name === route.name){
  //         item.is_active = true
  //     }else
  //         item.is_active = false;
  // });
  console.log(route.matched[0].name);
}
</script>

<template>
  <div class="navbar">
    <div class="nav-container">
      <ul>
        <li>
          <button
            class="cmg-actions-plus cmg-btn cmg-more-actions vertical my-4 mx-auto bg-blue-600 border-blue-600"
          >
            <img src='@/assets/img/navbar/plus-icon.svg' alt="plus-icon"/>
          </button>
        </li>
      </ul>
      <ul>
        <li v-for="item in items">
          <router-link
            :to="item.to"
            class="router-class"
            :class="{ active: item.is_active }"
            v-on:click="activeNav($route.name)"
            v-cloak
          >
            <div class="pic">
              <component v-bind:is="item.icon" />
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./style.scss"></style>
