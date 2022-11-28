<script lang="ts">
import SvgIcon from "../SvgIcon/svg-icon.vue";

export default {
  data() {
    return {
      text: "",
    };
  },
  props: {
    model: {
      type: String,
      required: true,
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
    size: {
      type: String,
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
      required: false
    },
    error: {
      type: Boolean,
      required: false
    }
  },
  components: { SvgIcon },
  mounted() {
    this.propsToValue();
  },
  methods: {
    clearInput() {
      this.text = "";
    },
    propsToValue() {
      this.text = this.model;
    }
  },
};
</script>

<template>
  <div class="input-vue">
    <label v-if="label !== ''" id="bonjour">{{ label }}</label>
    <div class="input-container">
      <SvgIcon
        class="icon-input"
        v-if="iconLeft !== ''"
        :name="iconLeft"
        :style="selected && text !== '' ? 'fill: #196DFD;' : ''"
      />
      <input
        class="input-cmg"
        :style="iconLeft ? 'padding-left: 28px' : ''"
        :class="[selected && text !== '' ? 'selected' : '', size]"
        :disabled="disabled"
        v-model="text"
        placeholder="Enter value"
        :required="required || error"
      />
      <SvgIcon
        class="icon-clear"
        v-if="cross"
        name="Close - Clear"
        @click="clearInput"
      />
      <SvgIcon class="icon-clear price" v-if="price" name="Euro" />
    </div>
    <div class="error" v-if="error">
      <SvgIcon class="error-icon" name="Danger circled"/>
      <label> Error handling</label>
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-vue {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .error{
    display: flex;
    justify-content: flex-start;
    color: #ff0055;
    svg{
      width: 12px;
      height: auto;
      fill: #ff0055;
    }
    label {
      margin-left: 4px;
      margin-bottom: 1px;
      font-size: 12px;
    }
  }
  label {
    font-size: 14px;
  }
  .label-error{
    font-size: 12px;
  }
  .input-container {
    width: auto;
    height: auto;
    position: relative;
    display: flex;
    align-items: center;
    .icon-input {
      position: absolute;
      padding-left: 7px;
      width: 14px !important;
      height: auto;
      svg {
        fill: #1f2b37;
      }
    }
    .icon-clear {
      position: absolute;
      width: 14px;
      height: auto;
      right: 5px;
      cursor: pointer;
      svg {
        fill: #1f2b37;
      }
    }
    .price {
      cursor: default;
    }
    .selected {
      background-color: #e8f0ff !important;
      border: 1px solid #196dfd !important;
      color: #196dfd !important;
      &:hover {
        background-color: #d1e2ff !important;
      }
    }
    .input-cmg {
      all: unset;
      height: 30px;
      border-radius: 4px;
      background-color: white;
      border: 1px solid #cccfdb;
      font-size: 14px;
      padding: 0px 8px;
      color: black;
      text-align: start;
      &::placeholder {
        color: #596477;
      }
      &:hover{
        border: 1px solid #196dfd;
      }
      &:focus {
        border: 1px solid #196dfd;
      }
      &:active {
        border: solid 2px #196dfd;
      }
      &:disabled {
        border: 1px solid #cccfdb;
        background-color: #e3e8ee;
        color: #919eab;
      }
      &:disabled::placeholder {
        color: #919eab;
      }
      &:required {
        background-color: #ffe5ee;
        border: 1px solid #ff0055;
        &:focus {
          border: 1px solid #ff0055;
        }
        &:active {
          border: 2px solid #ff0055;
        }
      }
    }
    .sm {
      height: 24px !important;
    }
  }
}
</style>
