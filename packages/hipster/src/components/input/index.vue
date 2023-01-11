<script lang="ts">
import SvgIcon from "../global-component/SvgIcon/svg-icon.vue";

export default {
  data() {
    return {
      text: this.modelValue,
    };
  },
  props: {
    modelValue: {
      type: String,
      required: false,
      default: ""
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    iconLeft: {
      type: String,
      required: false,
      default: "",
    },
    required: {
      type: Boolean,
      required: false,
    },
    selected: {
      type: Boolean,
      required: false,
    },
    cross: {
      type: Boolean,
      required: false,
    },
    price: {
      type: Boolean,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    error: {
      type: Boolean,
      required: false,
    },
    getValue: {
      type: Function,
      required: true
    }
  },
  components: { SvgIcon },
  methods: {
    clearInput() {
      this.text = "";
    },
  },
};
</script>

<template>
  <div class="input-vue">
    <label v-if="label !== ''" class="label-container" :class="required ? 'text-red' : ''" id="label">{{ label }}</label>
    <div class="input-container">
      <SvgIcon
        class="icon-input"
        v-if="iconLeft !== ''"
        :name="iconLeft"
        :class="selected && text !== '' ? 'fill-blue' : ''"
      />
      <input
        class="input-cmg"
        :class="[selected && text !== '' ? 'selected' : '', iconLeft ? 'pl-7' : '']"
        :disabled="disabled"
        v-model="text"
        placeholder="Enter value"
        :required="required || error"
        @input="getValue(text)"
      />
      <SvgIcon
        class="icon-clear"
        v-if="cross && !price"
        name="Close-Clear"
        @click="clearInput"
      />
      <SvgIcon class="price" v-if="price" name="Euro" />
    </div>
    <div class="error" v-if="error">
      <SvgIcon class="error-icon" name="Danger-circled" />
      <label> Error handling</label>
    </div>
  </div>
</template>

<style lang="scss">
.input-vue {
  @apply flex flex-col items-start w-auto relative;
  .error {
    @apply absolute flex justify-start text-red -bottom-9;
    svg {
      @apply w-3 h-auto pb-0.5 fill-red;
    }
    label {
      @apply text-xs text-red pl-1;
    }
  }
  .label-container {
    @apply absolute text-sm text-black -top-10 font-medium;
  }
  .input-container {
    @apply min-w-input h-input relative flex items-center;
    .icon-input {
      @apply absolute w-6 h-auto z-10 pl-2;
      svg {
        @apply fill-grey-900;
      }
    }
    .icon-clear {
      @apply absolute cursor-default visible opacity-100 right-2 w-4 h-auto;
      svg {
        @apply fill-grey-900;
      }
    }
    .price {
      @apply absolute cursor-default visible opacity-100 right-2 w-4 h-auto;
      svg {
        path{
          @apply fill-grey-900;
        }
      }
    }
    .input-cmg {
      all: unset;
      @apply box-border absolute left-0 w-full h-full bg-white rounded-regular border border-solid border-grey-400 font-medium text-sm pl-2 text-black text-start;
      &::placeholder {
        @apply text-grey-700;
      }
      &:hover {
        @apply border-blue;
      }
      &:focus {
        @apply border-blue;
      }
      &:active {
        @apply border-blue border-2;
      }
      &:disabled {
        @apply border-grey-400 bg-grey-300 text-grey-600;
      }
      &:disabled::placeholder {
        @apply text-grey-600;
      }
      &:disabled:active{
        @apply border;
      }
      &:required {
        @apply bg-red-100 border-red;
      }
    }
    .selected {
      @apply bg-blue-100 border-blue text-blue;
      &:hover {
        @apply bg-blue-200;
      }
      &:focus{
        @apply bg-blue-100;
      }
    }
  }
}
</style>
