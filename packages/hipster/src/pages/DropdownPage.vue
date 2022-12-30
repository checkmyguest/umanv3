<script setup lang="ts">
export interface Actions{
    name: string,
    function: Function
}
import DropdownVue from "@/components/dropdown/dropdown-vue.vue";
import FilterVue from "@/components/filter/filter-vue.vue";
import { ElNotification } from "element-plus";

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
                <DropdownVue text="Primary" type="primary" id="primary" :actions="actions"/>
                <DropdownVue text="Primary" type="primary" id="primary2" :actions="actions" :disabled="true"/>
            </div>
            <div class="card">
                <DropdownVue text="Secondary" type="secondary" id="secondary" :actions="actions"/>
                <DropdownVue text="Secondary" type="secondary" id="secondary2" :actions="actions" :disabled="true"/>
            </div>
            <div class="card">
                <DropdownVue text="Tertiary" type="tertiary" id="tertiary" :actions="actions"/>
                <DropdownVue text="Tertiary" type="tertiary" id="tertiary2" :actions="actions" :disabled="true"/>
            </div>
            <div class="card">
                <DropdownVue text="Plain button" type="plain-button" id="plain-button" :actions="actions"/>
                <DropdownVue text="Plain button" type="plain-button" id="plain-button2" :actions="actions" :disabled="true"/>
            </div>
            <div class="card">
                <DropdownVue text="Destructive" type="destructive" id="destructive" :actions="actions"/>
                <DropdownVue text="Destructive" type="destructive" id="destructive2" :actions="actions" :disabled="true"/>
            </div>
        </div>
        <!--ICON-->
        <div class="dropdown-container">
            <div class="card">
                <DropdownVue text="Primary" type="primary" id="primary-icon" :actions="actions" iconLeft="Filter"/>
                <DropdownVue text="Primary" type="primary" id="primary2-icon" :actions="actions" :disabled="true" iconLeft="Filter"/>
            </div>
            <div class="card">
                <DropdownVue text="Secondary" type="secondary" id="secondary-icon" :actions="actions" iconLeft="Filter"/>
                <DropdownVue text="Secondary" type="secondary" id="secondary2-icon" :actions="actions" :disabled="true" iconLeft="Filter"/>
            </div>
            <div class="card">
                <DropdownVue text="Tertiary" type="tertiary" id="tertiary-icon" :actions="actions" iconLeft="Filter"/>
                <DropdownVue text="Tertiary" type="tertiary" id="tertiary2-icon" :actions="actions" :disabled="true" iconLeft="Filter"/>
            </div>
            <div class="card">
                <DropdownVue text="Plain button" type="plain-button" id="plain-button-icon" :actions="actions" iconLeft="Filter"/>
                <DropdownVue text="Plain button" type="plain-button" id="plain-button2-icon" :actions="actions" :disabled="true" iconLeft="Filter"/>
            </div>
            <div class="card">
                <DropdownVue text="Destructive" type="destructive" id="destructive-icon" :actions="actions" iconLeft="Filter"/>
                <DropdownVue text="Destructive" type="destructive" id="destructive2-icon" :actions="actions" :disabled="true" iconLeft="Filter"/>
            </div>
        </div>
    </div>
    <!-- SPLIT -->
    <div class="playground">
        <div class="dropdown-container">
            <div class="card">
                <DropdownVue text="Primary" type="primary" id="primary-icon-split" :actions="actions" :split="true" :mainAction='mainButton'/>
                <DropdownVue text="Primary" type="primary" id="primary2-icon-split" :actions="actions" :disabled="true" :split="true"/>
            </div>
            <div class="card">
                <DropdownVue text="Secondary" type="secondary" id="secondary-icon-split" :actions="actions" :split="true"/>
                <DropdownVue text="Secondary" type="secondary" id="secondary2-icon-split" :actions="actions" :disabled="true" :split="true"/>
            </div>
            <div class="card">
                <DropdownVue text="Tertiary" type="tertiary" id="tertiary-icon-split" :actions="actions" :split="true" />
                <DropdownVue text="Tertiary" type="tertiary" id="tertiary2-icon-split" :actions="actions" :disabled="true" :split="true"/>
            </div>
            <div class="card">
                <DropdownVue text="Plain button" type="plain-button" id="plain-button-icon-split" :actions="actions" :split="true"/>
                <DropdownVue text="Plain button" type="plain-button" id="plain-button2-icon-split" :actions="actions" :disabled="true" :split="true"/>
            </div>
            <div class="card">
                <DropdownVue text="Destructive" type="destructive" id="destructive-icon-split" :actions="actions" :split="true"/>
                <DropdownVue text="Destructive" type="destructive" id="destructive2-icon-split" :actions="actions" :disabled="true" :split="true"/>
            </div>
        </div>
        <div class="dropdown-container">
            <div class="card">
                <span style="color: black">Filter</span>
                <FilterVue />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.playground{
    @apply flex-row;
}
.card{
    width: 20vw;
    height: 6vh;
}
</style>