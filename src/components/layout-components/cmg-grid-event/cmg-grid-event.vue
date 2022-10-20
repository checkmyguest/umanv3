<!-- eslint-disable vue/require-prop-types -->
<template>
  <div class="cmg-grid w-full">
    <div
      v-if="!loading && items.length > 0"
      class="relative overflow-auto table-wrap"
      :style="tableWrapContainerStyle"
    >
      <table class="w-full">
        <thead class="sticky">
          <tr>
            <th
              v-if="checkbox"
              class="checkbox"
              :class="{ 'sticky-col': stickyCol }"
            >
              <label class="cmg-checkbox-container">
                <input
                  v-model="masterCheck"
                  type="checkbox"
                  @click="selectRow(-1)"
                >
                <span
                  class="cmg-checkbox-checkmark"
                  :class="{
                    notAll:
                      selectedIds.length > 0 &&
                      selectedIds.length !== items.length,
                  }"
                />
              </label>
            </th>
            <th
              v-for="(col, i) in columns"
              :key="i"
              :class="{
                'sticky-col': col.sticky,
                hidden: col.hidden,
                'pointer-events-none': col.noSort,
              }"
              :sorted="col.sort"
              :sortable="col.sort"
              :style="withColumns[i]"
              @click="toggleSort(col.key)"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody class="overflow-auto">
          <tr
            v-for="(row, i) in items"
            :key="i"
            :class="{ selected: selectedIds.includes(row.id) }"
            @mouseleave="actionBtnCol && hideActionsBtn"
            @mouseenter="actionBtnCol && showActionsBtn(i)"
          >
            <td
              v-if="checkbox"
              class="checkbox sticky-col"
            >
              <MoreActions
                v-show="actionBtnCol && showAction(i)"
                :action-btn-col="actionBtnCol"
                :row="row"
                :index="i"
                :grid-type="gridType"
                :confirm="actionBtnConfirm"
              />
              <label class="cmg-checkbox-container">
                <input
                  :data-id="row.id"
                  type="checkbox"
                  :checked="selectedIds.includes(row.id)"
                  @click="selectRow(row.id)"
                >
                <span class="cmg-checkbox-checkmark" />
              </label>
            </td>
            <slot
              :row="row"
              :set-width-column="setWidthColumn"
              :index="i"
            />
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="loading && items.length === 0"
      class="grid-skeleton"
    >
      <Skeleton />
    </div>
    <div
      v-if="!loading && items.length === 0 && gridType === 'page' && isMainPage"
      class="no-results-container"
    >
      <NoResults class="mb-6" />
      <p>Utilisez les filtres pour créer une vue personnalisée.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import NoResults from "@/assets/img/no-results.svg";
import Skeleton from "@/assets/img/skeleton.svg";
import { useEventStore } from "@/stores/event";
import { computed } from "vue";
import { EVENT_COLUMNS } from "../../../../constants";
import MoreActions from "./more-actions.vue";

const eventStore = useEventStore();

const properties = defineProps({
  gridType: {},
  columns: { type: Object as () => typeof EVENT_COLUMNS, required: true },
  checkbox: { type: Boolean, required: true },
  stickyCol: { type: Boolean, required: true },
  actionBtnCol: { type: Function, required: true },
  isMainPage: { type: Boolean, required: true },
  setSort: { type: Function, required: true },
  items: {},
  pagination: { type: Function, required: true },
  loading: { type: Boolean, required: true },
});

// DATA //
let activeId: string | number;
let masterCheck: boolean = false;
let allSelected: boolean = false;
let selectedIds: [];
let scrollListenersSetup: boolean = false;
let withColumns: string[] = [];
let actionButtonConfirm: { state: boolean };
let activeActionsButton: {
  index: undefined;
  locked: boolean;
};

