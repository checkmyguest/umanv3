<template>
  <EventFocus 
      type="reservation" 
      :event="event"    
  />
</template>

<script lang="ts">
import EventFocus from "@/pages/event/focus/index.vue";

export default {
  components: {
      EventFocus,
  },
  data() {
      return {
          event: null
      }
  }
}
</script>