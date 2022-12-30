<script lang="ts">

export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    getValue: {
      type: Function,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    minus: {
      type: Boolean,
      required: false,
    },
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: "primary",
    },
  },
  data() {
    return {
      bgColor: "",
      borderColor: "",
      tickColor: "",
      requiredColor: "",
      borderDefaultColor: "",
      bgDefaultColor: "",
      checkboxValue: this.modelValue
    };
  },
  mounted() {
    if (this.type === "primary") {
      this.bgColor = "#196DFD";
      this.borderColor = "#196DFD";
      this.tickColor = "#FFFFFF";
      this.borderDefaultColor = "#CCCFDB";
      this.bgDefaultColor = "#FFFFFF"
    } else if (this.type === "required") {
      this.bgColor = "#FFE5EE";
      this.borderColor = "#FF0059";
      this.tickColor = "#FF0059";
      this.borderDefaultColor = "#FF0059";
      this.bgDefaultColor = "#FFE5EE"
    }
  }
};
</script>

<template>
  <div class="checkbox-container">
    <p>
      <input type="checkbox" v-model="checkboxValue" :disabled="disabled" :class="[type, minus ? 'minus' : '']" :id="id" @change="getValue(checkboxValue, id)"/>
      <label :for="id" aria-describedby="label"></label>
    </p>
    <label v-if="label !== '' && !disabled" :style="type === 'primary' ? 'color: black' : 'color:'+tickColor" :for="id" class="label-custom">{{ label }}</label>
    <label v-if="label !== '' && disabled" style="color: #919EAB; cursor: not-allowed;" :for="id" class="label-custom">{{ label }}</label>
  </div>
</template>

<style scoped lang="scss">
@mixin coche() {
  content: "";
  position: absolute;
  top: 3px;
  left: 6px;
  line-height: 0;
  transition: all 0.2s; /* Petite transition */
  width: 4px;
  height: 7px;
  border: solid v-bind(tickColor);
  border-width: 0 1px 1px 0;
  rotate: 45deg;
}

.checkbox-container {
  display: flex;
  align-items: center;
  height: 16px;
  width: 100%;
  .label-custom {
    color: black;
    font-size: 14px;
    margin-left: 12px;
    margin-top: 2px;
    white-space: nowrap;
    width: 100%;
    cursor: pointer;
  }
}

p {
  display: flex;
  position: relative;
}
[type="checkbox"]:not(:checked),
[type="checkbox"]:checked {
  opacity: 0.01;
}

[type="checkbox"] + label {
  font-size: 1.05em;
  line-height: 1.7;
  cursor: pointer;
}
/* Aspect de la case */
[type="checkbox"]:not(:checked) + label::before,
[type="checkbox"]:checked + label::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 16px;
  height: 16px;
  border: 1px solid v-bind(borderDefaultColor);
  background: v-bind(bgDefaultColor);
  border-radius: 2px;
  transition: all 0.275s;
}

[type="checkbox"]:not(:checked):hover + label::before {
  border: 1px solid v-bind(borderColor);
}

[type="checkbox"]:not(:checked):focus + label::before {
  border: 2px solid v-bind(borderColor);
}

/* Aspect de la coche */
[type="checkbox"]:not(:checked) + label::after,
[type="checkbox"]:checked + label::after {
  @include coche();
}

.minus:not(:checked) + label::after,
.minus:checked + label::after {
  top: 7px;
  left: 3px;
  width: 10px;
  height: 1px;
  background-color: v-bind(tickColor);
  rotate: 0deg;
}

[type="checkbox"]:checked + label::before {
  background-color: v-bind(bgColor);
  border: 1px solid v-bind(borderColor);
}

/* Aspect non cochée */
[type="checkbox"]:not(:checked) + label::after {
  opacity: 0;
  transform: scale(0) rotate(45deg);
}

/* Aspect cochée */
[type="checkbox"]:checked + label::after {
  opacity: 1;
  transform: scale(1) rotate(0);
}

/* Disabled checkbox */
[type="checkbox"]:disabled:not(:checked) + label::before,
[type="checkbox"]:disabled:checked + label::before {
  box-shadow: none;
  border: 1px solid #cccfdb !important;
  background-color: #fdfefe;
  cursor: not-allowed;
}

/* Disabled checked */
[type="checkbox"]:disabled:checked + label::after {
  @include coche();
  border-color: #919eab;
}

.minus:disabled:checked + label::after {
  @include coche();
  top: 7px;
  left: 3px;
  width: 10px;
  height: 1px;
  background-color: v-bind(tickColor);
  rotate: 0deg;
  border-color: #919eab;
}
</style>
