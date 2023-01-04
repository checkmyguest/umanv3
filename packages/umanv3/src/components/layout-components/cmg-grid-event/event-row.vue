<template>
  <tbody class="overflow-auto">
    <tr
      v-for="(row, i) in items"
      :key="i"
      :class="{ selected: selectedIds!.includes(row.id) }"
      @mouseleave="actionBtnCol && hideActionsBtn"
      @mouseenter="actionBtnCol && showActionsBtn(i)"
    >
      <td
        v-if="checkbox"
        class="checkbox sticky-col"
      >
        <MoreActions
          v-show="actionBtnCol && showAction(i)"
          :action-btn-col="actionBtnCol"
          :row="row"
          :index="i"
          :grid-type="gridType"
          :confirm="actionBtnConfirm"
        />
        <label class="cmg-checkbox-container">
          <input
            :data-id="row.id"
            type="checkbox"
            :checked="selectedIds!.includes(row.id)"
            @onClick="selectRow(row.id)"
          >
          <span class="cmg-checkbox-checkmark" />
        </label>
      </td>
      <td
        class="justify-between sticky-col"
        :style="setWidthColumn!('200px')"
      >
        <router-view
          :to="getEventUrl(row, 'notes')"
          class="secondary max-w-xl whitespace-nowrap overflow-hidden cursor-pointer hover:underline flex items-center relative z-10"
          :title="row.code"
        >
          <span>{{ row.code }}</span>
        </router-view>
        <p
          class="whitespace-nowrap pl-1.5"
          :class="row.notes ? 'secondary' : 'brd2'"
        >
          |
          <span
            class="underline cursor-pointer"
            @click="onNoteClick(row)"
          >
            {{ row.notes ? 1 : 0 }} note
          </span>
        </p>
      </td>
      <td :style="setWidthColumn!('220px')">
        <PlatformItem
          v-if="row.origin"
          :platform="row.origin"
          :size="6"
        />
      </td>
      <td
        class="cell"
        :style="setWidthColumn!('200px')"
      >
        <InitialsName
          v-if="row.guest_name"
          :size="6"
          :fullname="row.guest_name"
        />
      </td>
      <td
        class="cell"
        :style="setWidthColumn!('200px')"
      >
        <span
          v-if="row.phone?.length > 5"
          class="cursor-pointer secondary hover:underline"
          @click="openWhatsapp(row.phone)"
        >
          {{ row.phone }}
        </span>
      </td>
      <td :style="setWidthColumn!('90px')">
        <ColoredStatus
          v-if="!row.reason"
          :status="row.state"
          :is-text-inside="true"
        />
      </td>
      <td :style="setWidthColumn!('90px')">
        <ColoredStatus
          :status="row.status"
          :is-text-inside="true"
        />
      </td>
      <td
        class="justify-between"
        :style="setWidthColumn!('220px')"
      >
        <nuxt-link
          class="secondary max-w-xl whitespace-nowrap overflow-hidden hover:underline"
          :title="row.housing_name"
          :to="`/housing/focus?hid=${row.housing_id}`"
        >
          {{ row.housing_name }}
        </nuxt-link>
        <p class="subtitle">
          {{ row.housing_id }}
        </p>
      </td>
      <td
        class="justify-between"
        :style="setWidthColumn!('200px')"
      >
        <PlatformItem :platform="row.reason" />
      </td>
      <td
        :style="setWidthColumn!('250px')"
        :title="row.tagsName"
        class="p-0 items-start"
      >
        <div
          :id="`cmg-multiselect-${row.id}`"
          class="cmg-multiselect add-tags"
        >
          <div
            :id="`multi-open-${row.id}`"
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
              v-for="(tag, i) in $store.state.event.datas.tags"
              :id="`multi-select-${row.id}-${i}`"
              :key="`tags-${i}`"
              :value="tag.tag_id"
              :class="{
                selected: row.tagsName.includes(tag.name),
              }"
              @click="
                $multiSelect(`#multi-select-${row.id}-${i}`),
                updateTags(row, tag)
              "
            >
              <p>{{ tag.name }}</p>
            </li>
          </ul>
          <a
            :id="`multi-open-${row.id}`"
            class="add-btn"
            @click="$multiOpenOld(`#multi-open-${row.id}`)"
          />
        </div>
      </td>
      <td :style="setWidthColumn!('180px')">
        <p>
          {{ $dateFns.format(new Date(row.ts_create), "dd.MM.yyyy HH:mm") }}
        </p>
      </td>
      <td :style="setWidthColumn!('135px')">
        <p>{{ $dateFns.format(new Date(row.dateStart), "dd.MM.yyyy") }}</p>
      </td>
      <td :style="setWidthColumn!('135px')">
        <p>{{ $dateFns.format(new Date(row.dateEnd), "dd.MM.yyyy") }}</p>
      </td>
      <td :style="setWidthColumn!('120px')">
        <ColoredStatus
          v-if="row.caution"
          :status="row.caution"
          :is-text-inside="true"
        />
      </td>
      <td
        class="cell"
        :style="setWidthColumn!('200px')"
      >
        <p>{{ row.accessType }}</p>
      </td>
      <td
        :style="setWidthColumn!('250px')"
        class="justify-center"
      >
        <div
          v-if="
            row.nuki_token && row.ciType.ci_type_id === 'serrure_electronique'
          "
          :id="`nuki-${row.id}`"
          :key="row.id"
          class="flex justify-around cmg-btn tertiary-btn h-5 w-full"
          @click="displayNukiInfo(row.housing_id, row.id)"
        >
          Voir l'état de la Nuki
        </div>
      </td>
      <td
        class="cell"
        :style="setWidthColumn!('200px')"
      >
        <InitialsName
          v-for="(accountManager, i) in row.accountManagers"
          :key="i"
          :size="6"
          :fullname="accountManager"
          :show-text="false"
        />
      </td>
      <td
        class="cell justify-end"
        :style="setWidthColumn!('100px')"
      >
        <p>{{ $formatNbr(row.final_price) }}</p>
      </td>
    </tr>
  </tbody>
