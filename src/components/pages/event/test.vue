<script setup lang="ts">
import { useAdminStore } from "@/stores/admin";
import { useEventStore } from "@/stores/event";
import { useHousingStore } from "@/stores/housing";
import { computed } from "vue";
import { EVENT_COLUMNS, EVENT_FILTERS } from "../../../../constants";
import SvgIcon from "../../atoms/SvgIcon/index.vue";
import InitialsName from "../../global/initials-name.vue";
import CmgGridEvent from "../../layout-components/cmg-grid-event/cmg-grid-event.vue";
import FilterList from "../../layout-components/Filter/filter-list.vue";
import TabList from "../../layout-components/Tab/tab-list.vue";
import NoteModal from "./notes/index.vue";

// STORES //
const eventStore = useEventStore();
const housingStore = useHousingStore();
const adminStore = useAdminStore();

interface IFetch {
  reservation: boolean;
  maintenances: boolean;
  views: boolean;
  tags: boolean;
  ciTypes: boolean;
  admins: boolean;
  housings: boolean;
  accountManagers: boolean;
}

interface IModal {
  addResa: boolean;
  addUnav: boolean;
  note: undefined;
  tags: undefined;
}

// VARIABLES //
let fetch: IFetch = {
  reservation: false,
  maintenances: false,
  views: false,
  tags: false,
  ciTypes: false,
  admins: false,
  housings: false,
  accountManagers: false,
};
let loading = false;
let activeId: number | undefined;
let usePortal = false;
let useNotePortal = false;
let useTagPortal = false;
let filters: typeof EVENT_FILTERS;
let columns: typeof EVENT_COLUMNS;
let modal: IModal = {
  addResa: false,
  addUnav: false,
  note: undefined,
  tags: undefined,
};

// COMPUTED //
const housings = computed(() => {
  return housingStore.datas.housings || [];
});
const accountManagers = computed(() => {
  return adminStore.datas.accountManagers || [];
});
const admins = computed(() => {
  return adminStore.datas.admins || [];
});
const pagination = computed(() => {
  return eventStore.getPagination;
});
const views = computed(() => {
  return eventStore.getViews;
});
const activeView = computed(() => {
  if (!views.value) return;
  return views.value.find(({ id }) => id === activeId);
});
const filtersLength = computed(() => {
  if (!activeView.value) return;
  // eslint-disable-next-line unicorn/explicit-length-check
  return Object.keys(activeView.value.filters).length || "";
});
const items = computed(() => {
  const currentPagination = pagination;
  if (!currentPagination.value.currentPage) return [];
  return eventStore.getPage(activeId, currentPagination.value.currentPage);
});
const actionButtonCol = computed(() => {
  return {
    hasAction: true,
    actionBtnOptions: [
      {
        actionBtnValue: "Partager les accès",
        actionBtnFunc: sendAccess,
      },
    ],
  };
});

onMounted(async () => {
  try {
    if (eventStore.datas.reservation) {
      fetch.reservation = true;
      fetch.maintenances = true;
      fetch.tags = true;
      fetch.ciTypes = true;
      fetch.admins = true;
      fetch.accountManagers = true;
      fetch.housings = true;
    } else {
      await Promise.all([
        fetchViews(),
        fetchHousings(),
        fetchTags(),
        fetchCiTypes(),
        fetchAdmins(),
        fetchAccountManager(),
      ]);
      addOptionsToFilters();
      fetchItems();
    }
  } catch (error) {
    handleError(error);
  }
});

