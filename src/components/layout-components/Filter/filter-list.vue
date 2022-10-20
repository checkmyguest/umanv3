<template>
  <div
    class="backdrop"
    @click="onClose"
  >
    <div
      class="modal"
      @click.stop=""
    >
      <div class="modal-header flex flex-col w-full">
        <div>
          <h5 class="ml-3 mt-2 outline-none px-1 justify-self-start">
            {{ currentView ? currentView.name : "Nouvelle vue" }}
          </h5>
        </div>
        <div class="flex flex-row w-full justify-between border-b p-2">
          <a
            class="mr-2 secondary cursor-pointer ml-2"
            @click="resetState"
          >Réinitialiser les filtres</a>
          <div class="flex flex-row px-2">
            <button
              :class="[{ disabled: isUpdateDisabled }, 'cmg-btn cmg-btn-small secondary-btn mr-3']"
              @click="upsertView(filterState)"
            >
              {{ currentView ? "Modifier et appliquer la vue" : "Créer une vue" }}
            </button>
            <button
              :class="[{ disabled: isUpdateDisabled }, 'cmg-btn cmg-btn-small primary-btn mr-0']"
            >
              Appliquer les filtres
            </button>
          </div>
        </div>
      </div>
      <div class="modal-body">
        <div
          v-for="filter in filters"
          :key="filter.key"
          :class="[{ disabled: isDisabled(filter) }, 'col']"
        >
          <label class="semibold">{{ filter.label }}</label>
          <input
            v-if="filter.search"
            :column="filter.key"
            class="cmg-input cmg-input-icon cmg-input-flat my-2 placeholder-gray-400"
            type="text"
            autocomplete="off"
            :placeholder="filter.placeholder || 'Rechercher'"
          >
          <FilterItem
            :state="filterState"
            :on-change="onChange"
            :filter="filter"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reduce } from "lodash";
import { EVENT_FILTERS } from "../../../../constants";
import { cleanObject } from "../../utils/helpers.js";
import FilterItem from "./filter-item.vue";

export default {
  components: {
    FilterItem,
  },
  props: {
    onClose: {
      type: Function,
      require: true,
    },
    position: {
      type: Object,
      require: true,
    },
    filters: {
      type: Array,
      require: true,
    },
    currentView: {
      type: Object,
      require: false,
    },
    upsertView: {
      type: Function,
      require: true,
    },
    applyFilter: {
      type: Function,
      require: true,
    },
  },
  data: function () {
    return {
      filterState: this.currentView?.filters || {},
    }
  },
  computed: {
    isUpdateDisabled() {
      const selectedFilters = Object.keys(this.filterState).length
      return selectedFilters === 0
    },
  },
  methods: {
    onChange(key: string | number, value: any, toReset: string | any[]) {
      const filter = this.filters?.find((filter) => key === filter.key)
      const currentValue = this.filterState[key]
      if (!filter || toReset?.length) {
        const reset = reduce(toReset, (result, e) => ({ ...result, [e]: undefined }), {})
        const newState = cleanObject(Object.assign({}, this.filterState, reset, { [key]: value }))
        this.filterState = newState
      }
      if (!filter?.multi && !filter?.type !== "number") {
        return this.$set(this.filterState, key, currentValue === value ? undefined : value)
      }
      if (!currentValue?.length) return this.$set(this.filterState, key, [value])
      const index = currentValue?.indexOf(value)
      let updatedValue =
        index !== -1
          ? currentValue.filter((_: any, index_: any) => index_ !== index)
          : [...this.filterState[key], value]
      if (updatedValue.length === 0) return this.$delete(this.filterState, key)
      return this.$set(this.filterState, key, updatedValue)
    },
    isDisabled(filter: typeof EVENT_FILTERS) {
      if (!filter.dependsOn) return false
      const currentState = this.filterState[filter.dependsOn.key]
      return currentState ? !filter.dependsOn.values.includes(currentState) : true
    },
    resetState() {
      this.filterState = {}
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
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  .modal {
    display: flex;
    background: #fff;
    border-radius: 4px;
    max-height: 472px;
    min-height: 200px;
    flex-direction: column;
    position: absolute;
    top: auto;
    left: auto;
    bottom: 0;
    right: 170px;
    filter: drop-shadow(0 2px 16px rgba(6, 18, 73, 0.1254901961));
    width: 70vw;
    .modal-body {
      display: flex;
      overflow-x: scroll;
      overflow-y: hidden;
      margin: 20px 0 2px;
      height: 100%;
      width: 100%;
      .col {
        min-width: 160px;
        margin: 0 12px;
        label {
          margin-bottom: 8px;
          display: block;
        }
      }
      .disabled {
        opacity: 0.4;
        pointer-events: none;
      }
    }
  }
}
</style>