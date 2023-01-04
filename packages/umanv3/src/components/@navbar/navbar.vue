<template>
  <div 
    class="navbar"
  >
    <div 
      class="nav-container"
    >
      <ul>
        <li>
          <button
            class="cmg-actions-plus cmg-btn cmg-more-actions"
            @click.stop="menuPlusButton = !menuPlusButton"
          >
            <span class="icon">
              <component :is="IconPlusIcon" />
            </span>
          </button>
        </li>
      </ul>
      <ul>
        <li 
          v-for="(item, index) in items"
          :key="index"
        >
          <router-link 
            :to="item.to" 
            class="router-class"
          >
            <div id="pic">
              <component :is="item.icon" />
            </div>
            <span>
              {{ item.label }}
            </span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconCalendar from "@/assets/img/navbar/calendar.svg";
import IconDepartureArrivals from "@/assets/img/navbar/departure-arrivals.svg";
import IconHousings from "@/assets/img/navbar/housings.svg";
import IconPlusIcon from "@/assets/img/navbar/plus-icon.svg";
import IconPricing from "@/assets/img/navbar/pricing.svg";
import IconReservation from "@/assets/img/navbar/reservation.svg";
import IconTodo from "@/assets/img/navbar/todo.svg";
import { useAdminStore } from "@/stores/admin";
import { ref } from "vue";

interface Item {
  to: string;
  icon: string;
  label: string;
  name: string;
  is_active: boolean;
}

const adminStore = useAdminStore();

const menuPlusButton = ref(false);
let items: Item[] = [
  {
    to: "/event",
    icon: IconReservation,
    label: "Événements",
    is_active: true,
    name: "Event",
  },
  {
    to: "/reservation",
    icon: IconDepartureArrivals,
    label: "Départs - Arrivées",
    is_active: false,
    name: "Reservation",
  },
  {
    to: "/housing",
    icon: IconHousings,
    label: "Logements",
    is_active: false,
    name: "Housing",
  },
  {
    to: "/calendar",
    icon: IconCalendar,
    label: "Calendrier",
    is_active: false,
    name: "Calendar",
  },
  {
    to: "/blender",
    icon: IconTodo,
    label: "Todo",
    is_active: false,
    name: "Blender",
  },
  {
    to: "/price",
    icon: IconPricing,
    label: "Prix",
    is_active: false,
    name: "Price",
  },
];
</script>

<style lang="scss" scoped src="./style.scss"></style>
