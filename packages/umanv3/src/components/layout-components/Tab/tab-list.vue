<!-- eslint-disable vue/no-template-shadow -->
<template>
  <div class="tablist-container">
    <draggable
      class="list-group"
      :list="items"
      v-bind="dragOptions"
      item-key="id"
    >
      <template #item="{ items }">
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
    <div class="btn-container">
      <button
        class="cmg-btn plain-icon-btn vue-btn"
        @onClick="newView"
      >
        <span class="icon-left">+</span>
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
    };
  },
};
</script>

<style scoped lang="scss">
.tablist-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px rgba(229, 231, 235);
  margin-bottom: 2rem;
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
  .btn-container {
    border-left: solid 1px rgba(229, 231, 235);
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    .vue-btn {
      height: 2rem;
      white-space: nowrap;
      font-size: 14px;
      span.icon-left {
        color: black;
        font-size: 1.125rem;
        line-height: 1.75rem;
        margin-right: 0.25rem;
        svg,
        img {
          height: 16px;
          width: 14px;
          margin-right: 8px;
          path {
            fill: #000;
          }
        }
      }
    }
  }
}
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
</style>
