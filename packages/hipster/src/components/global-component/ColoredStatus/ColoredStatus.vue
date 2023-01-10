<template>
  <div class="flex items-center" :class="isFullWidth ? 'w-full' : null">
    <span :class="classesComputed" style="border-radius: 2px 0px 0px 2px">
      <span v-if="isTextInside" class="-mt-0.5 whitespace-nowrap nostyle">
        {{ status }}
      </span>
    </span>
    <span v-if="!isTextInside" class="text-sm">{{ status }}</span>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    status: {
      type: String,
      required: true,
    },
    isTextInside: {
      type: Boolean,
      default: false,
    },
    isFullWidth: {
      type: Boolean,
      default: false,
    },
    classes: {
      type: String,
      default: "",
    },
  },
  methods: {
    reservationStateColor(status: string): string {
      switch (status) {
        case "En cours":
        case "Working":
          return "bg-orange-200";
        case "Non demandée":
        case "Terminée":
          return "bg-grey-300";
        case "Expiré":
          return "border bg-grey-300";
        case "Todo":
        case "À faire":
        case "À vérifier":
        case "À venir":
        case "En attente":
          return "bg-yellow-200";
        case "Stuck":
        case "Bloqué":
        case "Echoué":
        case "Non réglée":
        case "Fermé":
        case "Non renseigné":
          return "bg-red-300";
        case "Annulée":
          return "bg-grey-300";
        case "Done":
        case "Terminé":
          return "bg-grey-300";
        case "Toutes":
        case "Unsolved":
        case "Non résolu":
          return "bg-purple-200";
        case "Réservée":
        case "Encaissé":
        case "Réglée":
        case "Ouvert":
        case "Définitif":
        case "Vérifié":
          return "bg-green-200";
        case "Tentative":
          return "bg-purple-200";
        case "Archivé":
        case "Archived":
          return "bg-grey-400";
        case "Prévisionnel":
          return "bg-red-300";
        default:
          return "bg-blue-200";
      }
    },
  },
  computed: {
    classesComputed() {
      let classes = this.class;
      classes += this.isTextInside
        ? " px-1 text-xs badge flex justify-center items-center text-center font-medium rounded-sm"
        : " mr-2 square-custom";
      if (this.isFullWidth) classes += " w-full";
      return `${classes} ${this.classes}`;
    },
    class(): string {
      return this.reservationStateColor(this.status);
    },
  },
};
</script>

<style scoped>
.badge {
  @apply h-badge;
}

.square-custom {
  @apply w-6 h-6;
}
</style>
