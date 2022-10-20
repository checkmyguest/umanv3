<script lang="ts" setup>
import { useEventStore } from "@/stores/event";
import { computed } from "vue";
import { EVENT_COLUMNS } from "../../../../constants";

const eventStore = useEventStore();

const properties = defineProps({
    gridType: {},
    columns: {type: Object as () => typeof EVENT_COLUMNS, required: true},
    checkbox: {type: Boolean, required: true},
    stickyCol: {type: Boolean, required: true},
    actionBtnCol: {type: Function, required: true},
    isMainPage: {type: Boolean, required: true},
    setSort: {type: Function, required: true},
    items: {},
    pagination: {type: Function, required: true},
    loading: {type: Boolean, required: true}
})

// DATA //
let activeId: string | number;
let masterCheck: boolean = false;
let allSelected: boolean = false;
let selectedIds: [];
let scrollListenersSetup: boolean = false;
let withColumns: string[] = [];
let actionButtonConfirm: { state: boolean };
let activeActionsButton: {
    index: undefined,
    locked: boolean,
};

// COMPUTED //
const tableWrapContainerStyle = computed(() => {
    return properties.gridType === "page" ? "calc(100vh - 300px)" : "calc(100vh - 350px)"
})
const showAction = computed(()=>{
    return (index: any) =>
        properties.gridType === "page" &&
        properties.actionBtnCol &&
        properties.actionBtnCol.hasAction &&
        activeActionsButton.index
})

function actionButtonCol(){
    return{
        hasAction: true,
        actionBtnOptions:[
            {
                actionBtnValue: "Partager les accès",
                actionBtnFunc: sendAccess
            },
        ],
    }
}

function showActionsButton(index: any) {
        if (activeActionsButton.locked) activeActionsButton.index = index
      }
      function hideActionsButton() {
        if (activeActionsButton.locked) {
          activeActionsButton.index = undefined
          this.$closeDropdown()
        }
      }
      function sortOptions(options: any) {
        return options
      }
      function selectRow(id: number) {
        if (id === -1) {
          if (selectedIds.length === properties.items.length) return (selectedIds = [])
          if (selectedIds.length > 0) return (selectedIds = [])
          return (selectedIds = properties.items.map((row: any) => row.id))
        } else {
          const index = selectedIds.indexOf(id)
          if (index >= 0) selectedIds.splice(index, 1)
          else {
            properties.items.map((row: any) => {
              if (row.id === id || row.mission_id === id || row.issue_id === id)
                return selectedIds.push(id)
            })
          }
        }
        masterCheck = selectedIds.length > 0 ? true : false;
        this.$store.commit("commun/setSelectedItems", selectedIds)
      }
      function setWidthColumn(width: string) {
        if (withColumns.length <= properties.columns.length) {
          withColumns.push(`min-width:${width}; max-width:${width};`)
        }
        return `min-width:${width}; max-width:${width};`
      }
      function resetSort(type: any) {
        for (const col of properties.columns) {
          if (col.key === type) continue
          col.sort = false
        }
      }
      function toggleSort(type: any) {
        const column = properties.columns.find((col) => col.key === type)
        const direction = !column.sort ? "ASC" : (column.sort === "ASC" ? "DESC" : false)
        properties.setSort(direction ? column.key : undefined, direction)
        column.sort = direction
        resetSort(type)
      }
</script>
