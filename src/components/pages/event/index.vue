<template>
  <h1>Event</h1>
</template>

<script lang="ts" setup>
import { ViewServiceData } from "@/core/services/view-service";

const viewServiceData = new ViewServiceData();

function getSwapi(){
  return viewServiceData.getSwapi()
    .then(swapi => {
      return swapi.data;
    })
    .catch((res) => {
      console.error(res);
    })
}

console.log(getSwapi());

</script>