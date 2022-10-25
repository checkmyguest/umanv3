<template>
  <div
    id="reservation"
    class="page reservations"
  >
    <div class="test">
      <h1>Test</h1>
    </div>
    <!-- <AddResaModal :modal="modal" :fetchReservations="fetchReservations" /> --->
    <div
      id="content-wrapper"
      class="relative flex-col p-6 w-full"
    >
      <div class="sticky pb-6">
        <h3>Événements</h3>
      </div>
      <TabList
        :new-view="newView"
        :items="views"
        :active-id="activeId"
        :on-tab-click="onTabClick"
        :on-refresh="onRefresh"
        :on-rename="(name: string) => upsertView(null, name)"
        :on-delete="deleteView"
      />
      <div class="flex items-center justify-between">
        <span>{{
          !loading
            ? `${pagination?.total} événement${items?.length > 0 ? "s" : ""}`
            : ""
        }}</span>
        <div class="flex items-center">
          <button
            id="filter-button"
            class="filter-btn mr-2.5"
            @click="toggleFilter"
          >
            <SvgIcon
              fill="#000"
              name="filter"
            />
            <span class="text">Filtrer {{ filtersLength && `| ${filtersLength}` }}</span>
            <SvgIcon
              fill="#000"
              name="arrow-down"
            />
          </button>
          <button
            class="cmg-btn new-event-btn primary-actions-btn"
            @click="newEvent"
          >
            Nouvel événement
            <span class="arrow-actions">
              <SvgIcon
                fill="#000"
                name="arrow-down"
              />
            </span>
          </button>
        </div>
      </div>
      <CmgGridEvent
        v-slot="slotProps"
        grid-type="page"
        :is-main-page="true"
        :columns="columns"
        :checkbox="true"
        :sticky-col="true"
        :items="items"
        :set-sort="setSort"
        :pagination="pagination"
        :loading="loading"
        :action-btn-col="actionBtnCol"
      >
        <td
          class="justify-between sticky-col"
          :style="slotProps.setWidthColumn('200px')"
        >
          <router-link
            :to="`/event/focus?${
              slotProps.row.code.slice(0, 2) === 'UN' ? 'unid' : 'rid'
            }=${slotProps.row.id}&overlay=notes`"
            class="secondary max-w-xl whitespace-nowrap overflow-hidden cursor-pointer hover:underline flex items-center relative z-10"
            :title="slotProps.row.code"
          >
            <span>{{ slotProps.row.code }}</span>
          </router-link>
          <p
            class="whitespace-nowrap pl-1.5"
            :class="slotProps.row.notes ? 'secondary' : 'brd2'"
          >
            |
            <span
              class="underline cursor-pointer"
              @click="onNoteClick(slotProps.row)"
            >
              {{ slotProps.row.notes ? 1 : 0 }} note
            </span>
          </p>
        </td>
        <td :style="slotProps.setWidthColumn('220px')">
          <ElFormItem
            :platform="slotProps.row.origin"
            :size="6"
          />
        </td>
        <td
          class="cell"
          :style="slotProps.setWidthColumn('200px')"
        >
          <InitialsName
            v-if="slotProps.row.guestName"
            :size="6"
            :fullname="slotProps.row.guestName"
          />
        </td>
        <td :style="slotProps.setWidthColumn('90px')">
          <ColoredStatus
            v-if="!slotProps.row.reason"
            :status="slotProps.row.fontStatusIn"
            :is-text-inside="true"
          />
        </td>
        <td :style="slotProps.setWidthColumn('90px')">
          <ColoredStatus
            :status="slotProps.row.fontStatusIn"
            :is-text-inside="true"
          />
        </td>
        <td :style="slotProps.setWidthColumn('220px')">
          <p v-if="slotProps.row.frontHousingName">
            {{
              slotProps.row.frontHousingName.split("-").slice(0, 1).join("-")
            }}
          </p>
        </td>
        <td
          class="justify-between"
          :style="slotProps.setWidthColumn('220px')"
        >
          <router-link
            class="secondary max-w-xl whitespace-nowrap overflow-hidden hover:underline"
            :title="slotProps.row.frontHousingName"
            :to="`/housing/focus?hid=${slotProps.row.housingId}`"
          >
            {{ slotProps.row.frontHousingName }}
          </router-link>
          <p class="subtitle">
            {{ slotProps.row.housingId }}
          </p>
        </td>
        <td
          class="justify-between"
          :style="slotProps.setWidthColumn('200px')"
        >
          <ElFormItem :platform="slotProps.row.reason" />
        </td>
        <td
          :style="slotProps.setWidthColumn('250px')"
          :title="slotProps.row.frontTagList"
          class="p-0 items-start"
        >
          <div
            :id="`cmg-multiselect-${slotProps.row.id}`"
            class="cmg-multiselect add-tags"
          >
            <div
              :id="`multi-open-${slotProps.row.id}`"
              class="input-content"
            >
              <input
                ref="multi-open"
                type="text"
                values=""
              >
            </div>
            <ul>
              <li
                v-for="(tag, i) in eventStore.datas.tags"
                :id="`multi-select-${slotProps.row.id}-${i}`"
                :key="`tags-${i}`"
                :value="tag.tag_id"
                :class="{
                  selected: slotProps.row.frontTagList.includes(tag.name),
                }"
                @click="
                  $multiSelect(`#multi-select-${slotProps.row.id}-${i}`),
                  updateTags(slotProps.row.id, tag.tag_id, tag.name)
                "
              >
                <p>{{ tag.name }}</p>
              </li>
            </ul>
            <a
              :id="`multi-open-${slotProps.row.id}`"
              class="add-btn"
              @click="$multiOpenOld(`#multi-open-${slotProps.row.id}`)"
            />
          </div>
        </td>
        <td :style="slotProps.setWidthColumn('180px')">
          <p>
            {{
              $dateFns.format(
                new Date(slotProps.row.tsCreate),
                "dd.MM.yyyy HH:mm"
              )
            }}
          </p>
        </td>
        <td :style="slotProps.setWidthColumn('135px')">
          <p>
            {{
              $dateFns.format(
                new Date(slotProps.row.frontDateStart),
                "dd.MM.yyyy"
              )
            }}
          </p>
        </td>
        <td :style="slotProps.setWidthColumn('135px')">
          <p>
            {{
              $dateFns.format(
                new Date(slotProps.row.frontDateEnd),
                "dd.MM.yyyy"
              )
            }}
          </p>
        </td>
        <td :style="slotProps.setWidthColumn('120px')">
          <ColoredStatus
            :status="slotProps.row.frontCaution"
            :is-text-inside="true"
          />
        </td>
        <td
          class="cell"
          :style="slotProps.setWidthColumn('200px')"
        >
          <p>{{ slotProps.row.frontAccessType }}</p>
        </td>
        <td
          :style="slotProps.setWidthColumn('250px')"
          class="justify-center"
        >
          <div
            v-if="
              slotProps.row.nukiToken &&
                slotProps.row.ciType.ci_type_id === 'serrure_electronique'
            "
            :id="`nuki-${slotProps.row.id}`"
            :key="slotProps.row.id"
            class="flex justify-around cmg-btn tertiary-btn h-5 w-full"
            @click="
              fetchInfoSmartlock(slotProps.row.housingId, slotProps.row.id)
            "
          >
            Voir l'état de la Nuki
          </div>
        </td>
        <td
          class="cell"
          :style="slotProps.setWidthColumn('200px')"
        >
          <InitialsName
            v-for="(front_account_manager, i) in slotProps.row
              .frontAccountManagers"
            :key="i"
            :size="6"
            :fullname="front_account_manager"
            :show-text="false"
          />
        </td>
        <td
          class="cell justify-end"
          :style="slotProps.setWidthColumn('100px')"
        >
          <p>{{ $formatNbr(slotProps.row.frontTotalAmount) }}</p>
        </td>
      </CmgGridEvent>
      <div
        v-if="pagination?.totalPage > 0"
        class="pagination my-4 mx-5"
      >
        <div class="flex items-center justify-end w-full">
          <a
            v-if="pagination.currentPage > 1"
            class="cursor-pointer"
            @click="onPreviousPage"
          >
            <SvgIcon name="arrow-in-square-left" />
          </a>
          <p class="px-4">
            Page {{ pagination.currentPage }} / {{ pagination.totalPage }}
          </p>
          <a
            v-if="pagination.currentPage != pagination.totalPage"
            class="cursor-pointer"
            @click="onNextPage"
          >
            <SvgIcon name="arrow-in-square-right" />
          </a>
        </div>
      </div>
    </div>
    <Teleport
      v-if="usePortal"
      to="body"
    >
      <FilterList
        :upsert-view="upsertView"
        :current-view="activeView"
        :filters="filters"
        :on-close="toggleFilter"
      />
    </Teleport>
    <Teleport
      v-if="useNotePortal"
      to="body"
    >
      <NoteModal
        :modal="modal"
        :on-close="onCloseNoteModal"
      />
    </Teleport>
  </div>
