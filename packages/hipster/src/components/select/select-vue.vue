<script setup lang="ts">
import { ITagOptions, ITagsEvent } from "@/constants/tags/tags";
import { onMounted, PropType, Ref, ref } from "vue";
import CheckboxVue from "../checkbox/checkbox-vue.vue";

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
  @apply flex items-center justify-center;
  color: black;
  overflow-x: scroll;
  width: 250px;
  max-width: 250px;
  height: 32px;
  position: relative;
  .tag-container {
    @apply absolute flex items-center top-0 left-0 w-full h-full px-3;
    overflow-x: scroll;
  }
}
.tag-custom {
  @apply flex items-center justify-center text-xs text-blue font-medium;
  weight: auto;
  height: 18px;
  background: #e8f0ff;
  border: 0.5px solid #196dfd;
  border-radius: 9px;
  padding: 0 4px;
  padding-bottom: 2px;
  margin-right: 8px;
  margin-top: 2px;
  white-space: nowrap;
}

.checkbox {
  padding-bottom: 4px;
  label {
    width: 100% !important;
  }
}

.el-select-dropdown {
  padding: 8px 12px;
}

.el-select-dropdown__list {
  margin: 0 !important;
}

.el-select-dropdown__item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 !important;
  padding-left: 8px !important;
  height: 30px !important;
  border-radius: 4px !important;
  label {
    margin-top: 6px !important;
  }
}

.selected {
  background-color: #e8f0ff !important;
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
  max-width: 300px;
  width: 100%;
  opacity: 0;
}

.el-tag {
  opacity: 0;
}

.el-popper__arrow {
  display: none;
}
</style>
