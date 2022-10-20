<template>
  <div
    v-if="hasFullname"
    class="flex items-center"
    :alt="fullname"
    :title="fullname"
  >
    <div
      class="rounded flex items-center justify-center uppercase"
      :class="initialsClasses"
    >
      <span>{{ initials }}</span>
    </div>
    <div v-if="showText">
      <p
        class="whitespace-nowrap capitalize"
        :class="{ 'text-blue-600': email }"
      >
        {{ fullname }}
      </p>
      <a
        v-if="email"
        :href="`mailto:${email}`"
        class="block text-xs"
      >
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
      return this.fullname && this.fullname.length > 0 && this.fullname.trim().length > 0
    },
    initialsClasses() {
      let classes = `h-${this.size} w-${this.size}`
      classes += this.email ? " mr-4" : " mr-2"
      if (this.size <= 6) {
        classes += " text-xs"
      }
      classes += ` ${this.classes}`
      return classes
    },
    initials() {
      let initials = this.fullname?.trim()
        .split(" ")
        .map((name) => (name && name.length > 0 ? name[0] : ""))
      if (initials!.length > 2) initials = [initials![0], initials![initials!.length - 1]]
      return initials!.join("")
    },
  },
}
</script>
