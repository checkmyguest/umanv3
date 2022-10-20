<!-- eslint-disable vue/no-template-shadow -->
<template>
  <div class="flex justify-between items-center border-b mb-8">
    <draggable
      class="list-group"
      :list="items"
      v-bind="dragOptions"
      tag="transitionGroup"
      item-key="id"
    >
      <template #item="{items}">
        <li
          v-for="(element, index) in items"
          :key="index"
          :class="[activeId === element.id && 'active-tab', 'list-group-item']"
        >
          <TabItem
            :is-active="activeId === element.id"
            :on-press="() => onTabClick(element.id)"
            :on-refresh="onRefresh"
            :on-rename="onRename"
            :on-delete="onDelete"
            :name="element.name"
          />
        </li>
      </template>
    </draggable>
    <div class="border-l px-6">
      <button
        v-click="newView"
        class="cmg-btn plain-icon-btn h-8 whitespace-nowrap"
      >
        <span class="icon-left font-black text-lg mr-1">+</span>
        Nouvelle vue
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import draggable from "vuedraggable";
import TabItem from "./tab-item.vue";

export default {
  components: { draggable, TabItem },
  props: {
    items: {
      type: Array,
      require: true,
    },
    activeId: {
      type: Number,
      require: false,
    },
    onTabClick: {
      type: Function,
      require: true,
    },
    onRefresh: {
      type: Function,
      require: true,
    },
    onRename: {
      type: Function,
      require: true,
    },
    onDelete: {
      type: Function,
      require: true,
    },
    newView: {
      type: Function,
      require: true,
    },
  },
  data: function () {
    return {
      dragOptions: {
        animation: 100,
        group: "description",
        disabled: false,
      },
    }
  },
}
</script>

<style scoped lang="scss">
.flip-list-move {
  transition: transform 0.1s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
  max-width: 70vw;
  min-width: 75vw;
  overflow-x: auto;
  .list-group-item {
    cursor: move;
    padding-bottom: 3px;
    margin-right: 8px;
    i {
      cursor: pointer;
    }
  }
  .list-group-item.active-tab {
    border-bottom: 2px solid $blue;
  }
  span {
    display: flex;
    flex-direction: row;
  }
}
</style>
