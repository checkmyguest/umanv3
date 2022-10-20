<template>
  <div
    class="flex items-center"
    :class="isFullWidth ? 'w-full' : null"
  >
    <span
      :class="classesComputed"
      style="border-radius: 2px 0px 0px 2px"
    >
      <span
        v-if="isTextInside"
        class="-mt-0.5 whitespace-nowrap nostyle"
      >
        {{ status }}
      </span>
    </span>
    <span
      v-if="!isTextInside"
      class="text-sm"
    >{{ status }}</span>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      required: true,
    },
    isTextInside: {
      type: Boolean,
      default: false,
    },
    isFullWidth: {
      type: Boolean,
      default: false,
    },
    classes: {
      type: String,
      default: "",
    },
  },
  computed: {
    classesComputed() {
      let classes = `${this.bgClass} nostyle `;
      classes += this.isTextInside
        ? "px-1 text-xs badge flex justify-center items-center text-center font-medium rounded-sm"
        : "mr-2 square-custom";
      if (this.isFullWidth) classes += " w-full";
      return `${classes} ${this.classes}`;
    },
    bgClass() {
      return this.$reservationStateColor(this.status);
    },
  },
};
</script>

<style scoped>
.badge {
  height: 18px;
}

.square-custom {
  width: 26px;
  height: 26px;
}
</style>
