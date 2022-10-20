<template>
  <span
    v-if="platform"
    :class="showText ? 'flex items-center' : 'inline-block'"
    class="nostyle"
  >
    <component
      :is="iconComponent"
      :class="`w-${size} h-${size}`"
      class="filter mr-2 rounded-sm translate-y-1 nostyle"
    />
    <span
      v-if="showText"
      class="capitalize nostyle"
    >
      {{ platformText }}
    </span>
  </span>
</template>

<script>
import IconLoupe from "@/assets/img/loupe.svg?inline"
import IconAbritel from "@/assets/img/platforms/abritel.svg?inline"
import IconAirbnb from "@/assets/img/platforms/airbnb.svg?inline"
import IconBooking from "@/assets/img/platforms/booking.svg?inline"
import IconCMG from "@/assets/img/platforms/checkmyguest.svg?inline"
import IconExpedia from "@/assets/img/platforms/expedia.svg?inline"
import IconFigaroImmo from "@/assets/img/platforms/figaroimmo.svg?inline"
import IconHomeaway from "@/assets/img/platforms/homeaway.svg?inline"
import IconHomelike from "@/assets/img/platforms/homelike.svg?inline"
import IconHousingAnywhere from "@/assets/img/platforms/housinganywhere.svg?inline"
import IconMarriott from "@/assets/img/platforms/marriott.svg?inline"
import IconMorningCroissant from "@/assets/img/platforms/morning-croissant.svg?inline"
import IconPlumguide from "@/assets/img/platforms/plumguide.svg?inline"
import IconSeloger from "@/assets/img/platforms/seloger.svg?inline"
import IconSpotAHome from "@/assets/img/platforms/spotahome.svg?inline"
import IconStudapart from "@/assets/img/platforms/studapart.svg?inline"
import IconTravelCMG from "@/assets/img/platforms/travel.svg?inline"
import IconUnavCmg from "@/assets/img/platforms/unavailability_checkmyguest.svg?inline"
import IconUnavCleaning from "@/assets/img/platforms/unavailability_cleaning.svg?inline"
import IconUnavMaintenance from "@/assets/img/platforms/unavailability_maintenance.svg?inline"
import IconUnavOwner from "@/assets/img/platforms/unavailability_owner.svg?inline"
import IconVeepee from "@/assets/img/platforms/veepee.svg?inline"
import IconWorkCMG from "@/assets/img/platforms/work.svg?inline"

export default {
  components: {
    IconAirbnb,
    IconBooking,
    IconCMG,
    IconExpedia,
    IconPlumguide,
    IconHomeaway,
    IconHomelike,
    IconMarriott,
    IconMorningCroissant,
    IconStudapart,
    IconTravelCMG,
    IconWorkCMG,
    IconVeepee,
    IconSeloger,
    IconSpotAHome,
    IconHousingAnywhere,
    IconFigaroImmo,
    IconAbritel,
    IconUnavCmg,
    IconUnavMaintenance,
    IconUnavCleaning,
    IconUnavOwner,
    IconLoupe,
  },
  props: {
    platform: String,
    showText: {
      type: Boolean,
      default: true,
    },
    size: {
      type: Number,
      required: false,
      default: 5,
    },
  },
  computed: {
    platformText() {
      let text = this.platform
      if (text.includes(";")) {
        text = text.split(";")[0]
      }
      text = this.$options.filters.trans(text)
      const dict = {
        "work.checkmyguest.fr": "Work",
        "travel.checkmyguest.fr": "Travel",
        "Booking.com": "Booking",
        "veepee.smily.com": "Veepee",
        "Abritel.fr": "Abritel",
        direct: "Checkmyguest",
        "AirBnB V2": "Airbnb",
      }
      return dict[text] ?? text
    },
    iconComponent() {
      const dict = {
        Checkmyguest: "CMG",
        Airbnb: "Airbnb",
        "AirBnB v2": "Airbnb",
        "Booking.com": "Booking",
        bookingsync: "Booking",
        direct: "CMG",
        Expedia: "Expedia",
        "The Plum Guide": "Plum Guide",
        Homeaway: "Homeaway",
        HomeAway: "Homeaway",
        // eslint-disable-next-line no-dupe-keys
        "The Plum Guide": "Plum Guide",
        homelike: "Homelike",
        Homelike: "Homelike",
        Marriott: "Marriott",
        "Marriott;HVMI": "Marriott",
        HVMI: "Marriott",
        "Morning Croissant": "MorningCroissant",
        Studapart: "Studapart",
        "travel.checkmyguest.fr": "TravelCMG",
        Travel: "TravelCMG",
        "work.checkmyguest.fr": "WorkCMG",
        Work: "WorkCMG",
        "veepee.smily.com": "Veepee",
        Seloger: "Seloger",
        SpotAHome: "SpotAHome",
        "Housing Anywhere": "HousingAnywhere",
        "Figaro Immo": "FigaroImmo",
        "Abritel.fr": "Abritel",
        vrbo: "Abritel",
        other: "UnavCmg",
        maintenance: "UnavMaintenance",
        cleaning: "UnavCleaning",
        owner: "UnavOwner",
        Propriétaire: "UnavOwner",
        Maintenance: "UnavMaintenance",
        Ménage: "UnavCleaning",
        Autre: "UnavCmg",
      }

      let icon = dict[this.platform] ?? this.platform

      if (icon.includes(" ") || icon.includes(".")) {
        icon = "CMG"
        console.warn(
          "PlateformItem: platform name contains spaces, using default icon",
          this.platform
        )
      }

      return `Icon${icon}`
    },
  },
}
</script>

<style>
</style>
