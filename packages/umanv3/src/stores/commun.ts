import { defineStore } from "pinia";

interface INotification{

}

export type CommunState = {
  startTimer: unknown[],
  endTimer: unknown[],
  notification: unknown,
  notifMsg: string,
  selectedItems: number[],
  start: unknown,
  end: unknown,
  confirmation: unknown
};

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
  } as CommunState),
  actions: {
    START_TIMER(values: unknown) {
      this.startTimer.push(values);
    },
    END_TIMER(values: unknown) {
      this.endTimer.push(values);
    },
    showNotification(alert: unknown, message: string) {
      (this.notifMsg = message), (this.notification = alert);
    },
    hideNotification() {
      this.notification = null;
      this.notifMsg = "";
    },
    showConfirmation(confirmation: unknown) {
      this.confirmation = confirmation;
    },
    hideConfirmation() {
      this.confirmation = null;
    },
    setSelectedItems(values: number[]) {
      this.selectedItems = [...values];
    },
  },
});