</template>

<script lang="ts">
import { PropType } from "vue";
import NukiMixin from "../../../mixins/nuki-mixin";
import { IEvents } from "../../../stores/event";
import InitialsName from "../../global/initials-name.vue";
import MoreActions from "./more-actions.vue";

interface ISmartLock {
  status: string | undefined;
  battery: string;
}

export default {
  components: {
    MoreActions,
    InitialsName,
  },
  mixins: [NukiMixin],
  props: {
    items: {
      type: Object as PropType<IEvents[]>,
      require: true,
    },
    selectedIds: {
      type: Array,
      require: true,
    },
    checkbox: {
      type: Boolean,
      require: false,
    },
    actionBtnCol: {
      type: Object,
      require: false,
    },
    gridType: {
      type: String,
      require: true,
    },
    updateTags: {
      type: Function,
      require: false,
    },
    setWidthColumn: {
      type: Function,
      require: true,
    },
    eventType: {
      type: String,
      require: true,
    },
    selectRow: {
      type: Function,
      require: true,
    },
    onNoteClick: {
      type: Function,
      require: true,
    },
  },
  data() {
    return {
      activeActionsBtn: {
        index: 0,
        locked: false,
      },
      actionBtnConfirm: { state: false },
    };
  },
  computed: {
    showAction() {
      return (index: number) =>
        this.gridType === "page" &&
        this.actionBtnCol &&
        this.actionBtnCol.hasAction &&
        this.activeActionsBtn.index === index;
    },
  },
  methods: {
    showActionsBtn(index: number) {
      if (!this.activeActionsBtn.locked) this.activeActionsBtn.index = index;
    },
    hideActionsBtn() {
      if (!this.activeActionsBtn.locked) {
        this.activeActionsBtn.index = 0;
        this.$closeDropdown();
      }
    },
    openWhatsapp(phone: string) {
      if (phone.length <= 5) return null;
      if (phone && phone.startsWith("+")) {
        window.open(`https://wa.me/${phone}`, "_blank")!.focus();
      } else {
        this.copyToClipboard(phone);
      }
    },
    getEventUrl(row: IEvents, overlay: string) {
      const type = this.eventType === "reservations" ? "rid" : "unid";
      const baseUrl = "/event/focus";
      return `${baseUrl}?${type}=${row.id}${
        overlay ? `&overlay=${overlay}` : ""
      }`;
    },
    async displayNukiInfo(housingId: number, eventId: number) {
      const nukiInfos: string | ISmartLock | undefined =
        await this.fetchInfoSmartlock(housingId, eventId);
      if (typeof nukiInfos !== "undefined" && typeof nukiInfos !== "string") {
        const bat = nukiInfos.battery === "Danger" ? "Danger" : "Chargée à";
        const bgStat = nukiInfos.status === "Inactive" ? "nuki-pb" : "nuki-ok";
        const bgBat = nukiInfos.battery === "Danger" ? "nuki-pb" : "nuki-ok";
        const nuki = document.querySelector(`nuki-${eventId}`);
        nuki!.innerHTML = `
              <div class="cmg-btn tertiary-btn h-5 mr-auto ${bgStat}">
                <p class="mr-1 whitespace-nowrap">${nukiInfos.status}</p>
              </div>
              <div class="cmg-btn tertiary-btn h-5 ${bgBat}">
                <p class="ml-1">${bat}</p>
                <p class="mx-1">${nukiInfos!.battery}</p>
              </div>
            `;
        nuki!.classList.remove("cmg-btn");
        nuki!.classList.remove("tertiary-btn");
      }
    },
  },
};
</script>
