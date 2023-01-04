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
          return "bg-orange-light";
        case "Non demandée":
        case "Terminée":
          return "bg-sky";
        case "Expiré":
          return "border bg-sky";
        case "Todo":
        case "À faire":
        case "À vérifier":
        case "À venir":
        case "En attente":
          return "bg-yellow-bgn";
        case "Stuck":
        case "Bloqué":
        case "Echoué":
        case "Non réglée":
        case "Fermé":
        case "Non renseigné":
          return "bg-red-light";
        case "Annulée":
          return "bg-sky";
        case "Done":
        case "Terminé":
          return "bg-sky";
        case "Toutes":
        case "Unsolved":
        case "Non résolu":
          return "bg-purple-light";
        case "Réservée":
        case "Encaissé":
        case "Réglée":
        case "Ouvert":
        case "Définitif":
        case "Vérifié":
          return "bg-green-light";
        case "Tentative":
          return "bg-purple-light";
        case "Archivé":
        case "Archived":
          return "bg-grey1";
        case "Prévisionnel":
          return "bg-red-darker";
        default:
          return "bg-blue-sky";
      }
    },
  },
  computed: {
    classesComputed() {
      let classes = this.bgClass;
      classes += this.isTextInside
        ? " px-1 text-xs badge flex justify-center items-center text-center font-medium rounded-sm"
        : " mr-2 square-custom";
      if (this.isFullWidth) classes += " w-full";
      return `${classes} ${this.classes}`;
    },
    bgClass(): string {
      return this.reservationStateColor(this.status);
    },
  },
};
</script>

<style scoped>
.badge {
  height: 18px;
}

.square-custom {
  width: 26px;
  height: 26px;
}
</style>
