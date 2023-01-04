import { PLATFORM_CAUTION } from "../../constants";

export default {
  methods: {
    cautionStatus(reservation: { origin: any; internalCaution: any; ocisCompleted: any }) {
      if (!PLATFORM_CAUTION.includes(reservation.origin)) return "Gérée en externe"
      return reservation.internalCaution
        ? (reservation.ocisCompleted
          ? "Réglée"
          : "Non réglée")
        : "Non demandée"
    },
  },
}
