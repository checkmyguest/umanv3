<script setup lang="ts">
import { ref } from "vue";
import SvgIcon from "../global-component/SvgIcon/svg-icon.vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: false
  },
  getValue: {
    type: Function,
    required: true,
  }
});

const text = ref(props.modelValue);
const clearInput = () => {
  text.value = "";
  props.getValue(text.value);
};
</script>
<template>
  <div class="input-container">
    <SvgIcon class="icon-input input-svg" name="Search" />
    <input
      v-model="text"
      @input="getValue(text)"
      class="input-cmg"
      placeholder="Recherche"
      :style="text !== '' ? 'border: 1px solid #CCCFDB' : ''"
    />
    <SvgIcon class="icon-clear" name="Close-Clear" @click="clearInput" />
  </div>
</template>
<style lang="scss">
.input-container {
  @apply flex items-center relative min-w-input h-input;
  .icon-input {
    @apply absolute w-6 h-auto;
    padding-left: 7px;
    svg {
      @apply fill-black;
    }
  }
  .icon-clear {
    @apply absolute w-3.5 h-auto right-2 opacity-0 cursor-pointer;
    svg {
      @apply fill-black;
    }
    &:hover {
      @apply opacity-100;
      + .input-cmg {
        @apply border border-solid border-blue-100;
      }
    }
  }
  .input-cmg {
    all: unset;
    @apply rounded-regular bg-white border border-solid border-transparent pl-7 pr-6 text-black w-full h-full text-start text-sm font-medium;
    &:hover {
      @apply bg-grey-200;
      & + .icon-clear {
        @apply opacity-100;
      }
    }
    &:focus {
      @apply border border-solid border-blue bg-white;
    }
    &:focus + .icon-clear:hover {
      @apply bg-blue-100 rounded-full;
      svg {
        @apply fill-blue;
      }
    }
  }
}
</style>
