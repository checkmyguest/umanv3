<script setup lang="ts">
import { ref } from "vue";
import InputVue from "./molecules/input-vue.vue";
const model = ref('');
</script>

<template>
    <div class="playground">
        <div class="btn-container">
            <div class="card">
                <label>Regular</label>
                <InputVue :model="model"/>
                <InputVue :model="model" :disabled="true"/>
            </div>
            <div class="card">
                <label>Required</label>
                <InputVue :model="model" :required="true"/>
            </div>
            <div class="card">
                <label>Icon</label>
                <InputVue :model="model" iconLeft="Euro"/>
                <InputVue :model="model" iconLeft="Euro" :disabled="true"/>
            </div>
            <div class="card">
                <label>Selected</label>
                <InputVue :model="model" iconLeft="Euro" :selected="true"/>
            </div>
            <div class="card">
                <label>Required & Icon</label>
                <InputVue :model="model" iconLeft="Euro" :required="true"/>
            </div>
            <div class="card">
                <label>Size sm</label>
                <InputVue :model="model" iconLeft="Euro" size="sm"/>
                <InputVue :model="model" iconLeft="Euro" size="sm" :disabled="true"/>
            </div>
            <div class="card">
                <InputVue :model="model" size="sm" :selected="true"/>
                <InputVue :model="model" iconLeft="Euro" size="sm" :selected="true"/>
            </div>
            <div class="card">
                <label>Clear</label>
                <InputVue :model="model" :cross="true"/>
                <InputVue :model="model" :cross="true" :disabled="true"/>
            </div>
            <div class="card">
                <label>Price</label>
                <InputVue :model="model" :price="true" size="sm"/>
                <InputVue :model="model" :price="true" :disabled="true"/>
            </div>
            <div class="card">
                <InputVue :model="model" :price="true" size="sm" :required="true"/>
                <InputVue :model="model" :price="true" size="sm" iconLeft="List" :required="true"/>
            </div>
            <div class="card">
                <label>Label</label>
                <InputVue :model="model" label="Label" size="sm"/>
                <InputVue :model="model" label="Bonjour" size="sm" :disabled="true"/>
            </div>
            <div class="card">
                <label>Error</label>
                <InputVue :model="model" label="Label" size="sm" :error="true"/>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.playground{
    color: black;
}
.card{
    width: 60vw;
    height: 8vh;
    position: relative;
    label{
        position: absolute;
        left: 8px;
        font-size: 16px;
    }
}
</style>