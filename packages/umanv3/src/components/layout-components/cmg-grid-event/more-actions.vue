<template>
  <button
    class="cmg-btn cmg-more-actions vertical"
    :class="{ 'absolute z-50 -left-8': gridType === 'page' }"
    @click="toggleDropdown"
  >
    <SvgIcon
      name="more-actions"
      :more-actions-index="index"
      class="w-4"
      style="margin-top: 0.2rem"
    />
    <Teleport
      v-if="usePortal"
      to="body"
    >
      <div
        class="dropdown"
        :style="dropdownStyle"
        @mouseleave="toggleDropdown"
      >
        <div
          v-for="(action, i) in actionBtnCol.actionBtnOptions"
          :key="i"
        >
          <a
            class="dropdown-option"
            :class="[
              { 'bg-red-50 text-red-600': confirm.state },
              { 'confirm-option': action.confirmBtn },
              { disabled: isDisabled(row.issue_id) },
            ]"
            @click="handleAction(action, $event)"
          >
            <span
              class="list-text"
              :class="{ 'confirm-option': action.confirmBtn }"
            >
              {{ confirm.state ? "Confirmer" : action.actionBtnValue }}
            </span>
          </a>
        </div>
      </div>
    </Teleport>
  </button>
</template>

<script lang="ts">
import SvgIcon from "../../atoms/SvgIcon/index.vue"

export default {
  components: {
    SvgIcon,
  },
  props: ["actionBtnCol", "row", "missions", "index", "gridType", "confirm"],
  data() {
    return {
      usePortal: false,
      position: {
        x: 0,
        y: 0,
      },
    }
  },
  computed: {
    dropdownStyle() {
      return {
        top: `${this.position.y}px`,
        left: `${this.position.x}px`,
      }
    },
  },
  methods: {
    toggleDropdown(event) {
      if (this.usePortal) return (this.usePortal = false)
      const elementPosition = event.target.getBoundingClientRect()
      this.position = {
        x: elementPosition.left,
        y: elementPosition.bottom,
      }
      this.usePortal = true
    },
    handleAction(action) {
      if (action.confirmBtn) {
        this.confirm.state ? action.actionBtnFunc(this.row) : this.$emit("confirm.state", true)
      } else {
        action.actionBtnFunc(this.row)
      }
    },
    isDisabled(issue_id) {
      if (!this.missions) return false
      let res = false
      for (const mission of this.missions) {
        if (mission.issue_id === issue_id) res = true
      }
      return res
    },
  },
}
</script>

<style lang="scss">
.dropdown {
  position: absolute;
  width: 240px;
  padding: 8px;
  background-color: #fff;
  border-radius: 4px;
  z-index: 10;
  box-shadow: 0 0 1px 1px rgb(0 0 0 / 10%);
  cursor: auto;
  a {
    display: flex;
    align-items: center;
    padding: 3px 8px 7px;
    color: #000;
    transition: 0.2s;
    cursor: pointer;
    border-radius: 4px;
  }
}
</style>
