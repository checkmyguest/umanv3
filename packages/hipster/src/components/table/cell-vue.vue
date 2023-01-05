<script lang="ts">
import { STATE_COLOR } from "../../../constants";
import { ITagOptions } from "../../constants/tags/tags";
import tagOptions from "../../constants/tags/tags.json";
import ColoredStatus from "../global-component/ColoredStatus.vue";
import InitialName from "../global-component/InitialName/InitialName.vue";
import SvgIcon from "../global-component/SvgIcon/svg-icon.vue";
import SelectVue from "../select/select-vue.vue";

export default {
  components: {
    SvgIcon,
    InitialName,
    ColoredStatus,
    SelectVue,
  },
  props: {
    data: {
      type: null,
      required: true,
    },
    itemKey: {
      type: String,
      required: true,
    },
    reservationId: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      stateFormat: STATE_COLOR,
      badgeItem: ["status", "state", "guestProfileStatus", "caution"],
      tagsDropdown: false,
      link: false,
      tagOptions: tagOptions,
    };
  },
  methods: {
    imgUrl() {
      return "src/assets/logos/" + this.data + ".png";
    },
    isBadge(): boolean {
      return this.badgeItem.some((item) => this.itemKey === item);
    },
    setBadgeColor(): string {
      let classBadge: string = "";
      this.stateFormat.forEach((state) => {
        if (state.values.some((value) => value === this.data))
          classBadge = state.class;
      });
      if (classBadge === "") classBadge = "bg-blue-sky";
      return classBadge;
    },
  },
};
</script>

<template>
  <div v-if="itemKey === 'event'" class="cell-container event">
    <a href="google.fr" class="link-custom">{{ data.id }}</a>
    <p>
      |
      <span> {{ data.notes ? "1 note" : "0 note" }}</span>
    </p>
  </div>
  <div class="cell-container origin" v-else-if="itemKey === 'origin'">
    <img class="logo-origin" :src="imgUrl()" :alt="data" />
    <label>{{ data }}</label>
  </div>
  <div v-else-if="itemKey === 'guest_name'" class="cell-container">
    <InitialName :fullname="data" :showText="true" />
  </div>
  <div v-else-if="itemKey === 'housing'" class="cell-container housing">
    <a class="link-custom" href="google.fr">{{ data.housing_name }}</a>
    <span>{{ data.housing_id }}</span>
  </div>
  <div v-else-if="itemKey === 'tags'" class="cell-container tags">
    <SelectVue
      :tagsReservation="data"
      :tagsContainer="(tagOptions as ITagOptions[])"
      :reservationId="reservationId!"
    />
  </div>
  <div v-else-if="isBadge()" class="cell-container badge">
    <label :class="setBadgeColor()">{{ data }}</label>
  </div>
  <div
    v-else-if="itemKey === 'accountManagers'"
    class="cell-container"
    :class="itemKey"
  >
    <InitialName
      v-for="(am, index) in data"
      :fullname="am.firstname + ' ' + am.lastname"
      :showText="false"
    />
  </div>
  <div v-else-if="itemKey === 'ciType'" class="cell-container" :class="itemKey">
    <label>{{ data.ci_type_name }}</label>
  </div>
  <div v-else :class="itemKey" class="cell-container">
    <a href="google.fr" v-if="link" class="link-custom">{{ data }}</a>
    <label v-else>{{ data }}</label>
  </div>
</template>

<style lang="scss">
@mixin text-badge {
  border-radius: 2px;
  font-family: "URWGeometric Medium";
  font-weight: 500;
  font-size: 0.75rem/* 12px */;
  line-height: 1rem/* 16px */;
  text-align: center;
  padding: 0 4px;
  display: flex;
  align-items: center;
  height: 18px;
}

@mixin flex($justify, $align){
  display: flex;
  justify-content: $justify;
  align-items: $align;
}

.cell-container {
  font-family: "URWGeometric Medium";
  font-weight: 500;
  font-size: 0.875rem/* 14px */;
  line-height: 1.25rem/* 20px */;
  text-align: start;
  width: 100%;
  color: black;

  label {
    white-space: nowrap;
  }
  height: 32px;
  display: flex;
  align-items: center;
}
.link-custom {
  color: #196DFD;
  &:hover {
    text-decoration: underline;
  }
}
.event {
  @include flex("space-between", "center");
  p {
    padding-left: 12px;
    color: #cccfdb;
    span {
      padding-right: 12px;
      text-decoration: underline;
    }
  }
}
.origin {
  display: flex;
  align-items: center;
  font-family: "URWGeometric Medium";
  font-weight: 500;
  font-size: 0.875rem/* 14px */;
  line-height: 1.25rem/* 20px */;
  text-align: start;
  color: black;
  height: 32px;
  .logo-origin {
    border-radius: 2px;
    width: 24px;
    height: auto;
  }
  label {
    padding-left: 12px;
  }
}
.badge {
  label {
    @include text-badge();
  }
}

.housing {
  @include flex('space-between', 'center');
  font-size: 0.875rem/* 14px */;
  line-height: 1.25rem/* 20px */;
  span {
    color: #9898aa;
    padding-right: 12px;
  }
}

.tags {
  position: absolute;
  top: 0;
  left: 0;
}

.accountManagers {
  display: flex;
  justify-content: flex-start;
}

.final_price {
  display: flex;
  justify-content: flex-end;
  padding-right: 12px;
  font-family: "URWGeometric Regular";
  font-size: 14px;
}
</style>
