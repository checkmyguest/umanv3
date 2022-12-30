<script setup lang="ts">
export interface Actions{
    name: string,
    function: Function
}
import { ElNotification } from "element-plus";
import DropdownVue from "./molecules/dropdown-vue.vue";

const notification = (message: string) => {
  ElNotification({
    title: 'Dropdown',
    message: message,
  })
}

const actions : Actions[] = [
    {name: 'Truc', function: truc },
    {name: 'Autre Truc', function: autreTruc }
];

function mainButton(){
    notification("Main dropdown");
}
function truc(){
    notification("Truc");
}
function autreTruc(){
    notification("Autre Truc")
}
</script>

<template>
    <div class="playground">
        <div class="dropdown-container">
            <div class="card">
                <DropdownVue elText="Primary" elType="primary" id="primary" :actions="actions"/>
                <DropdownVue elText="Primary" elType="primary" id="primary2" :actions="actions" :disabled="true"/>
            </div>
            <div class="card">
                <DropdownVue elText="Secondary" elType="secondary" id="secondary" :actions="actions"/>
                <DropdownVue elText="Secondary" elType="secondary" id="secondary2" :actions="actions" :disabled="true"/>
            </div>
            <div class="card">
                <DropdownVue elText="Tertiary" elType="tertiary" id="tertiary" :actions="actions"/>
                <DropdownVue elText="Tertiary" elType="tertiary" id="tertiary2" :actions="actions" :disabled="true"/>
            </div>
            <div class="card">
                <DropdownVue elText="Plain button" elType="plain-button" id="plain-button" :actions="actions"/>
                <DropdownVue elText="Plain button" elType="plain-button" id="plain-button2" :actions="actions" :disabled="true"/>
            </div>
            <div class="card">
                <DropdownVue elText="Destructive" elType="destructive" id="destructive" :actions="actions"/>
                <DropdownVue elText="Destructive" elType="destructive" id="destructive2" :actions="actions" :disabled="true"/>
            </div>
        </div>
        <!--ICON-->
        <div class="dropdown-container">
            <div class="card">
                <DropdownVue elText="Primary" elType="primary" id="primary-icon" :actions="actions" :iconLeft="true"/>
                <DropdownVue elText="Primary" elType="primary" id="primary2-icon" :actions="actions" :disabled="true" :iconLeft="true"/>
            </div>
            <div class="card">
                <DropdownVue elText="Secondary" elType="secondary" id="secondary-icon" :actions="actions" :iconLeft="true"/>
                <DropdownVue elText="Secondary" elType="secondary" id="secondary2-icon" :actions="actions" :disabled="true" :iconLeft="true"/>
            </div>
            <div class="card">
                <DropdownVue elText="Tertiary" elType="tertiary" id="tertiary-icon" :actions="actions" :iconLeft="true"/>
                <DropdownVue elText="Tertiary" elType="tertiary" id="tertiary2-icon" :actions="actions" :disabled="true" :iconLeft="true"/>
            </div>
            <div class="card">
                <DropdownVue elText="Plain button" elType="plain-button" id="plain-button-icon" :actions="actions" :iconLeft="true"/>
                <DropdownVue elText="Plain button" elType="plain-button" id="plain-button2-icon" :actions="actions" :disabled="true" :iconLeft="true"/>
            </div>
            <div class="card">
                <DropdownVue elText="Destructive" elType="destructive" id="destructive-icon" :actions="actions" :iconLeft="true"/>
                <DropdownVue elText="Destructive" elType="destructive" id="destructive2-icon" :actions="actions" :disabled="true" :iconLeft="true"/>
            </div>
        </div>
    </div>
    <!-- SPLIT -->
    <div class="playground">
        <div class="dropdown-container">
            <div class="card">
                <DropdownVue elText="Primary" elType="primary" id="primary-icon-split" :actions="actions" :split="true" :mainAction='mainButton'/>
                <DropdownVue elText="Primary" elType="primary" id="primary2-icon-split" :actions="actions" :disabled="true" :split="true"/>
            </div>
            <div class="card">
                <DropdownVue elText="Secondary" elType="secondary" id="secondary-icon-split" :actions="actions" :split="true"/>
                <DropdownVue elText="Secondary" elType="secondary" id="secondary2-icon-split" :actions="actions" :disabled="true" :split="true"/>
            </div>
            <div class="card">
                <DropdownVue elText="Tertiary" elType="tertiary" id="tertiary-icon-split" :actions="actions" :split="true" />
                <DropdownVue elText="Tertiary" elType="tertiary" id="tertiary2-icon-split" :actions="actions" :disabled="true" :split="true"/>
            </div>
            <div class="card">
                <DropdownVue elText="Plain button" elType="plain-button" id="plain-button-icon-split" :actions="actions" :split="true"/>
                <DropdownVue elText="Plain button" elType="plain-button" id="plain-button2-icon-split" :actions="actions" :disabled="true" :split="true"/>
            </div>
            <div class="card">
                <DropdownVue elText="Destructive" elType="destructive" id="destructive-icon-split" :actions="actions" :split="true"/>
                <DropdownVue elText="Destructive" elType="destructive" id="destructive2-icon-split" :actions="actions" :disabled="true" :split="true"/>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.playground{
    @apply flex-row;
}
.card{
    width: 40vw;
}
</style>