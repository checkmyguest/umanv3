<script lang="ts">
import ArrowDown from "../../assets/icons/ArrowDown.vue";

import Loader from "../../assets/icons/Loader.vue";

import SvgIcon from "../SvgIcon/svg-icon.vue";
import ButtonVue from "./button-vue.vue";

export interface Actions {
  name: string;
  function: Function;
}

export default {
  components: {
    ArrowDown,
    Loader,
    SvgIcon,
    ButtonVue,
  },
  data() {
    return {
      showIcon: false,
      leftIcon: false,
      rightIcon: false,
      classSvg: [
        this.elType === "primary" || this.elType === "destructive"
          ? "white-svg"
          : "",
        this.elType === "secondary" ? "border-left" : "",
      ],
    };
  },
  props: {
    elText: { type: String, required: false },
    elType: { type: String, required: true },
    iconLeft: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false },
    id: { type: String, required: true },
    mainAction: { type: Function, require: false },
    actions: { type: Array<Actions>, required: true },
    split: { type: Boolean, required: false },
    // size: { type: String, required: true }
  },
  mounted() {
    this.setClasses();
  },
  methods: {
    setClasses() {
      const button = document.querySelector(
        "#" + this.id
      ) as HTMLElement | null;
      if (button != null) {
        button.classList.add(this.elType);
        // button.style.fontSize = this.size;
      }
    },
  },
};
</script>

<template>
  <div>
    <el-dropdown
      trigger="click"
      v-if="!disabled && !iconLeft && !split"
      :elType="elType"
      :id="id"
    >
      <el-button class="cmg-btn">
        {{ elText
        }}<el-icon class="el-icon--right icon-class"><ArrowDown /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu class="dropdown-menu">
          <el-dropdown-item
            v-for="(action, i) in actions"
            @click="action.function"
          >
            {{ action.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-dropdown
      trigger="click"
      v-if="!disabled && iconLeft && !split"
      :elType="elType"
      :id="id"
    >
      <el-button class="cmg-btn icon-left">
        <el-icon class="el-icon--left icon-class-left"
          ><SvgIcon name="Loader" /></el-icon
        >{{ elText
        }}<el-icon class="el-icon--right icon-class"><ArrowDown /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-item
          v-for="(action, i) in actions"
          @click="action.function"
          >{{ action.name }}</el-dropdown-item
        >
      </template>
    </el-dropdown>

    <el-dropdown
      trigger="click"
      v-if="disabled && iconLeft"
      :elType="elType"
      :id="id"
    >
      <el-button disabled class="cmg-btn icon-left">
        <el-icon class="el-icon--left icon-class-left"
          ><SvgIcon name="Loader" /></el-icon
        >{{ elText
        }}<el-icon class="el-icon--right icon-class"><ArrowDown /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-item
          v-for="(action, i) in actions"
          @click="action.function"
          >{{ action.name }}</el-dropdown-item
        >
      </template>
    </el-dropdown>

    <el-dropdown v-else-if="disabled" :elType="elType" :id="id">
      <el-button class="cmg-btn" disabled>
        {{ elText
        }}<el-icon class="el-icon--right icon-class"><ArrowDown /></el-icon>
      </el-button>
    </el-dropdown>

    <div class="split-button_container cmg-btn" v-if="split && !disabled">
      <el-button class="split-button" :class="elType" @click="mainAction">{{
        elText
      }}</el-button>
      <el-dropdown class="split-dropdown" trigger="click">
        <span :class="[classSvg, elType]">
          <SvgIcon name="ArrowDown" />
        </span>
        <template #dropdown>
          <el-dropdown-item
            v-for="(action, i) in actions"
            @click="action.function"
            >{{ action.name }}</el-dropdown-item
          >
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dropdown-menu {
  background-color: blueviolet;
}

.el-button {
  @apply shadow-none m-0 text-sm font-medium;
  padding: 2px 6px 6px 10px;
  height: 26px;
  max-height: 26px;
}

.split-button_container {
  max-height: 26px !important;
  position: relative;
  .split-button {
    padding: 2px 10px 6px 10px;
    border-radius: 4px 0 0 4px;
    border-right: none !important;
  }
  .split-dropdown {
    height: 26px;
    width: 26px;
    span {
      border-radius: 0 4px 4px 0 !important;
      padding-bottom: 3px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .split-dropdown_disabled {
    height: 26px;
    width: 26px;
    border-radius: 0 4px 4px 0 !important;
    position: relative;
    span {
      position: absolute;
      top: 0;
      left: 0;
      padding-bottom: 5px;
      padding-right: 2px;
      width: 26px;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .white-svg {
    svg {
      fill: white;
    }
  }
  .border-left {
    border-left: 1px solid rgba(6, 18, 73, 0.1) !important;
  }
}

.icon-left {
  padding: 2px 5px 4px 6px;
  .icon-class-left {
    margin-top: 2px;
  }
}
</style>
