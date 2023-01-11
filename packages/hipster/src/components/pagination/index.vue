<script lang="ts">
import SvgIcon from "../global-component/SvgIcon/svg-icon.vue";

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
    @apply flex flex-row items-center justify-center relative h-8;
    width: 150px;
    span {
      @apply mx-2.5 text-sm;
    }
    .button-arrow {
      @apply flex items-center justify-center w-6 h-6 rounded-sm border border-solid border-grey-400;
    }
    .button-arrow_left {
      @apply absolute rotate-90 pb-0.5 left-0;
    }
    .button-arrow_right {
      @apply absolute -rotate-90 pb-0.5 right-0;
    }
  }
}
</style>
