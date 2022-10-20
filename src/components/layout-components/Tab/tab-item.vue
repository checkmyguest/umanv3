<template>
  <div>
    <button
      :class="[isActive && 'active bg-blue-100', defaultButtonClass]"
      @click="onTabClick"
    >
      <div class="flex flex-row items-center">
        <SvgIcon
          name="table"
          :fill="isActive && '#196DFD'"
        />
        <input
          v-show="isEditing"
          ref="name-input"
          v-model="newName"
          type="text"
          placeholder="Nom de la vue"
          class="focus:ring-0 focus:outline-none border border-blue-600 rounded-sm mx-2 px-1"
          @blur="renameView"
          @keyup.enter="renameView"
        >
        <p
          v-if="!isEditing"
          :class="[isActive && 'text-blue-600', 'px-1 truncate medium']"
        >
          {{ name }}
        </p>
      </div>
      <div
        v-if="isActive"
        v-click="onRefresh"
        class="refresh-btn w-6 h-6"
        @click.stop=""
      >
        <SvgIcon
          name="refresh-icon"
          fill="#196DFD"
        />
      </div>
    </button>
    <portal
      v-if="usePortal"
      to="body"
    >
      <TabDropdown
        :on-rename="editName"
        :on-delete="deleteView"
        :close-dropdown="closeDropdown"
        :position="dropdownStyle"
      />
    </portal>
  </div>
</template>

<script lang="ts">
import SvgIcon from "../../atoms/SvgIcon/index.vue"
import TabDropdown from "./tab-dropdown.vue"

export default {
  components: { SvgIcon, TabDropdown },
  props: {
    name: {
      type: String,
      require: true,
    },
    isActive: {
      type: Boolean,
      require: true,
    },
    onPress: {
      type: Function,
      require: true,
    },
    onRefresh: {
      type: Function,
      require: true,
    },
    onRename: {
      type: Function,
      require: true,
    },
    onDelete: {
      type: Function,
      require: true,
    },
  },
  data: function () {
    return {
      usePortal: false,
      defaultButtonClass: "tab flex flex-row justify-between items-center px-3",
      position: { x: 0, y: 0 },
      newName: "",
      isEditing: false,
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
    closeDropdown() {
      this.usePortal = false
    },
    editName() {
      this.closeDropdown()
      this.newName = this.name
      this.isEditing = true
      this.$nextTick(() => this.$refs["name-input"].focus())
    },
    renameView() {
      if (!this.isEditing || this.name === this.newName) return
      this.isEditing = false
      this.onRename(this.newName)
    },
    deleteView() {
      this.closeDropdown()
      this.onDelete()
    },
    onTabClick(event) {
      if (this.isEditing) return false
      if (!this.isActive) return this.onPress()
      const elementPosition = event.target.getBoundingClientRect()
      this.position = {
        x: elementPosition.left,
        y: elementPosition.bottom,
      }
      this.usePortal = true
    },
  },
}
</script>

<style scoped lang="scss">
.tab {
  min-width: 150px;
  border-radius: 4px;
  padding-top: 9px;
  padding-bottom: 9px;
}
.tab:hover {
  background-color: $sky-lighter;
}
.tab div p {
  max-width: 150px;
}
</style>