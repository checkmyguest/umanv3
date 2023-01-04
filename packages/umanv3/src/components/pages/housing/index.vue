<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from '../../../stores/fake-use-variable';

const main = useMainStore();
const { items, test, cpt } = storeToRefs(main);
let menuPlusButton = false;
function toggle(){
  console.log(menuPlusButton);
  menuPlusButton = !menuPlusButton;
  console.log(menuPlusButton);
}
</script>

<template>
  <div>
    <h1>Housing</h1>
    <h1>{{ cpt }}</h1>
    <button @click="toggle">
      Toggle !
    </button>
    <Teleport 
      to="#app"
    >
      <div 
        v-if="menuPlusButton"
        class="menu"
      >
        <h1>Hello</h1>
      </div>
    </Teleport>
  </div>
</template>

<style lang="scss" src="./style.scss" scoped></style>