function toggleFilter(){
  return (usePortal = !usePortal);
}
function newView() {
  activeId = undefined
  return toggleFilter()
}
function onTabClick(id: number) {
  activeId = id
}
function onRefresh() {
  eventStore.resetEvents;
  fetchItems();
}
function fetchItems(){
  loading = true
  const x = activeView.value;
  x?.filters["eventType"] === "reservations"
    ? await fetchReservations()
    : await fetchUnavailabilities()
      loading = false
}
function newEvent() {
  console.log("new event")
}
function setSort() {
  console.log("sort")
}
function onNextPage() {
  if (loading) return
  await fetchItems()
}
function onPreviousPage() {
  this.$store.commit("event/previousPage")
},
/*
  methods: {
    toggleFilter() {
      return (this.usePortal = !this.usePortal)
    },
    newView() {
      this.activeId = undefined
      return this.toggleFilter()
    },
    onTabClick(id: undefined) {
      this.activeId = id
    },
    onRefresh() {
      this.$store.commit("event/resetEvents")
      this.fetchItems()
    },
    newEvent() {
      console.log("new event")
    },
    setSort() {
      console.log("sort")
    },
    async onNextPage() {
      if (this.loading) return
      await this.fetchItems()
    },
    onPreviousPage() {
      this.$store.commit("event/previousPage")
    },
    handleError(error: unknown) {
      const type = JSON.parse(JSON.stringify(error)).message
      if (type?.includes("401")) return this.$router.push("/login")
      console.log("unhandled err:", error)
    },
    getDefaultHeader() {
      return { headers: { Authorization: `Bearer ${this.$cookies.get("token")}` } }
    },
    injectStore(action: string, key: string, data: any) {
      this.$store.commit(action, { key: key, datas: data })
    },
    async fetchItems() {
      this.loading = true
      this.activeView.filters["eventType"] === "reservations"
        ? await this.fetchReservations()
        : await this.fetchUnavailabilities()
      this.loading = false
    },
    async deleteView() {
      await this.$axios.delete(
        `${process.env.apiUrl}/v2/view/${this.activeId}`,
        this.getDefaultHeader()
      )
      this.$store.commit("event/deleteView", this.activeId)
      this.$store.dispatch("commun/displayNotification", {
        alert: "success",
        msg: `La vue a bien été supprimée`,
      })
      this.activeId = undefined
    },
    async upsertView(filters: null, name: any) {
      const view = this.activeId
        ? await this.updateView(filters, name)
        : await this.createView(filters)
      this.$store.dispatch("commun/displayNotification", {
        alert: "success",
        msg: `La vue a bien été ${this.activeId ? "modifiée" : "créée"}`,
      })
      this.activeId = view.id
      this.usePortal = false
      this.fetchItems()
    },
    async createView(filters: any) {
      const response = await this.$axios.post(
        `${process.env.apiUrl}/v2/view`,
        { name: "Nouvelle vue", filters, position: this.views.length + 1 },
        this.getDefaultHeader()
      )
      this.$store.commit("event/addView", response.data)
      this.$store.commit("event/resetEvents")

      return response.data
    },
    async updateView(filters: any, name: any) {
      const response = await this.$axios.put(
        `${process.env.apiUrl}/v2/view/${this.activeId}`,
        {
          ...this.activeView,
          ...(filters && { filters }),
          ...(name && { name }),
        },
        this.getDefaultHeader()
      )
      this.$store.commit("event/updateView", response.data)
      return response.data
    },
    async fetchHousings() {
      const response = await this.$axios.get(
        `${process.env.apiUrl}/v1/housing?columns=housing_id;housing_name;nuki_smartlock_id;nuki_token&active=1`,
        this.getDefaultHeader()
      )
      this.injectStore("housing/injectDatas", "housings", response.data)
      this.fetch.housings = true
    },
    async fetchTags() {
      const response = await this.$axios.get(
        `${process.env.apiUrl}/v1/tag?active=1`,
        this.getDefaultHeader()
      )
      this.injectStore("event/injectDatas", "tags", response.data)
      this.fetch.tags = response.data
    },
    async fetchCiTypes() {
      const response = await this.$axios.get(
        `${process.env.apiUrl}/v1/ci_type`,
        this.getDefaultHeader()
      )
      this.injectStore("event/injectDatas", "ciTypes", response.data)
      this.fetch.ciTypes = response.data
    },
    async fetchAdmins() {
      const response = await this.$axios.get(
        `${process.env.apiUrl}/v1/admin?active=1`,
        this.getDefaultHeader()
      )
      this.injectStore("admin/injectDatas", "admins", response.data)
      this.fetch.admins = true
    },
    async fetchAccountManager() {
      const response = await this.$axios.get(
        `${process.env.apiUrl}/v1/housing_account_manager/list`,
        this.getDefaultHeader()
      )
      this.injectStore("admin/injectDatas", "account_managers", response.data)
      this.fetch.accountManagers = true
    },
    async fetchViews() {
      const response = await this.$axios.get(
        `${process.env.apiUrl}/v2/view`,
        this.getDefaultHeader()
      )
      this.$store.commit("event/setViews", response.data)
      this.activeId = response.data[0] ? response.data[0].id : undefined
      this.$set(this.fetch, "views", true)
    },
    async fetchReservations() {
      try {
        const url = `${process.env.apiUrl}/v2/reservations/searches`
        const response = await this.$axios.post(
          url,
          {
            columns: ["HOUSING_RESERVATION.*", "nuki_token"],
            has_nuki: 1,
            // orderByColumn: orderByMapper[this.orderByColumn],
            orderBy: this.orderBy,
            limit: this.limit,
            after: this.pagination?.cursor,
            ...this.activeView.filters,
          },
          this.getDefaultHeader()
        )
        this.$store.commit("event/injectPage", {
          data: response.data.edges.map((reservation: any) =>
            formatReservation(reservation, {
              admins: this.admins,
              accountManagers: this.accountManagers,
            })
          ),
          viewId: this.activeId,
          pagination: {
            cursor: response.data.cursor,
            ...response.data.pageInfos,
            currentPage: (this.pagination?.currentPage || 0) + 1,
          },
        })
        this.fetch.reservations = true
        this.fetch.maintenances = true
        this.loading = false
      } catch (error) {
        this.handleError(error)
      }
    },
    sendAccess(row: { id: any }) {
      this.$axios
        .get(`${process.env.apiUrl}/v1/reservation/${row.id}/send-access-email`, {
          type: "access",
        })
        .then(() => {
          this.$store.dispatch("commun/displayNotification", {
            alert: "success",
            msg: "Le message a bien été envoyé",
          })
        })
        .catch((error: any) => {
          console.error("sendAccess", error)
          const type = JSON.parse(JSON.stringify(error)).message
          if (type?.includes("401")) {
            this.$router.push("/login")
          }
        })
    },
    getConnectionName(serverState: any) {
      switch (serverState) {
        case 0: {
          return "Active"
        }
        case 1: {
          return "Unregistered"
        }
        case 2: {
          return "Auth uuid invalid"
        }
        case 3: {
          return "Auth invalid"
        }
        case 4: {
          return "Inactive"
        }
      }
    },
    batteryCritical(value: any, charge: string) {
      let returnValue
      if (!charge) charge = ""
      returnValue = value ? "Danger" : "OK";
      if (charge) returnValue = `${charge}%`
      return returnValue
    },
    async fetchInfoSmartlock(housing_id: any, id: any) {
      const housing = this.housings.find((housing: { housing_id: any }) => housing.housing_id === housing_id)
      const key = this.CryptoJS.enc.Utf8.parse(process.env.encryptionDbCrypt)
      const iv = this.CryptoJS.enc.Utf8.parse(process.env.encryptionDbIv)
      const decrypting = this.CryptoJS.AES.decrypt(housing.nuki_token, key, {
        iv,
        padding: this.CryptoJS.pad.ZeroPadding,
        mode: this.CryptoJS.mode.CTR,
      })

      const decrypted = decrypting.toString(this.CryptoJS.enc.Utf8)
      try {
        const response = await this.$axios.get(
          `${process.env.nukiEndpoint}/smartlock/${housing.nuki_smartlock_id}`,
          {
            headers: {
              Authorization: `Bearer ${decrypted}`,
            },
          }
        )
        if (!response)
          return (document.getElementById(`nuki-${id}`).innerHTML = "<p>Infos indisponibles</p>")
        this.openStateNuki = true
        const status = this.getConnectionName(response.data.serverState, housing_id)
        const battery = this.batteryCritical(
          response.data.state.batteryCritical,
          response.data.state.batteryCharge,
          housing_id
        )
        const bat = battery === "Danger" ? "Danger" : "Chargée à"
        const bgStat = status === "Inactive" ? "nuki-pb" : "nuki-ok"
        const bgBat = battery === "Danger" ? "nuki-pb" : "nuki-ok"

        const nuki = document.querySelector(`nuki-${id}`)
        nuki!.innerHTML = `
              <div class="cmg-btn tertiary-btn h-5 mr-auto ${bgStat}">
                <p class="mr-1 whitespace-nowrap">${status}</p>
              </div>
              <div class="cmg-btn tertiary-btn h-5 ${bgBat}">
                <p class="ml-1">${bat}</p>
                <p class="mx-1">${battery}</p>
              </div>
            `
        nuki!.classList.remove("cmg-btn")
        nuki!.classList.remove("tertiary-btn")
      } catch (error) {
        this.handleError(error)
      }
    },
    onNoteClick(row: { notes: null; code: string; id: any; housing_id: any }) {
      if (!row.notes) {
        return this.$router.push(
          `/event/focus?${row.code.slice(0, 2) === "UN" ? "unid" : "rid"}=${row.id}&hid=${
            row.housing_id
          }&overlay=notes`
        )
      }
      this.modal.note = row.notes
      this.useNotePortal = true
    },
    onCloseNoteModal() {
      this.modal.note = undefined
      this.useNotePortal = false
    },
    addOptionsToFilters() {
      const housings = this.$store.state.housing.datas.housings
      const externalOptions = {
        account_manager_id: this.$store.state.admin.datas.admins.reduce((result: any, admin: { is_account_manager: any; admin_id: any; firstname: any; lastname: any }) => {
          if (!admin.is_account_manager) return result
          return [
            ...result,
            { value: admin.admin_id, label: `${admin.firstname} ${admin.lastname}` },
          ]
        }, []),
        checkin_type: this.fetch.ciTypes.map((ciType: { ci_type_id: any; ci_type_name: any }) => ({
          value: ciType.ci_type_id,
          label: ciType.ci_type_name,
        })),
        hid: housings.map(({ housing_id, housing_name }) => ({
          value: housing_id,
          label: housing_name,
        })),
        building_name: map(
          groupBy(
            housings,
            (housing) =>
              housing.housing_name.slice(0, Math.max(0, housing.housing_name.indexOf("-"))).trim() || "AUTRE"
          ),
          (value, key) => ({ label: `Tous les ${key}`, value: map(value, "housing_id") })
        ),
        tags: this.fetch.tags.map(({ tag_id, name }) => ({ value: tag_id, label: name })),
      }
      this.filters = this.filters.reduce((result: any, filter: { external: any; options: any; key: string | number }) => {
        if (filter.external) {
          filter.options = externalOptions[filter.key]
        }
        return [...result, filter]
      }, [])
    },
    updateTags(rid, tagId, name) {
      for (let event of this.currentReservations) {
        if (event.id === rid) {
          if (!event.front_tagList.includes(name)) {
            event.front_tagList.push(name)
            this.$axios
              .post(
                `${process.env.apiUrl}/v1/reservation/${rid}/tag`,
                {
                  tag_id: tagId,
                },
                {
                  headers: {
                    Authorization: `Bearer ${this.$cookies.get("token")}`,
                  },
                }
              )
              .then((res) => {
                console.log(res)
              })
          } else {
            for (let index = 0; index < event.front_tagList.length; index++) {
              if (event.front_tagList[index] === name) {
                event.front_tagList.splice(index, 1)
                this.$axios
                  .delete(`${process.env.apiUrl}/v1/reservation/${rid}/tag/${tagId}`, {
                    headers: {
                      Authorization: `Bearer ${this.$cookies.get("token")}`,
                    },
                  })
                  .then((res) => {
                    console.log(res)
                  })
              }
            }
          }
        }
      }

      this.$store.commit("event/injectDatas", {
        key: "reservations",
        datas: this.currentReservations,
      })
    },
  },
}*/
</script>