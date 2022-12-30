<script lang="ts">
import IconLogoBeta from "@/assets/img/logo/logo_beta.svg";
import IconMenuBtn from "@/assets/img/navbar/menu-btn.svg";
import IconSearch from "@/assets/img/toolbar/search.svg";
export default {
  components: {
    IconLogoBeta,
    IconMenuBtn
  ,
    IconSearch,
  },
};
</script>

<template>
  <div class="toolbar">
    <div class="left-side">
      <div class="menu-btn toolbar-hover">
        <a class="cursor-pointer">
          <IconMenuBtn />
        </a>
      </div>
      <router-link
        to="/"
        class="uman-logo"
      >
        <div class="logo">
          <IconLogoBeta />
        </div>
      </router-link>
      <a class="go-vone ml-4 hover:underline">
        <span>Aller à uman V1</span>
      </a>
    </div>
    <div class="right-side">
      <div class="searchbar toolbar-hover">
        <IconSearch id="search" />
      </div>
      <div class="profile-chart toolbar-hover">
        <button class="actions-icon cmg-btn cmg-more-actions more-actions-nobg">
          KN
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./style.scss"></style>
