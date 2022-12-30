<script setup lang="ts">
import ButtonVue from "@/components/button/button-vue.vue";
import { ElNotification } from "element-plus";

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
        <ButtonVue text="Primary" type="primary" @click="notification()"/>
        <ButtonVue
          text="Primary"
          :disabled="true"
          type="primary"
          size="large"
        />
      </div>
      <div class="card">
        <ButtonVue icon="ArrowDown" type="secondary" />
        <ButtonVue
          text="Secondary"
          :disabled="true"
          type="secondary"
        />
      </div>
      <div class="card">
        <ButtonVue text="Tertiary" type="tertiary" />
        <ButtonVue
          text="Tertiary"
          :disabled="true"
          type="tertiary"
        />
      </div>
      <div class="card">
        <ButtonVue
          text="Plain Button"
          type="plain-button"
        />
        <ButtonVue
          text="Plain Button"
          :disabled="true"
          type="plain-button"
        />
      </div>
      <div class="card">
        <ButtonVue text="Destructive" type="destructive" />
        <ButtonVue
          text="Destructive"
          :disabled="true"
          type="destructive"
        />
      </div>
    </div>
  <!--LOADING-->
    <div class="btn-container">
      <div class="card">
        <ButtonVue text="Primary" type="primary" iconLeft="Filter"/>
        <ButtonVue
          text="Primary"
          :disabled="true"
          type="primary"
          iconLeft="Filter"
        />
      </div>
      <div class="card">
        <ButtonVue text="Secondary" type="secondary" iconLeft="Filter"/>
        <ButtonVue
          text="Secondary"
          :disabled="true"
          type="secondary"
          iconLeft="Filter"
        />
      </div>
      <div class="card">
        <ButtonVue text="Tertiary" type="tertiary" iconLeft="Filter"/>
        <ButtonVue
          text="Tertiary"
          :disabled="true"
          type="tertiary"
          iconLeft="Filter"
        />
      </div>
      <div class="card">
        <ButtonVue
          text="Plain Button"
          type="plain-button"
          iconLeft="Filter"
        />
        <ButtonVue
          text="Plain Button"
          :disabled="true"
          type="plain-button"
          iconLeft="Filter"
        />
      </div>
      <div class="card">
        <ButtonVue text="Destructive" type="destructive" iconLeft="Filter"/>
        <ButtonVue
          text="Destructive"
          :disabled="true"
          type="destructive"
          iconLeft="Filter"
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