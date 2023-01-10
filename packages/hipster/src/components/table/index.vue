<script lang="ts">
import { ElTable } from "element-plus";
import { PropType, ref } from "vue";
import PaginationVue from "../pagination/index.vue";
import CellVue from "./cell-vue.vue";
import { IDataEvent } from "./dataFormatter";
import { widthSetter } from "./style-table";

export interface Column {
  key: string;
  label: string;
  sort?: boolean;
  sticky?: boolean;
}

export default {
  components: {
    CellVue,
    PaginationVue,
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 15,
      totalPage: 0,
      dataRendered: this.dataTable,
    };
  },
  props: {
    columns: {
      type: Object as PropType<Column[]>,
      required: true,
    },
    dataTable: {
      type: Object as PropType<IDataEvent[]>,
      required: true,
    },
    searchItem: {
      type: String,
      required: false,
      default: "",
    },
  },
  methods: {
    setWidthColumn(col: String): Number {
      let width: number = 0;
      widthSetter.forEach((cell) => {
        if (cell.key === col) width = cell.width;
      });
      return width;
    },
    search(): IDataEvent[] {
      const filteredData: IDataEvent[] = [];
      this.dataRendered.filter((item) => {
        if (this.searchItem.length > 0) {
          if (
            Object.values(item).some((el) =>
              String(el).toLowerCase().includes(this.searchItem!.toLowerCase())
            )
          ) {
            filteredData.push(item);
          }
        } else filteredData.push(item);
      });
      this.totalPage = Math.ceil(filteredData.length / this.pageSize);
      if (filteredData.length > this.pageSize)
        return filteredData.slice(
          this.pageSize * (this.currentPage - 1),
          this.pageSize * this.currentPage
        );
      else return filteredData;
    },
    previousPage() {
      if (this.currentPage > 1) this.currentPage -= 1;
    },
    nextPage() {
      if (this.currentPage < this.totalPage) this.currentPage += 1;
    },
  },
};
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<Column[]>([]);
const handleSelectionChange = (val: Column[]) => {
  multipleSelection.value = val;
};
</script>

<template>
  <div class="table-section">
    <div class="table-container">
      <el-table
        :data="search()"
        :default-sort="{ prop: 'code', order: 'ascending' }"
        ref="multipleTableRef"
        :border="true"
        table-layout="fixed"
        class="table-custom"
        header-cell-class-name="header-custom"
      >
        <el-table-column type="selection" width="36" />
        <el-table-column
          v-for="(item, index) in columns"
          :prop="item.key"
          :label="item.label"
          :width="setWidthColumn(item.key!)"
          :fixed="index === 0 ? true : false"
          :sortable="item.sort"
        >
          <template #default="scope">
            <CellVue
              :data="scope.row[item.key!]"
              :itemKey="scope.column.property"
              :reservationId="scope.row['tags'][0].reservation_id"
            />
          </template>
        </el-table-column>
        <template #header class="header-custom"> </template>
      </el-table>
    </div>
    <div class="pagination-container" v-if="totalPage > 1">
      <PaginationVue
        @previous-page="previousPage"
        @next-page="nextPage"
        :total-page="totalPage"
        :current-page="currentPage"
      />
    </div>
  </div>
</template>

<style lang="scss">
:root {
  --el-table-row-hover-bg-color: #f9fafc;
  --el-color-primary: #196dfd;
}

.table-section {
  @apply flex flex-col w-full h-5/6 gap-4;
  .table-container {
    @apply h-5/6; 
    .table-custom {
      @apply text-black w-full h-full;
    }
  }
  .pagination-container {
    @apply flex justify-end items-center;
  }
}

.cell {
  @apply h-8;
  padding: 0 !important;
  padding-left: 12px !important;
}

.el-table__cell {
  padding: 0 !important;
}

.header-custom {
  @apply font-medium font-bold text-xs leading-normal uppercase h-8 whitespace-nowrap;
  color: #5c5c67;
  .cell {
    @apply flex items-center pl-3;
    .caret-wrapper {
      @apply mt-0.5 pr-1.5 scale-75 invisible;
    }
    &:hover .caret-wrapper {
      @apply visible;
    }
  }
}
</style>