</template>

<script lang="ts">
import InitialsName from "@/components/global/initials-name.vue";
import CmgGridEvent from "@/components/layout-components/cmg-grid-event/cmg-grid-event.vue";
import FilterList from "@/components/layout-components/Filter/filter-list.vue";
import TabList from "@/components/layout-components/Tab/tab-list.vue";
import NoteModal from "@/components/pages/event/notes/modal.vue";
import { useAdminStore } from "@/stores/admin";
import { useEventStore } from "@/stores/event";
import { useHousingStore } from "@/stores/housing";
import { isEmpty } from "lodash";
import { mapActions } from "pinia";
import { EVENT_COLUMNS, EVENT_FILTERS } from "../../../../constants";
import { IEvents, IViews } from "../../../stores/event";
import SvgIcon from "../../atoms/SvgIcon/index.vue";

interface IModal {
  addResa: boolean;
  addUnav: boolean;
  note: undefined;
  tags: undefined;
}

export default {
  components: {
    SvgIcon,
    TabList,
    FilterList,
    CmgGridEvent,
    NoteModal,
    InitialsName,
  },
  setup() {
    const eventStore = useEventStore();
    const adminStore = useAdminStore();
    const housingStore = useHousingStore();
    return {
      eventStore,
      adminStore,
      housingStore,
    };
  },
  data() {
    return {
      fetch: {
        reservations: false,
        maintenances: false,
        views: false,
        tags: false,
        ciTypes: false,
        admins: false,
        housings: false,
        accountManagers: false,
      },
      loading: true,
      activeId: 0,
      usePortal: false,
      useNotePortal: false,
      filters: EVENT_FILTERS,
      columns: EVENT_COLUMNS,
      modal: {
        addResa: false,
        addUnav: false,
        note: 0,
        tags: 0,
      },
    };
  },
  computed: {
    housings() {
      return this.housingStore.datas.housings || [];
    },
    accountManagers() {
      return this.adminStore.datas.accountManagers || [];
    },
    admins() {
      return this.adminStore.datas.admins || [];
    },
    pagination() {
      return this.eventStore.getPagination;
    },
    views(): IViews[] {
      return this.eventStore.getViews;
    },
    activeView() {
      if (!this.views) return;
      return this.views.find(({ id }) => id === this.activeId);
    },
    filtersLength() {
      if (!this.activeView) return;
      // eslint-disable-next-line unicorn/explicit-length-check
      return Object.keys(this.activeView.filters).length || "";
    },
    items(): IEvents | null{
      const currentPagination = this.pagination;
      if (!currentPagination?.currentPage) return null;
      const results = this.eventStore.getPage;
      return results[this.activeId]?.[currentPagination.currentPage];
    },
    actionBtnCol() {
      return {
        hasAction: true,
        actionBtnOptions: [
          {
            actionBtnValue: "Partager les accès",
            actionBtnFunc: this.sendAccess,
          },
        ],
      };
    },
    getOrder() {
      const currentSort = this.activeView?.filters?.sort;
      if (!currentSort) return null;
      return {
        orderByColumn: currentSort.key,
        orderBy: currentSort.direction,
      };
    },
  },
  // async created() {
  //   try {
  //     if (this.eventStore.datas.reservations) {
  //       this.fetch.reservations = true;
  //       this.fetch.maintenances = true;
  //       this.fetch.tags = true;
  //       this.fetch.ciTypes = true;
  //       this.fetch.admins = true;
  //       this.fetch.accountManagers = true;
  //       this.fetch.housings = true;
  //     } else {
  //       await Promise.all([
  //         this.fetchViews(),
  //         this.fetchHousings(),
  //         this.fetchTags(),
  //         this.fetchCiTypes(),
  //         this.fetchAdmins(),
  //         this.fetchAccountManager(),
  //       ]);
  //       this.addOptionsToFilters();
  //       this.fetchItems();
  //     }
  //   } catch (error) {
  //     this.handleError(error);
  //   }
  // },
  methods: {
    toggleFilter() {
      return (this.usePortal = !this.usePortal);
    },
    newView() {
      this.activeId = 0;
      return this.toggleFilter();
    },
    onTabClick(id: number) {
      this.activeId = id;
      this.eventStore.resetEvents;
      this.fetchItems();
    },
    onRefresh() {
      this.eventStore.resetEvents;
      this.fetchItems();
    },
    newEvent() {
      console.log("new event");
    },
    onDragEnd(event: any) {
      // this.$axios.post(
      //   `${process.env.apiUrl}/v2/view/${this.activeId}/change-order`,
      //   { from: event.oldIndex, to: event.newIndex },
      //   this.getDefaultHeader()
      // )
      console.log(event);
    },
    actionButtonCol() {
      return {
        hasAction: true,
        actionBtnOptions: [
          {
            actionBtnValue: "Partager les accès",
            actionBtnFunc: this.sendAccess,
          },
        ],
      };
    },
    setSort(key: number) {
      const currentSort = this.activeView?.filters.sort
      if (!currentSort || currentSort.key !== key)
        return this.upsertView({ ...this.activeView?.filters, sort: { key, direction: "ASC" } }, this.activeView?.name);
      if (currentSort.direction === "ASC")
        return this.upsertView({ ...this.activeView?.filters, sort: { key, direction: "DESC" } }, this.activeView?.name);
      return this.upsertView({ ...this.activeView?.filters, sort: null }, this.activeView?.name);
    },
    async onNextPage() {
      if (this.loading) return;
      await this.fetchItems();
    },
    onPreviousPage() {
      this.eventStore.previousPage;
    },
    handleError(error: string) {
      const type = JSON.parse(JSON.stringify(error)).message;
      if (type?.includes("401")) return this.$router.push("/login");
      console.log("unhandled err:", error);
    },
    // getDefaultHeader() {
    //   return { headers: { Authorization: `Bearer ${this.$cookies.get("token")}` } }
    // },
    injectStore(action: string, key: string, data: JSON) {
      // this.$store.commit(action, { key: key, datas: data });
      mapActions(action, {key: key, datas: data});
    },
    async fetchItems() {
      if (isEmpty(this.activeView?.filters)) {
        return (this.loading = false);
      }
      this.loading = true;
      this.activeView.filters["eventType"] === "reservations"
        ? await this.fetchReservations()
        : await this.fetchUnavailabilities();
      this.loading = false;
    },
    async deleteView() {
      // await this.$axios.delete(
      //   `${process.env.apiUrl}/v2/view/${this.activeId}`,
      //   this.getDefaultHeader()
      // );
      console.log("Delete View");
      // this.eventStore.deleteView(this.activeId);
      // this.$store.dispatch("commun/displayNotification", {
      //   alert: "success",
      //   msg: `La vue a bien été supprimée`,
      // });
      // this.activeId = null;
    },
    async upsertView(filters: JSON | null, name: string) {
      const view = this.activeId
        ? await this.updateView(filters, name)
        : await this.createView(filters);
      this.$store.dispatch("commun/displayNotification", {
        alert: "success",
        msg: `La vue a bien été ${this.activeId ? "modifiée" : "créée"}`,
      });
      this.eventStore.resetEvents;
      this.activeId = view.id;
      this.usePortal = false;
      this.fetchItems();
    },
    getDefaultHeader() {
      return { headers: { Authorization: `Bearer ${this.$cookies.get("token")}` } }
    },
    async createView(filters: JSON | null) {
      // const response = await this.$axios.post(
      //   `${process.env.apiUrl}/v2/view`,
      //   { name: "Nouvelle vue", filters, position: this.views.length + 1 },
      //   this.getDefaultHeader()
      // );
      // this.eventStore.addView(response.data);

      // return response.data;
      console.log("Create View");
    },
    async updateView(filters: JSON | null, name: string) {
      // const response = await this.$axios.put(
      //   `${process.env.apiUrl}/v2/view/${this.activeId}`,
      //   {
      //     ...this.activeView,
      //     ...(filters && { filters }),
      //     ...(name && { name }),
      //   },
      //   this.getDefaultHeader()
      // );
      // this.eventStore.updateView(response.data);
      // return response.data;
      console.log("Update View");
    },
    async fetchHousings() {
      // const response = await this.$axios.get(
      //   `${process.env.apiUrl}/v1/housing?columns=housing_id;housing_name;nuki_smartlock_id;nuki_token&active=1`,
      //   this.getDefaultHeader()
      // );
      // this.injectStore("housing/injectDatas", "housings", response.data);
      console.log('fetchHousings');
      this.fetch.housings = true;
    },
    async fetchTags() {
      // const response = await this.$axios.get(
      //   `${process.env.apiUrl}/v1/tag?active=1`,
      //   this.getDefaultHeader()
      // );
      // this.injectStore("event/injectDatas", "tags", response.data);
      // this.fetch.tags = response.data;
      console.log("Fetch tags");
    },
    async fetchCiTypes() {
      // const response = await this.$axios.get(
      //   `${process.env.apiUrl}/v1/ci_type`,
      //   this.getDefaultHeader()
      // );
      // this.injectStore("event/injectDatas", "ciTypes", response.data);
      // this.fetch.ciTypes = response.data;
      console.log("Fetch CiTypes");
    },
    async fetchAdmins() {
      // const response = await this.$axios.get(
      //   `${process.env.apiUrl}/v1/admin?active=1`,
      //   this.getDefaultHeader()
      // );
      // this.injectStore("admin/injectDatas", "admins", response.data);
      console.log("Fetch Admins");
      this.fetch.admins = true;
    },
    async fetchAccountManager() {
      // const response = await this.$axios.get(
      //   `${process.env.apiUrl}/v1/housing_account_manager/list`,
      //   this.getDefaultHeader()
      // );
      // this.injectStore("admin/injectDatas", "account_managers", response.data);
      // this.fetch.accountManagers = true;
      console.log("Fetch account manager");
    },
    async fetchViews() {
      // const response = await this.$axios.get(
      //   `${process.env.apiUrl}/v2/view`,
      //   this.getDefaultHeader()
      // );
      // this.eventStore.setView(response.data);
      // this.activeId = response.data[0] ? response.data[0].id : null;
      // this.$set(this.fetch, "views", true);
      console.log("Fetch views");
    },
    async fetchReservations() {
      // try {
      //   const url = `${process.env.apiUrl}/v2/reservations/searches`;
      //   const response = await this.$axios.post(
      //     url,
      //     {
      //       columns: ["HOUSING_RESERVATION.*", "nuki_token"],
      //       has_nuki: 1,
      //       after: this.pagination?.cursor,
      //       ...this.activeView?.filters,
      //       ...this.getOrder,
      //     },
      //     this.getDefaultHeader()
      //   );
      //   this.$store.commit("event/injectPage", {
      //     data: response.data.edges.map((reservation) =>
      //       formatReservation(reservation, {
      //         admins: this.admins,
      //         accountManagers: this.accountManagers,
      //       })
      //     ),
      //     viewId: this.activeId,
      //     pagination: {
      //       cursor: response.data.cursor,
      //       ...response.data.pageInfos,
      //       currentPage: (this.pagination?.currentPage || 0) + 1,
      //     },
      //   });
      // } catch (error) {
      //   this.handleError(error);
      // }
      console.log("Fetch reservations")
    },
    async fetchUnavailabilities() {
      // try {
      //   const response = await this.$axios.post(
      //     `${process.env.apiUrl}/v2/maintenances/searches`,
      //     {
      //       after: this.pagination?.cursor,
      //       ...this.activeView?.filters,
      //       ...this.getOrder,
      //     },
      //     this.getDefaultHeader()
      //   );
      //   this.$store.commit("event/injectPage", {
      //     data: response.data.edges.map((maintenance) =>
      //       formatMaintenance(maintenance, {
      //         admins: this.admins,
      //         accountManagers: this.accountManagers,
      //       })
      //     ),
      //     viewId: this.activeId,
      //     pagination: {
      //       cursor: response.data.cursor,
      //       ...response.data.pageInfos,
      //       currentPage: (this.pagination?.currentPage || 0) + 1,
      //     },
      //   });
      // } catch (error) {
      //   this.handleError(error);
      // }
      console.log("Fetch unavailabilities");
    },
    async sendAccess(row: IEvents) {
      // try {
      //   await this.$axios.get(
      //     `${process.env.apiUrl}/v1/reservation/${row.id}/send-access-email`,
      //     { type: "access" },
      //     this.getDefaultHeader()
      //   );
      //   this.$store.dispatch("commun/displayNotification", {
      //     alert: "success",
      //     msg: "Le message a bien été envoyé",
      //   });
      // } catch (error: string) {
      //   this.handleError(error);
      // }
      console.log("Send Acccess");
    },
    getConnectionName(serverState: number) {
      switch (serverState) {
        case 0: {
          return "Active";
        }
        case 1: {
          return "Unregistered";
        }
        case 2: {
          return "Auth uuid invalid";
        }
        case 3: {
          return "Auth invalid";
        }
        case 4: {
          return "Inactive";
        }
      }
    },
    batteryCritical(value: string, charge: string) {
      let returnValue;
      if (!charge) charge = "";
      returnValue = value ? "Danger" : "OK";
      if (charge) returnValue = `${charge}%`;
      return returnValue;
    },
    // async fetchInfoSmartlock(housingId: number, id: string) {
    //   const housing = this.housings.find(
    //     (housing) => housing.housingId === housingId
    //   );
    //   const key = this.CryptoJS.enc.Utf8.parse(process.env.encryptionDbCrypt);
    //   const iv = this.CryptoJS.enc.Utf8.parse(process.env.encryptionDbIv);
    //   const decrypting = this.CryptoJS.AES.decrypt(housing.nuki_token, key, {
    //     iv,
    //     padding: this.CryptoJS.pad.ZeroPadding,
    //     mode: this.CryptoJS.mode.CTR,
    //   });

    //   const decrypted = decrypting.toString(this.CryptoJS.enc.Utf8);
    //   try {
    //     const response = await this.$axios.get(
    //       `${process.env.nukiEndpoint}/smartlock/${housing.nuki_smartlock_id}`,
    //       { headers: { Authorization: `Bearer ${decrypted}` } }
    //     );
    //     if (!response)
    //       return (document.getElementById(`nuki-${id}`).innerHTML =
    //         "<p>Infos indisponibles</p>");
    //     this.openStateNuki = true;
    //     const status = this.getConnectionName(
    //       response.data.serverState,
    //       housingId
    //     );
    //     const battery = this.batteryCritical(
    //       response.data.state.batteryCritical,
    //       response.data.state.batteryCharge,
    //       housingId
    //     );
    //     const bat = battery === "Danger" ? "Danger" : "Chargée à";
    //     const bgStat = status === "Inactive" ? "nuki-pb" : "nuki-ok";
    //     const bgBat = battery === "Danger" ? "nuki-pb" : "nuki-ok";

    //     const nuki = document.querySelector(`nuki-${id}`);
    //     nuki?.innerHTML = `
    //           <div class="cmg-btn tertiary-btn h-5 mr-auto ${bgStat}">
    //             <p class="mr-1 whitespace-nowrap">${status}</p>
    //           </div>
    //           <div class="cmg-btn tertiary-btn h-5 ${bgBat}">
    //             <p class="ml-1">${bat}</p>
    //             <p class="mx-1">${battery}</p>
    //           </div>
    //         `;
    //     nuki.classList.remove("cmg-btn");
    //     nuki.classList.remove("tertiary-btn");
    //   } catch (error) {
    //     this.handleError(error);
    //   }
    // },
    onNoteClick(row: IEvents) {
      if (!row.notes) {
        return this.$router.push(
          `/event/focus?${row.code.slice(0, 2) === "UN" ? "unid" : "rid"}=${
            row.id
          }&hid=${row.housingId}&overlay=notes`
        );
      }
      this.modal.note = row.notes;
      this.useNotePortal = true;
    },
    // onCloseNoteModal() {
    //   this.modal.note = null;
    //   this.useNotePortal = false;
    // },
    // addOptionsToFilters() {
    //   const housings = this.housingStore.datas.housings;
    //   const externalOptions = {
    //     // eslint-disable-next-line unicorn/no-array-reduce
    //     account_manager_id: this.adminStore.datas.admins.reduce(
    //       (result, admin) => {
    //         if (!admin.is_account_manager) return result;
    //         return [
    //           ...result,
    //           {
    //             value: admin.admin_id,
    //             label: `${admin.firstname} ${admin.lastname}`,
    //           },
    //         ];
    //       },
    //       []
    //     ),
    //     checkin_type: this.fetch.ciTypes.map((ciType) => ({
    //       value: ciType.ci_type_id,
    //       label: ciType.ci_type_name,
    //     })),
    //     hid: housings.map(({ housing_id, housing_name }) => ({
    //       value: housing_id,
    //       label: housing_name,
    //     })),
    //     building_name: map(
    //       groupBy(
    //         housings,
    //         (housing) =>
    //           housing.housing_name
    //             .slice(0, Math.max(0, housing.housing_name.indexOf("-")))
    //             .trim() || "AUTRE"
    //       ),
    //       (value, key) => ({
    //         label: `Tous les ${key}`,
    //         value: map(value, "housing_id"),
    //       })
    //     ),
    //     tags: this.fetch.tags.map(({ tag_id, name }) => ({
    //       value: tag_id,
    //       label: name,
    //     })),
    //   };
    //   this.filters = this.filters.reduce((result, filter) => {
    //     if (filter.external) {
    //       filter.options = externalOptions[filter.key];
    //     }
    //     return [...result, filter];
    //   }, []);
    // },
    // async updateTags(row, tag) {
    //   const existingTag = find(row.tags, { tag_id: tag.tag_id });
    //   if (existingTag) {
    //     await this.$axios.delete(
    //       `${process.env.apiUrl}/v1/reservation/${row.id}/tag/${tag.tag_id}`,
    //       this.getDefaultHeader()
    //     );
    //     row.tags = row.tags.filter();
    //   } else {
    //     await this.$axios.post(
    //       `${process.env.apiUrl}/v1/reservation/${row.id}/tag`,
    //       { tag_id: tag.tag_id },
    //       this.getDefaultHeader()
    //     );
    //   }
    // },
  },
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
