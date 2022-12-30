<script setup lang="ts">
import { ref } from 'vue';
import SvgIcon from '../global-component/SvgIcon/svg-icon.vue';

const props = defineProps({
  getValue:{
    type: Function,
    required: true
  },
  size: {
    type: String,
    required: false,
    default: 'default'
  }
});

const text = ref('');
const clearInput = () => {
  text.value = '';
  props.getValue(text.value);
};

</script>
<template>
    <div class="input-container" :class="size" >
      <SvgIcon
        class="icon-input input-svg"
        name="Search"
        :class="size"
      />
      <input
        v-model="text"
        @input="getValue(text)"
        class="input-cmg"
        :class="size"
        placeholder="Recherche"
        :style="text !== '' ? 'border: 1px solid #CCCFDB' : ''"
      />
      <SvgIcon
        class="icon-clear"
        name="Close - Clear"
        @click="clearInput"
      />
  </div>
</template>
<style lang="scss">
.input-container {
    min-width: 100px;
    display: flex;
    align-items: center;
    .icon-input {
      position: absolute;
      padding-left: 7px;
      // padding-bottom: 2px;
      svg {
        fill: #1f2b37;
      }
    }
    .icon-clear {
      position: absolute;
      width: 14px;
      height: auto;
      right: 8px;
      opacity: 0;
      cursor: pointer;
      svg {
        fill: #1f2b37;
      }
      &:hover{
        opacity: 1;
        + .input-cmg{
            border: 1px solid #E8F0FF;
        }
      }
    }
    .input-cmg {
      all: unset;
      min-width: 100px;
      border-radius: 4px;
      background-color: white;
      border: 1px solid transparent;
      padding-left: 8px;
      padding-right: 26px;
      color: black;
      height: 100%;
      text-align: start;
      &:hover{
        background-color: #F4F6F8;
        & + .icon-clear{
            opacity: 1;
        }
        }
      &:focus{
        border: 1px solid #196DFD;
        background-color: white;
        & + .icon-clear{
            opacity: 1;
        }
      }
      &:focus + .icon-clear:hover{
        background-color: #E8F0FF;
        border-radius: 50%;
        svg{
            fill: #196DFD !important;
        }
      }
    }
}
</style>