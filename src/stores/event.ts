import { defineStore } from "pinia";
import { EVENT_FILTERS } from "../../constants";

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
  filters: typeof EVENT_FILTERS;
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
  currentResa: Object;
  allTags: Array<any>;
  tagsByResaId: Array<any>;
  paymentsByResaId: Array<any>;
  identityFilesById: Array<any>;
  selfieFilesById: Array<any>;
  housingById: Object;
  tipByHousingId: Array<any>;
  accountManagerByHousingId: Array<any>;
  statusByHousingId: Array<any>;
  logsByHousingIdAndResaId: Array<any>;
  bedroomByHousingId: Array<any>;
  chatByPhone: Array<any>
  airbnbTeam: Array<any>
  isAccountManager: Array<any>
  platformAccount: Array<any>
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
      currentResa: {},
      allTags: [{}],
      tagsByResaId: [{}],
      paymentsByResaId: [{}],
      identityFilesById: [{}],
      selfieFilesById: [{}],
      housingById: {},
      tipByHousingId: [{}],
      accountManagerByHousingId: [{}],
      statusByHousingId: [{}],
      logsByHousingIdAndResaId: [{}],
      bedroomByHousingId: [{}],
      chatByPhone: [{}],
      airbnbTeam: [{}],
      isAccountManager: [{}],
      platformAccount: [{}],
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



    setCurrentResa(data: Object) {
      this.currentResa = data;
    },
    setAllTags(data: Array<Object>) {
      this.allTags = data;
    },
    setTagsByResaId(data: Array<Object>) {
      this.tagsByResaId = data;
    },
    setPaymentsByResaId(data: Array<Object>) {
      this.paymentsByResaId = data;
    },
    setIdentityFilesById(data: Array<Object>) {
      this.identityFilesById = data;
    },
    setSelfieFilesById(data: Array<Object>) {
      this.selfieFilesById = data;
    },
    setHousingById(data: Array<Object>) {
      this.housingById = data;
    },
    setTipByHousingId(data: Array<Object>) {
      this.tipByHousingId = data;
    },
    setAccountManagerByHousingId(data: Array<Object>) {
      this.accountManagerByHousingId = data;
    },
    setStatusByHousingId(data: Array<Object>) {
      this.statusByHousingId = data;
    },
    setLogsByHousingIdAndResaId(data: Array<Object>) {
      this.logsByHousingIdAndResaId = data;
    },
    setBedroomByHousingId(data: Array<Object>) {
      this.bedroomByHousingId = data;
    },
    setChatByPhone(data: Array<Object>) {
      this.chatByPhone = data;
    },
    setAirbnbTeam(data: Array<Object>) {
      this.airbnbTeam = data;
    },
    setIsAccountManager(data: Array<Object>) {
      this.isAccountManager = data;
    },
    setPlatformAccount(data: Array<Object>) {
      this.platformAccount = data;
    },
  },
});

export const strict = false;
