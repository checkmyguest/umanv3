<template>
  <span class="flex items-center">
    <a
      :href="href"
      class="underline hover:no-underline overflow-hidden block text-blue-600 overflow-ellipsis"
      target="_blank"
    >
      {{ textToShow }}
    </a>
    <IconExternalLink
      class="w-8"
      :v-show="showIcon"
    />
  </span>
</template>

<script>
import IconExternalLink from '~/assets/img/toolbar/external-link.svg?inline'

export default {
    components: {
        IconExternalLink
    },
    props: {
        href: String,
        text: {
            type: String,
            default: null,
            required: false
        },
        showIcon: {
            type: Boolean,
            default: true,
            required: false
        }
    },
    computed: {
        textToShow() {
            return this.text ?? this.href
        }
    }
}
</script>