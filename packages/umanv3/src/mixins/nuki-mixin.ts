import axios from "axios";
import * as CryptoJS from "vue-cryptojs";
import { default as commonMixin, default as CommonMixin } from "./common-mixin";

export default {
  mixins: [CommonMixin],
  methods: {
    getConnectionName(serverState: number) {
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
    batteryCritical(value: string, charge: string) {
      let returnValue
      if (!charge) charge = ""
      returnValue = value ? "Danger" : "OK";
      if (charge) returnValue = `${charge}%`
      return returnValue
    },
    async fetchInfoSmartlock(housingId: number, eventId: number) {
      const housing = this.$store.state.housing.datas.housings.find(
        (housing) => housing.housing_id === housingId
      )
      const key = CryptoJS.enc.Utf8.parse(process.env.encryptionDbCrypt)
      const iv = CryptoJS.enc.Utf8.parse(process.env.encryptionDbIv)
      const decrypting = CryptoJS.AES.decrypt(housing.nuki_token, key, {
        iv,
        padding: CryptoJS.pad.ZeroPadding,
        mode: CryptoJS.mode.CTR,
      })

      const decrypted = decrypting.toString(CryptoJS.enc.Utf8)
      try {
        const response = await axios
          .get(
            `${process.env.nukiEndpoint}/smartlock/${housing.nuki_smartlock_id}`,
            { headers: { Authorization: `Bearer ${decrypted}` } }
          )
        if (!response)
          return (document.querySelector(`nuki-${eventId}`)!.innerHTML =
            "<p>Infos indisponibles</p>")
        const status = this.getConnectionName(response.data.serverState)
        const battery = this.batteryCritical(
          response.data.state.batteryCritical,
          response.data.state.batteryCharge)
        return { status, battery }
      } catch (error) {
        commonMixin.methods.handleError(error);
      }
    },
  },
}
