<script lang="ts">
export default {
  props: {
    model: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: "default",
    },
  },
  methods: {
    changeState() {
      const el = document.querySelector<HTMLElement>("#" + this.id + "-btn")!;
      const el2 = document.querySelector("#" + this.id)!;
      if (!el2.classList.contains("active_" + this.type)) {
        el2.classList.add("active_" + this.type);
        el.style.transform = "translateX(12px)";
      } else {
        el2.classList.remove("active_" + this.type);
        el.style.transform = "translateX(0px)";
      }
    },
  },
};
</script>
<template>
  <div class="toggle-container" :id="id" @click="changeState">
    <div class="toggle-btn" :id="id + '-btn'"></div>
  </div>
</template>

<style lang="scss">
.toggle-container {
  @apply w-8 h-5 relative bg-toggle rounded-full;
  transition: all 0.2s ease-in-out;
  &:hover {
    @apply bg-toggle-primary-hover;
  }
  .toggle-btn {
    @apply absolute w-toggle h-toggle rounded-full bg-white shadow-btn;
    top: 5%;
    left: 1px;
    transition: all 0.2s ease-in-out;
  }
}
.active_default {
  @apply bg-toggle-primary-active;
}
.active_destructive {
  @apply bg-toggle-destructive-active;
  &:hover {
    @apply bg-toggle-destructive-hover;
  }
}
</style>
