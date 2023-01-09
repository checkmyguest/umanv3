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
  @apply w-8 h-5 relative;
  background-color: #d1e3ff;
  border-radius: 48px;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #7799cd;
  }
  .toggle-btn {
    @apply absolute;
    top: 5%;
    left: 1px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: white;
    box-shadow: 0px 0.5px 1px 0.5px rgba(6, 18, 73, 0.2);
    transition: all 0.2s ease-in-out;
  }
}
.active_default {
  background-color: #196dfd !important;
}
.active_destructive {
  background-color: #ff0059 !important;
  &:hover {
    background: linear-gradient(
        0deg,
        rgba(6, 18, 73, 0.2),
        rgba(6, 18, 73, 0.2)
      ),
      #ff0059;
  }
}
</style>
