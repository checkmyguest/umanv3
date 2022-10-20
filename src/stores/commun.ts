import { defineStore } from "pinia";

export const useCommunStore = defineStore({
  id: "communStore",
  state: () => ({
    startTimer: [],
    endTimer: [],
    notification: null,
    notifMsg: "",
    selectedItems: [],
    start: null,
    end: null,
    confirmation: null,
  }),
  actions: {
    START_TIMER(values: never) {
      this.startTimer.push(values);
    },
    END_TIMER(values: never) {
      this.endTimer.push(values);
    },
    showNotification(alert: never, message: string) {
      (this.notifMsg = message), (this.notification = alert);
    },
    hideNotification() {
      this.notification = null;
      this.notifMsg = "";
    },
    showConfirmation(confirmation: never) {
      this.confirmation = confirmation;
    },
    hideConfirmation() {
      this.confirmation = null;
    },
    setSelectedItems(values: never[]) {
      this.selectedItems = [...values];
    },
  },
});
