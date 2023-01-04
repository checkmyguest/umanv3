<template>
  <div class="menu-plus bg-white rounded-lg shadow border w-60 absolute left-2 top-12 z-10">
    <div
      v-for="(col, i) in menuPlusContent"
      :key="i"
      class="border-b px-4 pb-3"
    >
      <h5 class="my-3">
        {{ col.title }}
      </h5>
      <div
        v-for="(item, j) in col.items"
        :key="j"
        class="flex items-center mb-1.5 h-7"
      >
        <IconReservation
          v-if="item.svg === 'IconReservation'"
          class="w-6 mr-1"
        />
        <IconIndispo
          v-if="item.svg === 'IconIndispo'"
          class="w-6 mr-1"
        />
        <!-- <IconRunner
          v-if="item.svg === 'IconRunner'"
          class="w-6 mr-1"
        />
        <IconMaintenance
          v-if="item.svg === 'IconMaintenance'"
          class="w-6 mr-1"
        /> -->
        <IconTodo
          v-if="item.svg === 'IconTodo'"
          class="w-6 mr-1 h-4"
        />
        <IconCleaning
          v-if="item.svg === 'IconCleaning'"
          class="w-6 mr-1"
        />
        <IconService
          v-if="item.svg === 'IconService'"
          class="w-6 mr-1 h-4"
        />
        <div
          v-if="item.svg === 'IconMission'"
          class="w-6 mr-1 h-4 flex items-center justify-center"
        >
          <IconMission style="width: 0.9rem" />
        </div>
        <a
          class="font-regular-13 cursor-pointer"
          @click="openModal(item.action), $emit('openedModal')"
        >
          {{ item.text }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import IconCleaning from "~/assets/img/navbar/menuplus/cleaning.svg?inline"
import IconIndispo from "~/assets/img/navbar/menuplus/indispo.svg?inline"
import IconMission from "~/assets/img/navbar/menuplus/mission.svg?inline"
import IconReservation from "~/assets/img/navbar/menuplus/reservation.svg?inline"
import IconService from "~/assets/img/navbar/menuplus/service.svg?inline"
import IconTodo from "~/assets/img/navbar/todo.svg?inline"

export default {
  components: {
    IconReservation,
    IconIndispo,
    IconCleaning,
    IconService,
    IconTodo,
    IconMission,
  },
  props: ["menuPlusContent", "openModal"],
}
</script>

<style lang="scss" scoped>
.menu-plus {
  div {
    div {
      svg {
        path {
          fill: #000;
        }
      }
    }
  }
  .items-center {
    border-radius: 2px;
    &:hover {
      background: $sky-light;
    }
  }
}
</style>
