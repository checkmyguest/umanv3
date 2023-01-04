<template>
  <div class="container" v-if="hasFullname" :alt="fullname" :title="fullname">
    <div class="initials-container">
      <span>{{ initials }}</span>
    </div>
    <div v-if="showText">
      <p
        class="whitespace-nowrap capitalize"
        :class="{ 'text-blue-600': email }"
      >
        {{ fullname }}
      </p>
      <a v-if="email" :href="`mailto:${email}`" class="block text-xs">
        {{ email }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    fullname: String,
    email: {
      type: String,
      required: false,
    },
    size: {
      type: Number,
      required: false,
      default: 8,
    },
    showText: {
      type: Boolean,
      default: true,
    },
    classes: {
      type: String,
      default: "bgn-blue-sky",
    },
  },
  computed: {
    hasFullname() {
      return (
        this.fullname && this.fullname.length && this.fullname.trim().length
      );
    },
    initials() {
      let initials = this.fullname!.trim()
        .split(" ")
        .map((name) => (name && name.length ? name[0] : ""));
      if (initials.length > 2)
        initials = [initials[0], initials[initials.length - 1]];
      return initials.join("");
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  @apply flex flex-row h-full items-center w-auto;
  .initials-container {
    @apply flex items-center justify-center mr-2;
    width: 22px;
    height: 22px;
    background-color: #edf3f9;
    border-radius: 2px;
    text-transform: uppercase;
    span {
      @apply flex items-center justify-center;
    }
  }
}
</style>
