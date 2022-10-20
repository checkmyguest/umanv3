<template>
  <td class="justify-between no-padding">
    <input
      :id="`date-picker-${id}`"
      :class="[defaultClass, sizeClass]"
      :placeholder="placeholder"
      :value="value ? $dateFns.format(new Date(value), 'dd.MM.yyyy') : null"
      @focus="pickDate"
    >
  </td>
</template>
  
  <script lang="ts">
  export default {
    props: {
      value: {
        required: true,
      },
      placeholder: {
        type: String,
        required: true,
      },
      onChange: {
        type: Function,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        defaultClass: "cmg-input",
        tempPickerDateValue: undefined,
      }
    },
    computed: {
      id() {
        return Math.random().toString(36).slice(2, 9)
      },
      sizeClass() {
        return `${this.size}-input` || ""
      },
    },
    methods: {
      pickDate() {
        const pickerInput = document.querySelector(`date-picker-${this.id}`)
        // eslint-disable-next-line no-undef, no-unused-vars
        const picker = new Litepicker({
          element: pickerInput,
          format: "DD.MM.YYYY",
          lang: "fr-FR",
          resetButton: true,
          buttonText: {
            reset: "Réinitialiser",
          },
          singleMode: true,
          numberOfcols: 1,
          numberOfMonths: 1,
          tooltipText: {
            one: "nuit",
            other: "nuits",
          },
          autoApply: true,
          minDate: Date.now(),
          setup: (picker) => {
            picker.on("selected", (date) => {
              this.tempPickerDateValue = this.$dateFns.format(
                new Date(date.dateInstance),
                "yyyy-MM-dd"
              )
              this.onChange(this.tempPickerDateValue)
            })
            picker.on("hide", () => {
              const element = document.querySelector(".litepicker")
              element && element.remove()
              if (this.tempPickerDateValue)
                pickerInput.value = this.$dateFns.format(
                  new Date(this.tempPickerDateValue),
                  "dd.MM.yyyy"
                )
            })
          },
        })
      },
    },
  }
  </script>
  
  <style>
  .small-input {
    height: 26px;
  }
  </style>