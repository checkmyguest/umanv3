<!-- This component goal is to dynamically import svgs as vue component -->

<template>
  <component
    :is="dynamicComponent"
    v-bind="styling"
  />
</template>

<script lang="ts">
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    styling: {
      type: Object,
      required: false,
    },
  },
  computed: {
    dynamicComponent() {
      const name = this.name
      return () => import(`../../../assets/img/${name}.svg`)
    },
  },
}
</script>
