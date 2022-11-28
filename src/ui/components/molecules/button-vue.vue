<script lang="ts">
import Loader from "../../assets/icons/Loader.vue";
import SvgIcon from "../SvgIcon/svg-icon.vue";

export default {
  components: {
    Loader,
    SvgIcon
  },
  data() {
    return {
      showIcon: false,
      leftIcon: false,
      rightIcon: false,
      loadingSvg: Loader,
    };
  },
  props: {
    elText: { type: String, required: false },
    elType: { type: String, required: true },
    iconLeft: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false },
    // action: { type: String, required: true },
    // size: { type: String, required: true }
  }
};
</script>
<template>
  <div>
    <el-button class="cmg-btn" v-if="!disabled && !iconLeft" :class="[elType, elType === 'secondary' ? 'selected' : '']">
      <span>
        <label v-if="elText">{{ elText }}</label>
      </span>
    </el-button>

    <el-button
      v-else-if="!disabled && iconLeft"
      :class="[elType, elType === 'secondary' ? 'selected' : '']"
      class="cmg-btn icon-left"
    >
      <el-icon class="el-icon--left icon-class"><SvgIcon name="Loader" /></el-icon>
      <span>
        <label v-if="elText">{{ elText }}</label>
      </span>
    </el-button>

    <el-button
      v-else-if="disabled && iconLeft"
      :class="elType"
      class="cmg-btn icon-left"
      disabled
    >
      <el-icon class="el-icon--left icon-class"><SvgIcon name="Loader" /></el-icon>
      <span>
        <label v-if="elText">{{ elText }}</label>
      </span>
    </el-button>
    
    <el-button
      v-else-if="disabled"
      class="cmg-btn"
      :iconLeft="iconLeft"
      :class="elType"
      disabled
    >
      <span v-if="elText !== ''">
        {{ elText }}
      </span>
    </el-button>
  </div>
</template>
<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}
.el-button{
  padding: 2px 12px 4px 12px;
}
.icon-left{
  padding: 2px 12px 4px 6px;
  .icon-class{
    margin-top: 2px;
  }
}
</style>
