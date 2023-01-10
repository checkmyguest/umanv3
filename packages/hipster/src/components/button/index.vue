<script setup lang="ts">
import SvgIcon from "../global-component/SvgIcon/svg-icon.vue";

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: "primary",
  },
  text: {
    type: String,
    required: false,
  },
  size: {
    type: String,
    required: false,
    default: "default",
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  iconLeft: {
    type: String,
    required: false,
    default: "",
  },
  click: {
    type: Function,
    required: false,
  },
  dropdown: {
    type: Boolean,
    required: false,
  },
  style: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
    default: "",
  },
});

const typeBtn = "btn-"+props.type;

</script>

<template>
  <div>
    <el-button
      class="cmg-btn"
      :class="[
        typeBtn,
        size,
        iconLeft.length > 0 ? 'icon-left' : '',
        icon.length > 0 ? 'icon-only' : '',
      ]"
      :disabled="disabled"
      :style="style"
    >
      <el-icon v-if="iconLeft.length > 0 && icon.length === 0" class="el-icon--left icon-class"
        ><SvgIcon :name="iconLeft"
      /></el-icon>
      <span v-if="!(icon.length > 0)">
        <label>{{ text }}</label>
      </span>
      <SvgIcon class="icon-class" v-if="icon.length > 0" :name="icon" />
      <el-icon v-if="dropdown && icon.length === 0" class="el-icon--right icon-class"
        ><SvgIcon name="ArrowDown"
      /></el-icon>
    </el-button>
  </div>
</template>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}

.el-button {
  padding: 2px 12px 4px 12px;
}

.el-icon--left {
  margin-top: 4px;
  margin-left: -3px;
}

.icon-class {
  margin-bottom: 2px;
}

.icon-only {
  padding: 0 5px;
}

.el-icon--right {
  margin-left: 5px;
  margin-right: -5px;
}
</style>
