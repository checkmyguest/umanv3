<template>
  <div>
    <h1>Event</h1>
    <TableVue :dataTable="data" :columns="columns" :search-item="searchItem"/>
  </div>
</template>

<script lang="ts">
import { EVENT_COLUMNS } from "hipster/constants";
import { dataFormatterEvent } from "hipster/src/components/table//dataFormatter";
import DataSample from "hipster/src/components/table//data_example2.json";
import TableVue from "hipster/src/components/table/index.vue";

const dataSample = dataFormatterEvent(DataSample);

export default{
  components: {
    TableVue
  },
  data(){
    return{
      data: dataSample,
      columns: EVENT_COLUMNS,
      searchItem: ''
    }
  }
}
</script>