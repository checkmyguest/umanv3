<script lang="ts">
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

export default {
    components:{
        VuePhoneNumberInput
    },
    data(){
        return{
            yourValue: ''
        }
    }
};
</script>

<template>
  <div class="input-container">
    <VuePhoneNumberInput v-model="yourValue" />
  </div>
</template>

<style scoped lang="scss"></style>
