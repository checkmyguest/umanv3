import { defineStore } from "pinia";

export interface IEvents{
  code: string,
  id: number,
  notes: number,
  origin: string,
  guestName: string,
  reason: string,
  fontStatusIn: string,
  frontHousingName: string,
  housingId: number,
  frontTagList: string,
  tsCreate: Date,
  frontDateStart: Date,
  frontDateEnd: Date,
  frontCaution: string,
  frontAccessType: string,
  nukiToken: string,
  ciType: string,
  frontAccountManagers: string,
  frontTotalAmount: string,
  tags: string;
}

export interface IDatas{
  formattedFilesAccess: string,
  reservations: string
}

export interface IViews{
  id: number,
  filters: JSON,
  position: number,
  name: string
}

export interface IPagination{
  currentPage: number,
  cursor: string
}

export type EventState = {
  datas: IDatas,
  views: Array<IViews>,
  events: Array<IEvents[]>,
  overlay: undefined,
  reload: number,
  neetToFetch: boolean,
  notes: Object,
  pagination: IPagination,
  billingAmounts: Array<any>,
  formatedBillingAmounts: Array<any>
}

export const useEventStore = defineStore({
  id: "eventStore",
  state: () => ({
    datas: {},
    views: [{}],
    events: [{}],
    overlay: undefined,
    reload: 0,
    neetToFetch: false,
    notes: {},
    pagination: {},
    billingAmounts: {},
    formatedBillingAmounts: {}
  } as EventState),
  getters: {
    getBillingAmounts: (state) => {
      return state.billingAmounts;
    },
    getFormatedBillingAmounts: (state) => {
      return state.formatedBillingAmounts;
    },
    getPagination: state => {
      return state.pagination;
    },
    getFormattedFilesAccess: (state) => {
      return state.datas.formattedFilesAccess;
    },
    getViews: (state) => {
      return state.views;
    },
    getPage: (state) => (viewId: number, page: number) => {
      return state.events[viewId]?.[page];
    }
  },
  actions: {
    resetEvents(){
      this.pagination.currentPage = 0;
      this.events = [];
    },
    previousPage(){
      this.pagination.currentPage--;
    },
    addView(view: IViews){
      this.views = [...this.views, view];
    },
    updateView(view: IViews){
      this.views = this.views.map((element: IViews) =>
        (element.id === view.id ? view : element))
    },
    setView(views: IViews[]){
      this.views = views
    },
    deleteView(id: number){
      this.views = this.views.filter((view: IViews) => view.id !== id);
    }
  }
});

export const strict = false;
