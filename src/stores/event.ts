import { defineStore } from "pinia";

interface Tags{
  tag_id: number,
  name: string
}

export interface IEvents {
  code: string;
  id: number;
  notes: number;
  origin: string;
  guestName: string;
  reason: string;
  fontStatusIn: string;
  frontHousingName: string;
  housingId: number;
  frontTagList: string;
  tsCreate: Date;
  frontDateStart: Date;
  frontDateEnd: Date;
  frontCaution: string;
  frontAccessType: string;
  nukiToken: string;
  ciType: {
    ci_type_id: string;
  };
  frontAccountManagers: string;
  frontTotalAmount: string;
  tags: string;
}

export interface IDatas {
  formattedFilesAccess: string;
  reservations: string;
  tags: Tags[]
}

export interface IViews {
  id: number;
  filters: JSON;
  position: number;
  name: string;
}

export interface IPagination {
  currentPage: number;
  cursor: string;
  totalPage: number;
  total: number;
}

export type EventState = {
  datas: IDatas;
  views: Array<IViews>;
  events: Array<IEvents[]>;
  overlay: undefined;
  reload: number;
  neetToFetch: boolean;
  notes: Object;
  pagination: IPagination;
  billingAmounts: Array<any>;
  formatedBillingAmounts: Array<any>;
};

export const useEventStore = defineStore({
  id: "eventStore",
  state: () =>
    ({
      datas: {},
      views: [{}],
      events: [{}],
      overlay: undefined,
      reload: 0,
      neetToFetch: false,
      notes: {},
      pagination: {},
      billingAmounts: {},
      formatedBillingAmounts: {},
    } as EventState),
  getters: {
    getPage(): IEvents[][]{
      return this.events;
    },
    getBillingAmounts(): Array<any>{
      return this.billingAmounts;
    },
    getFormatedBillingAmounts(): Array<any>{
      return this.formatedBillingAmounts;
    },
    getPagination(): IPagination{
      return this.pagination;
    },
    getFormattedFilesAccess(): string{
      return this.datas.formattedFilesAccess;
    },
    getViews(): IViews[] {
      return this.views;
    }
  },
  actions: {
    resetEvents() {
      this.pagination.currentPage = 0;
      this.events = [];
    },
    previousPage() {
      this.pagination.currentPage--;
    },
    addView(view: IViews) {
      this.views = [...this.views, view];
    },
    updateView(view: IViews) {
      this.views = this.views.map((element: IViews) =>
        element.id === view.id ? view : element
      );
    },
    setView(views: IViews[]) {
      this.views = views;
    },
    deleteView(id: number) {
      this.views = this.views.filter((view: IViews) => view.id !== id);
    },
  },
});

export const strict = false;
