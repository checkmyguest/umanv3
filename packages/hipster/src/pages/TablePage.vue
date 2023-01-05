<script setup lang="ts">
import DropdownVue, { Actions } from "@/components/dropdown/dropdown-vue.vue";
import InputSearchVue from "@/components/input-search/input-search-vue.vue";
import { dataFormatterEvent } from "@/components/table/dataFormatter";
import DataSample from "@/components/table/data_example2.json";
import TableVue from "@/components/table/index.vue";
import { ref } from "vue";
import { EVENT_COLUMNS } from "../../constants";

const columnsFormat = EVENT_COLUMNS;

function newEvent() {
  console.log("New Event");
}

function newUnavailability() {
  console.log("New Unavailability");
}

const actions: Actions[] = [
  { name: "Nouvelle réservation", function: newEvent },
  { name: "Nouvelle indisponibilité", function: newUnavailability },
];

const action: Actions = { name: "Filter", function: newEvent };

const dataSample = dataFormatterEvent(DataSample);

const search = ref("");

function getSearch(searchKey: string) {
  search.value = searchKey;
}
</script>
<template>
  <div class="playground">
    <div class="card">
      <div class="section">
        <div class="button-container">
          <InputSearchVue
            ref="inputSearch"
            :modelValue="search"
            :getValue="getSearch"
          />
          <DropdownVue
            type="secondary"
            text="Filter"
            id="newUnavaibility"
            iconLeft="Filter"
            :actions="actions"
          />
          <DropdownVue
            type="primary"
            text="Nouvelle événement"
            id="newEvent"
            :actions="actions"
          />
        </div>
        <TableVue
          :columns="columnsFormat"
          :dataTable="dataSample"
          :searchItem="search"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 90vw;
  height: 70vh;
  .section {
    @apply flex flex-col items-center justify-center;
    width: 95%;
    height: 95%;
    .button-container {
      @apply flex justify-end items-center w-full;
      gap: 16px;
      height: 26px;
      margin-bottom: 16px;
    }
  }
}
</style>
