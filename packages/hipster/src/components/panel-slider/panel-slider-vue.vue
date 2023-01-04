<script lang="ts">
import SvgIcon from "../../components/global-component/SvgIcon/svg-icon.vue";

export default {
  components: { SvgIcon },
  data() {
    return {
      direction: "left",
    };
  },
  methods: {
    changeState() {
      if (this.direction === "left") this.direction = "right";
      else this.direction = "left";
      this.$emit("slide");
    },
  },
};
</script>

<template>
  <div class="slider-container">
    <div class="slider" :class="direction" @click="changeState">
      <SvgIcon name="ArrowDown" />
    </div>
  </div>
</template>

<style lang="scss">
.slider-container {
  @apply flex items-center relative;
  .left {
    position: absolute;
    transition: all 0.3s ease-in-out;
    left: -12px;
    &:hover {
      svg {
        margin-left: 10px;
      }
    }
    svg {
      transition: all 0.3s ease-in-out;
      transform: rotate(-90deg);
      margin-right: 3px;
    }
  }
  .right {
    position: absolute;
    transition: all 0.3s ease-in-out;
    right: -12px;
    &:hover {
      svg {
        margin-right: 10px;
      }
    }
    svg {
      transition: all 0.3s ease-in-out;
      transform: rotate(90deg);
      margin-left: 3px;
    }
  }
}
.slider {
  @apply flex justify-center items-center;
  width: 25px;
  height: 25px;
  border-radius: 4px;
  border: 1px solid #cccfdb;
  transition: width 0.3s ease-in-out;
  &:hover {
    width: 34px;
  }
}
</style>
