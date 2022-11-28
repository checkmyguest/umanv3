<template>
  <div>
    <div
      v-if="filter.type == 'date'"
      class="flex flex-col"
    >
      <DatePicker
        :value="getDateValue(filter.key)"
        size="small"
        :placeholder="filter.label"
        :on-change="(value: any) => onChange(filter.key, value, [before, after])"
      />
      <DatePicker
        v-if="filter.interval"
        :value="getDateValue(after)"
        size="small"
        placeholder="> Inférieur"
        :on-change="(value: any) => onChange(after, value, [filter.key])"
      />
      <DatePicker
        v-if="filter.interval"
        :value="getDateValue(before)"
        size="small"
        placeholder="< Supérieur"
        :on-change="(value: any) => onChange(before, value, [filter.key])"
      />
    </div>
    <div
      v-if="filter.type == 'select' || filter.options?.length"
      class="flex flex-col"
    >
      <ul
        :class="[
          'filter-list-container overflow-y-auto overflow-x-hidden',
          !filter.search && 'filter-list-container-xl',
        ]"
      >
        <li
          v-for="(option, index) in filter.options"
          :id="`multi-select-${filter.key}-${index}`"
          :key="`${filter.key}-${index}`"
          :value="option.value"
          :alt="option.label"
          :class="[
            selected(filter, option) && 'selected',
            'my-1 rounded-sm px-2 py-1 cursor-pointer select-filter-list',
          ]"
          @click="onChange(filter.key, option.value)"
        >
          <InitialsName
            v-if="filter.icon === 'initial'"
            :fullname="option.label"
            :size="5"
          />
          <ColoredStatus
            v-else-if="filter.icon === 'color'"
            :status="option.label"
            class="-ml-2 -mt-0.5 -mb-1"
            classes="rounded-l-sm text-ellipsis overflow-hidden"
          />
          <PlatformItem
            v-else-if="filter.icon === 'platform'"
            :platform="option.label"
          />
          <div
            v-else
            class="text-ellipsis overflow-hidden"
          >
            {{ option.label }}
          </div>
        </li>
      </ul>
    </div>
    <div
      v-else-if="filter.type == 'number'"
      class="flex flex-col"
    >
      <input
        class="cmg-input small-input"
        type="number"
        :placeholder="filter.label"
        :value="state![filter.key]"
        @input="(e) => debouncedOnChange(filter.key, parseInt(e.target!.value), [after, before])"
      >
      <input
        v-if="filter.interval"
        :value="state![after]"
        class="cmg-input small-input"
        type="number"
        placeholder="> Inférieur"
        @input="(e) => debouncedOnChange(after, parseInt(e.target!.value), [filter.key])"
      >
      <input
        v-if="filter.interval"
        :value="state![before]"
        class="cmg-input small-input"
        type="number"
        placeholder="< Supérieur"
        @input="(e) => debouncedOnChange(before, parseInt(e.target!.value), [filter.key])"
      >
    </div>
  </div>
</template>

<script lang="ts">
import ColoredStatus from "@/components/global/colored-status.vue"
import InitialsName from "@/components/global/initials-name.vue"
import PlatformItem from "@/components/global/platform-item.vue"
import DatePicker from "@/components/table/cells/global/date-picker.vue"
import debounce from "lodash/debounce"
import isEqual from "lodash/isEqual"
import { PropType } from "vue"
import { DATE_PARAMS, IEventFilters } from "../../../../constants"

export default {
  components: { DatePicker, PlatformItem, ColoredStatus, InitialsName },
  props: {
    filter: {
      type: Object as PropType<IEventFilters>,
      required: true
    },
    onChange: {
      type: Function,
      require: true
    },
    state: {
      type: Object
    },
  },
  computed: {
    selected() {
      return (filter: IEventFilters, option: any) => {
        if (!this.state[filter.key]) return false
        // FIXME: Find a better way to handle this edge case
        if (filter.key === "building_name") {
          for (const selectedOption of this.state[filter.key]) {
            if (isEqual(selectedOption, option.value)) return true
          }
          return false
        }
        return filter.multi
          ? this.state[filter.key]?.includes(option.value)
          : this.state[filter.key] === option.value
      }
    },
    after() {
      return `${this.filter.key}_after`
    },
    before() {
      return `${this.filter.key}_before`
    },
  },
  methods: {
    debouncedOnChange: debounce(function (key, value, toReset) {
      this.onChange(key, value || undefined, toReset)
    }, 400),
    getDateValue(key) {
      if (!this.state[key]) return
      const isComputedDate = DATE_PARAMS.find(({ value }) => this.state[key] === value)
      return isComputedDate ? undefined : this.state[key]
    },
  },
}
</script>

<style scoped lang="scss">
.small-input {
  height: 26px;
  margin-bottom: 6px;
}
.filter-list-container {
  max-height: 290px;
  min-height: 200px;
  .select-filter-list {
    background-color: #f7f8fa;
    &:hover {
      background-color: #f3f4f6;
    }
    &.selected {
      background-color: #eff6ff;
      color: #196dfd;
      &:hover {
        background-color: #e8f0ff;
      }
    }
  }
}
.filter-list-container-xl {
  max-height: 340px;
  min-height: 200px;
}
</style>
