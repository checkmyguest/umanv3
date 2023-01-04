<template>
  <div class="content-reservation notes h-96">
    <div
      class="notes-wrapper h-full"
      style="padding-top: 24px;"
    >
      <div class="content-reservation-header pb-4 mb-4 border-b border-gray-200">
        <h3>Notes</h3>
      </div>
      <div class="content flex flex-col justify-between h-full">
        <div v-if="!fetch.logs || !fetch.admins">
          <div class="skeleton_vertical_center">
            <div class="skeleton skeleton_step skeleton_step_option mr-5" />
            <div class="flex w-full	flex-col	">
              <div class="skeleton skeleton_title skeleton_title_20 m-0" />
              <div class="skeleton skeleton_text skeleton_text_50 mb-0" />
            </div>
          </div>
        </div>
        <div
          v-else
          class="add-note flex h-1/3"
        >
          <span
            v-if="$cookies.get('admin')"
            class="bg-blue-100 img-note flex justify-center items-center h-8 rounded-sm mr-4 uppercase"
            style="padding: 0 7px;"
          >
            {{ $cookies.get('admin').firstname[0] }}{{ $cookies.get('admin').lastname[0] }}
          </span>
          <div class="flex flex-col items-end w-full">
            <div
              v-if="notes"
              class="flex self-start mb-1"
            >
              <p class="font-extrabold mr-4">
                {{ getAdminName(notes.entity_id, 'full') }}
              </p>
              <span class="content-small text-grey-100">{{ notes.ts_update | dateFormat }}</span>
            </div>
            <div class="flex w-full">
              <textarea
                id="addNote"
                v-model="note"
                name="add-note"
                class="w-full border rounded p-2.5 resize-none hover:border-blue-600 focus:border-blue-600 focus:outline-none"
                cols="30"
                rows="3"
                placeholder="Ajouter une note"
              />
            </div>
            <button
              :class="[{ disabled: hasNoteChanged }, 'cmg-btn primary-btn mt-2']"
              @click="saveNote"
            >
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import fr from 'date-fns/locale/fr';
import { dateFilter } from "vue-date-fns";

export default {
  filters: {
    dateFormat(date) {
      if(!date) return ''
      return dateFilter(new Date(date), 'dd MMMM yyyy à H:mm', { locale: fr })
    },
  },
  props: ['reservation'],
  data() {
    return {
      fetch: {
        logs: false,
        admins: false,
      },
      note: null,
      notes: [],
      eventId: this.$route.query.rid ? this.$route.query.rid : this.$route.query.unid,
    }
  },
  computed: {
    logs() {
      return this.$store.state.event.datas.logs;
    },
    admins() {
      return this.$store.state.admin.datas.admins;
    },
    hasNoteChanged() {
      if(this.reservation.notes === null && this.note === '') return true
      return this.reservation.notes === this.note
    }
  },
  async beforeMount() {
    await this.fetchLogs();
    if (this.$store.state.admin.datas.admins) this.fetch.admins = true;
    else this.fetchAdmins();
    this.note = this.reservation.notes
  },
  methods: {
    fetchLogs() {
      return this.$axios
        .get(`${process.env.apiUrl}/v1/housing/${this.reservation.housing_id}/${this.$route.query.rid ? 'reservation' : 'maintenance'}/${this.eventId}/logs`, {
          headers: {
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        })
        .then(res => {
          this.$store.commit('event/injectDatas', { key: 'logs', datas: res.data });
          this.fetch.logs = true;
          this.notes = this.$store.state.event.datas.logs?.filter(log => log.log?.startsWith('note')) ? this.$store.state.event.datas.logs.find(log => log.log?.startsWith('note')) : false;
        })
        .catch(error => {
          console.log(error.response);
          const type = JSON.parse(JSON.stringify(error)).message
          if (type?.includes('401')) {
            this.$router.push('/login');
          }
        })
    },
    fetchAdmins() {
      this.$axios
        .get(`${process.env.apiUrl}/v1/admin?active=1`, {
          headers: {
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        })
        .then(res => {
          this.$store.commit('admin/injectDatas', { key: 'admins', datas: res.data });
          this.fetch.admins = true;
        })
        .catch(error => {
          console.log(error.response);
          const type = JSON.parse(JSON.stringify(error)).message
          if (type?.includes('401')) {
            this.$router.push('/login');
          }
        })
    },
    getAdminName(id, type) {
      if (type === 'full' && this.admins.some(admin => admin.admin_id === id)) {
        return `${this.admins.find(admin => admin.admin_id === id).firstname} ${this.admins.find(admin => admin.admin_id === id).lastname}`
      } else if (type === 'short' && this.admins.some(admin => admin.admin_id === id)) {
        return `${this.admins.find(admin => admin.admin_id === id).firstname[0]}${this.admins.find(admin => admin.admin_id === id).lastname[0]}`
      } else {
        return ''
      }
    },
    saveNote() {
      this.editNote = false
      this.$axios
        .put(`${process.env.apiUrl}/v1/housing/${this.reservation.housing_id}/${this.$route.query.rid ? 'reservation' : 'maintenance'}/${this.reservation.id}`,
        { notes: this.note, log_type: 'communication' },
        { headers: { Authorization: `Bearer ${this.$cookies.get('token')}`}
      }).then(() => {
        this.$store.commit('event/setNotes', [{ rid: this.reservation.id, note: this.note }])
        this.reservation.notes = this.note
        this.fetchLogs()
      })
    },
  },
}
</script>
