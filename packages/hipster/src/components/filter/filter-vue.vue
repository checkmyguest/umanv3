<script lang="ts">
import ButtonVue from "../button/index.vue";

export default {
  components: { ButtonVue },
};
</script>

<template>
  <el-dropdown trigger="click" class="filter-container">
    <ButtonVue
      iconLeft="Filter"
      text="Filter"
      type="secondary"
      :dropdown="true"
    />
    <template #dropdown>
      <el-dropdown-menu style="width: 780px">
        <span>Hello</span>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">
* {
  color: black;
}
</style>

<style lang="scss">
.el-dropdown__popper {
  background-color: blueviolet !important;
  max-width: 780px !important;
  width: 780px;
  height: 335px !important;
}
</style>
