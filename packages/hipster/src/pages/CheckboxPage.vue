<script setup lang="ts">
import CheckboxVue from '@/components/checkbox/checkbox-vue.vue';
import { ref } from 'vue';

 const model = ref(false);

</script>

<template>
    <div class="playground">
        <div class="checkbox-container">
            <div class="card">
                <label class="titre">Checkbox</label>
                <CheckboxVue :model="model" id="checkbox"/>
                <CheckboxVue :model="model" id="checkbox-req" type='required'/>
            </div>
            <div class="card">
                <CheckboxVue :model="model" id="checkbox2" :minus="true"/>
                <CheckboxVue :model="model" id="checkbox2-req" :minus="true" type="required"/>
            </div>
            <div class="card">
                <CheckboxVue :model="model" id="checkbox3" :disabled="true"/>
                <CheckboxVue :model="true" id="checkbox3-req" :disabled="true" type="required"/>
            </div>
            <div class="card">
                <CheckboxVue :model="model" id="checkbox4" :disabled="true" :minus="true"/>
                <CheckboxVue :model="true" id="checkbox4-req" :disabled="true" :minus="true" type="required"/>
            </div>
        </div>
        <div class="checkbox-container">
            <div class="card">
                <CheckboxVue :model="model" id="checkbox5" text="Default"/>
                <CheckboxVue :model="model" id="checkbox5-req" text="Default" :disabled="true"/>
            </div>
            <div class="card">
                <CheckboxVue :model="model" id="checkbox6" type="required" text="Default"/>
                <CheckboxVue :model="true" id="checkbox6-req" type="required" text="Default" :disabled="true"/>
            </div>
            <div class="card">
                <CheckboxVue :model="model" id="checkbox7" :minus="true" text="Default"/>
                <CheckboxVue :model="model" id="checkbox7-req" :minus="true" text="Default" :disabled="true"/>
            </div>
            <div class="card">
                <CheckboxVue :model="model" id="checkbox8" :minus="true" type="required" text="Default"/>
                <CheckboxVue :model="true" id="checkbox8-req" :minus="true" type="required" text="Default" :disabled="true"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.playground{
    display: flex;
    flex-direction: row;
}
.card{
    position: relative;
    width: 40vw;
}
label{
    position: absolute;
    color: black;
    left: 10px;
}
</style>