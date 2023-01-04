<script lang="ts">
export default {
  components: {},
  data() {
    return {
      yourValue: "",
    };
  },
};
</script>

<template>
  <div class="input-container">
    <vue-tel-input v-model="yourValue"></vue-tel-input>
  </div>
</template>

<style scoped lang="scss"></style>