// COMPUTED //
const tableWrapContainerStyle = computed(() => {
  return properties.gridType === "page"
    ? "calc(100vh - 300px)"
    : "calc(100vh - 350px)";
});
const showAction = computed(() => {
  return (index: any) =>
    properties.gridType === "page" &&
    properties.actionBtnCol &&
    properties.actionBtnCol.hasAction &&
    activeActionsButton.index;
});

function actionButtonCol() {
  return {
    hasAction: true,
    actionBtnOptions: [
      {
        actionBtnValue: "Partager les accès",
        actionBtnFunc: sendAccess,
      },
    ],
  };
}

function showActionsButton(index: any) {
  if (activeActionsButton.locked) activeActionsButton.index = index;
}
function hideActionsButton() {
  if (activeActionsButton.locked) {
    activeActionsButton.index = undefined;
    this.$closeDropdown();
  }
}
function sortOptions(options: any) {
  return options;
}
function selectRow(id: number) {
  if (id === -1) {
    if (selectedIds.length === properties.items.length)
      return (selectedIds = []);
    if (selectedIds.length > 0) return (selectedIds = []);
    return (selectedIds = properties.items.map((row: any) => row.id));
  } else {
    const index = selectedIds.indexOf(id);
    if (index >= 0) selectedIds.splice(index, 1);
    else {
      properties.items.map((row: any) => {
        if (row.id === id || row.mission_id === id || row.issue_id === id)
          return selectedIds.push(id);
      });
    }
  }
  masterCheck = selectedIds.length > 0 ? true : false;
  this.$store.commit("commun/setSelectedItems", selectedIds);
}
function setWidthColumn(width: string) {
  if (withColumns.length <= properties.columns.length) {
    withColumns.push(`min-width:${width}; max-width:${width};`);
  }
  return `min-width:${width}; max-width:${width};`;
}
function resetSort(type: any) {
  for (const col of properties.columns) {
    if (col.key === type) continue;
    col.sort = false;
  }
}
function toggleSort(type: any) {
  const column = properties.columns.find((col) => col.key === type);
  const direction = !column.sort
    ? "ASC"
    : (column.sort === "ASC"
    ? "DESC"
    : false);
  properties.setSort(direction ? column.key : undefined, direction);
  column.sort = direction;
  resetSort(type);
}
</script>

<style lang="scss" scoped>
.small-input {
  height: 26px;
}

.cmg-grid {
  margin-top: 15px;
  .table-wrap {
    padding-left: 32px;
    padding-right: 24px;
    table {
      .sticky-col {
        position: sticky;
        left: 0;
        z-index: 1;
      }
      .sticky-col:nth-child(2) {
        left: 44px;
      }
      thead {
        top: 0px;
        z-index: 1;
        tr {
          border-top: 1px solid #e3e8ee;
          border-bottom: 1px solid #e3e8ee;
          display: flex;
          position: relative;
          th {
            display: flex;
            flex: 1;
            font-size: 11px;
            text-transform: uppercase;
            color: #5c5c67;
            background: #fff;
            padding: 0 12px;
            flex-direction: column;
            min-height: 32px;
            border-right: 1px solid #e3e8ee;
            line-height: normal;
            align-items: flex-start;
            justify-content: center;
            &:first-child {
              border-left: 1px solid #e3e8ee;
            }
          }
        }
      }
      tbody {
        tr {
          display: flex;
          position: relative;
          border-bottom: 1px solid #e3e8ee;
          &:hover {
            td {
              background: #f8fafc !important;
            }
          }
          td {
            background: #fff;
            padding: 0 12px;
            flex: 1;
            display: flex;
            align-items: center;
            min-height: 32px;
            border-right: 1px solid #e3e8ee;
            line-height: normal;
          }
          td:first-child {
            border-left: 1px solid #e3e8ee;
          }
        }
      }
      th:first-child:before,
      td:first-child:before {
        content: "";
        position: absolute;
        width: 54px;
        background: #fff;
        height: calc(100% + 6px);
        right: unset;
        left: -55px;
        top: -1px;
      }
    }
  }
}
</style>
