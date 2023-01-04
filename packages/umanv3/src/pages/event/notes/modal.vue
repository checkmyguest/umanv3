<template>
  <div
    id="event-note-modal"
    class="modal-container"
  >
    <div
      v-if="modal.note"
      class="modal side-modal"
      @click="onClose"
    >
      <div
        class="content"
        @click.stop
      >
        <div class="updates-header mx-4">
          <div class="close-block flex w-full justify-between items-center py-4 mb-4 border-b">
            <p class="modal-title font-bold">
              Note
            </p>
            <button
              class="close-btn opacity-100 hover:opacity-60 focus:outline-none"
              @click="onClose"
            >
              <SvgIcon name="alert-close" />
            </button>
          </div>
        </div>
        <div class="modal-body updates flex flex-col mx-4">
          <div class="modal-body-wrapper add-updates flex flex-col justify-between">
            <div class="add-new-update my-6">
              <p>{{ modal.note }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SvgIcon from "@/components/atoms/SvgIcon/index.vue";

export default {
  components: { SvgIcon },
  props: ["modal", "onClose"],
}
</script>
