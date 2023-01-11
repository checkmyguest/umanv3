<script setup lang="ts">
import { ITagOptions, ITagsEvent } from "@/constants/tags/tags";
import { onMounted, PropType, Ref, ref } from "vue";
import CheckboxVue from "../checkbox/index.vue";

const props = defineProps({
  tagsContainer: {
    type: Object as PropType<ITagOptions[]>,
    required: true,
  },
  tagsReservation: {
    type: Object as PropType<ITagsEvent[]>,
    required: true,
  },
  reservationId: {
    type: Number,
    required: true,
  },
});

const options: Ref<ITagOptions[]> = ref([]);
const values: Ref<ITagsEvent[]> = ref([]);

onMounted(() => {
  props.tagsContainer!.forEach((tag) => {
    if (tag.active) {
      options.value.push({
        tag_id: tag.tag_id + props.reservationId,
        name: tag.name,
        active: tag.active,
        checked: false,
      });
    }
  });
  props.tagsReservation.forEach((tag) => {
    values.value.push({
      tag_id: tag.tag_id + props.reservationId,
      name: tag.name,
      reservation_id: tag.reservation_id,
    });
    options.value
      .filter((option) => option.name === tag.name)
      .forEach((option) => (option.checked = true));
  });
});

function getValue(checked: boolean, id: string) {
  options.value.find((option) => option.tag_id === parseInt(id))!.checked =
    checked;
  const check = options.value.filter(
    (option) => option.tag_id === parseInt(id)
  );
  values.value.push({
    tag_id: check[0].tag_id - props.reservationId,
    name: check[0].name,
    reservation_id: props.reservationId,
  });
}
</script>

<template>
  <div class="container">
    <div class="tag-container">
      <span v-for="(item, index) in options">
        <span v-if="item.checked" class="tag-custom">
          {{ item.name }}
        </span>
      </span>
    </div>
    <el-select
      placement="bottom"
      v-model="values"
      multiple
      collapse-tags
      placeholder=""
      :value-key="reservationId.toString()"
    >
      <el-option
        v-for="(item, index) in options"
        :key="item.tag_id"
        :label="item.name"
        :value="item.checked!"
      >
        <CheckboxVue
          class="checkbox"
          :getValue="getValue"
          :id="item.tag_id.toString()"
          v-model="item.checked"
          :label="item.name"
        />
      </el-option>
    </el-select>
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
}
::-webkit-scrollbar {
  display: none;
}
.container {
  @apply relative flex items-center justify-center text-black overflow-x-scroll h-8;
  width: 250px;
  max-width: 250px;
  .tag-container {
    @apply absolute flex items-center top-0 left-0 w-full h-full px-3 overflow-x-scroll;
  }
}
.tag-custom {
  @apply flex items-center justify-center text-xs text-blue font-medium;
  @apply w-auto bg-blue-100 rounded-lg px-1 pb-0.5 mr-2 pt-0.5 whitespace-nowrap;
  height: 18px;
  border: 0.5px solid #196dfd;
}

.checkbox {
  @apply pb-1;
  label {
    @apply w-full;
  }
}

.el-select-dropdown {
  @apply py-2 px-3;
}

.el-select-dropdown__list {
  @apply m-0;
}

.el-select-dropdown__item {
  @apply flex items-center p-0 pl-2;
  height: 30px;
  border-radius: 4px;
  label {
    @apply mt-1.5;
  }
}


.selected {
  @apply bg-blue-100;
}

.selected::after {
  display: none;
}

.el-popper {
  width: 240px !important;
  box-shadow: 0px 0.5px 1px 0.5px rgba(6, 18, 73, 0.2) !important;
  border-radius: 4px !important;
  border: none !important;
}

.el-input__wrapper {
  @apply w-full opacity-0;
  max-width: 300px;
}

.el-tag {
  @apply opacity-0;
}

.el-popper__arrow {
  display: none;
}
</style>
