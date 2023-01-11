<script lang="ts">
import { PropType } from "vue";
import ButtonVue from "../button/index.vue";
export interface Actions {
  name: string;
  function: Function;
}

export default {
  components: {
    ButtonVue,
  },
  props: {
    text: { type: String, required: false },
    type: { type: String, required: false },
    iconLeft: { type: String, required: false, default: "" },
    disabled: { type: Boolean, required: false },
    id: { type: String, required: true },
    mainAction: { type: Function, require: false },
    actions: { type: Object as PropType<Actions[]>, required: true },
    split: { type: Boolean, required: false },
    size: { type: String, required: false },
  },
};
</script>

<template>
  <div :class="[split ? 'split-button_container' : '']">
    <ButtonVue
      v-if="split"
      :style="'border-radius: 4px 0 0 4px;'"
      :text="text"
      :type="type"
      :disabled="disabled"
      :iconLeft="iconLeft"
      :size="size"
    />
    <el-dropdown
      :id="id"
      trigger="click"
      :disabled="disabled"
    >
      <ButtonVue
        :icon="split ? 'ArrowDown' : ''"
        :dropdown="split ? false : true"
        :text="text"
        :type="type"
        :disabled="disabled"
        :iconLeft="iconLeft"
        :size="size"
        :style="
          split
            ? 'border-radius: 0 4px 4px 0; margin-top: 1px; border-width: 1px 1px 1px 0px !important;'
            : ''
        "
      />
      <template #dropdown>
        <el-dropdown-menu class="dropdown-menu">
          <el-dropdown-item
            v-for="(action, i) in actions"
            class="dropdown-item"
            @click="action.function"
          >
            {{ action.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss">
.el-button {
  @apply m-0 text-sm font-medium;
  padding: 2px 6px 6px 10px;
  height: 26px;
  max-height: 26px;
}

.split-button_container {
  @apply flex items-center justify-between;
  .white-svg {
    svg {
      @apply fill-white;
    }
  }
  .border-left {
    border-left: 1px solid rgba(6, 18, 73, 0.1) !important;
  }
}

.icon-left {
  padding: 2px 5px 4px 6px;
  .icon-class-left {
    margin-top: 2px;
  }
}
</style>
