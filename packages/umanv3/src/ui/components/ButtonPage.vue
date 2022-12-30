<script setup lang="ts">
import { ElNotification } from "element-plus";
import ButtonVue from "./molecules/button-vue.vue";

const notification = () => {
  ElNotification({
    title: 'Title',
    message: "Test button",
  })
}
</script>

<template>
  <div class="playground">
    <div class="btn-container">
      <div class="card">
        <ButtonVue elText="Primary" elType="primary" id="first" @click="notification"/>
        <ButtonVue
          elText="Primary"
          :disabled="true"
          elType="primary"
        />
      </div>
      <div class="card">
        <ButtonVue elText="Secondary" elType="secondary" id="secondary"/>
        <ButtonVue
          elText="Secondary"
          :disabled="true"
          elType="secondary"
        />
      </div>
      <div class="card">
        <ButtonVue elText="Tertiary" elType="tertiary" id="tertiary" />
        <ButtonVue
          elText="Tertiary"
          :disabled="true"
          elType="tertiary"
        />
      </div>
      <div class="card">
        <ButtonVue
          elText="Plain Button"
          elType="plain-button"
        />
        <ButtonVue
          elText="Plain Button"
          :disabled="true"
          elType="plain-button"
        />
      </div>
      <div class="card">
        <ButtonVue elText="Destructive" elType="destructive" id="destructive" />
        <ButtonVue
          elText="Destructive"
          :disabled="true"
          elType="destructive"
        />
      </div>
    </div>
  <!--LOADING-->
    <div class="btn-container">
      <div class="card">
        <ButtonVue elText="Primary" elType="primary" id="first-icon" :iconLeft="true"/>
        <ButtonVue
          elText="Primary"
          :disabled="true"
          elType="primary"
          :iconLeft="true"
        />
      </div>
      <div class="card">
        <ButtonVue elText="Secondary" elType="secondary" id="secondary-icon" :iconLeft="true"/>
        <ButtonVue
          elText="Secondary"
          :disabled="true"
          elType="secondary"
          :iconLeft="true"
        />
      </div>
      <div class="card">
        <ButtonVue elText="Tertiary" elType="tertiary" id="tertiary-icon" :iconLeft="true"/>
        <ButtonVue
          elText="Tertiary"
          :disabled="true"
          elType="tertiary"
          :iconLeft="true"
        />
      </div>
      <div class="card">
        <ButtonVue
          elText="Plain Button"
          elType="plain-button"
          :iconLeft="true"
        />
        <ButtonVue
          elText="Plain Button"
          :disabled="true"
          elType="plain-button"
          :iconLeft="true"
        />
      </div>
      <div class="card">
        <ButtonVue elText="Destructive" elType="destructive" id="destructive-icon" :iconLeft="true"/>
        <ButtonVue
          elText="Destructive"
          :disabled="true"
          elType="destructive"
          :iconLeft="true"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.playground{
  @apply flex-row;
}
</style>