<script lang="ts">
import SvgIcon from "../../components/global-component/SvgIcon/svg-icon.vue";

export default {
  components: { SvgIcon },
  props: {
    totalPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      total: 10,
      page: 1,
    };
  },
};
</script>
<template>
  <div class="pagination">
    <div class="pagination-container">
      <button
        @click="$emit('previousPage')"
        v-if="currentPage !== 1"
        class="button-arrow button-arrow_left"
      >
        <SvgIcon name="ArrowDown" />
      </button>
      <span>{{ currentPage }} / {{ totalPage }} pages</span>
      <button
        @click="$emit('nextPage')"
        v-if="currentPage !== totalPage"
        class="button-arrow button-arrow_right"
      >
        <SvgIcon name="ArrowDown" />
      </button>
    </div>
  </div>
</template>
<style scoped lang="scss">
* {
  color: black;
}
.pagination {
  @apply flex items-center justify-center;
  .pagination-container {
    @apply flex flex-row items-center justify-center relative;
    width: 150px;
    height: 32px;
    span {
      margin: 0 10px;
      font-size: 14px;
    }
    .button-arrow {
      @apply flex items-center justify-center;
      width: 24px;
      height: 24px;
      border-radius: 2px;
      border: 1px solid #cccfdb;
    }
    .button-arrow_left {
      @apply absolute rotate-90 pb-0.5;
      left: 0;
    }
    .button-arrow_right {
      @apply absolute -rotate-90 pb-0.5;
      right: 0;
    }
  }
}
</style>
