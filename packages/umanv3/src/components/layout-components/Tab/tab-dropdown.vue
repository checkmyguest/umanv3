<template>
  <div
    v-click="closeDropdown"
    class="backdrop"
  >
    <div
      :style="position"
      class="tab-dropdown flex flex-col items-start"
      @click.stop=""
    >
      <a
        v-click="onRename"
        class="w-full"
      >
        <span class="cursor-pointer px-2"> Renommer la vue </span>
      </a>
      <a
        v-click="onDelete"
        class="w-full"
      >
        <span class="cursor-pointer px-2"> Supprimer la vue </span>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    onRename: {
      type: Function,
      require: false,
    },
    onDelete: {
      type: Function,
      require: false,
    },
    position: {
      type: Object,
      require: true,
    },
    closeDropdown: {
      type: Function,
      require: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tab-dropdown {
  padding: 8px;
  position: absolute;
  width: 240px;
  background-color: white;
  border-radius: 4px;
  overflow: hidden;
  z-index: 100;
  box-shadow: 0 0 1px 1px rgb(0 0 0 / 10%);
  align-items: center;
  color: #000;
  transition: 0.2s;
  cursor: pointer;
  a {
    padding: 3px 8px 7px;
  }
  a:hover {
    background-color: #f8fafc;
  }
}
</style>