<template>
  <div class="page">
    <div class="login-card">
      <div class="content-wrapper">
        <div class="logo">
          <img
            src="../../../assets/img/logo/logo_blue.svg"
            alt="logo"
            class="logo-blue"
          >
        </div>
        <div
          v-if="errorAlert"
          class="cmg-alert danger mt-8"
        >
          <div class="alert-icon-info">
            <img
              src="@/assets/img/alert-danger.svg"
              alt="alert"
            >
          </div>
          <div class="alert-content">
            <div class="alert-content-body">
              <p>{{ errorMessage }}</p>
            </div>
          </div>
        </div>
        <div class="email-block">
          <label for="email">Email</label>
          <input
            v-model="email"
            type="email"
            name="email"
            placeholder="Entrez votre email"
            class="login-input w-full placeholder-gray-600"
            @keyup.enter="getTokenUman()"
          >
        </div>
        <div class="password-block">
          <label for="password">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            name="password"
            placeholder="Entrez votre mot de passe"
            class="login-input w-full placeholder-gray-600"
            @keyup.enter="getTokenUman()"
          >
        </div>
      </div>
      <button
        class="cmg-btn full-btn primary-btn"
        @click="getTokenUman()"
      >
        Se connecter
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { useAdminStore } from "@/stores/admin";
import axios from "axios";
import { ElNotification } from "element-plus";
import jwtDecode from "jwt-decode";
import { Ref, onMounted } from "vue";
import { ref } from "vue";
import { ViewServiceData } from "@/core/services/view-service";


const adminStore = useAdminStore();

interface Token {
  name: string;
  entity_id: string;
}

interface Login {
  mail: string;
  password: string;
}

interface AdminResponse {}

const email: Ref<string> = ref("");
const password: Ref<string> = ref("");
let errorAlert = false;
let errorMessage = "";

const url = import.meta.env.VITE_API_URL;

const notification = (message: string) => {
  ElNotification({
    title: "Erreur",
    message: message,
    type: "error",
  });
};

async function getTokenUman() {
  await axios
    .post(`${url}/v1/login-admin`, {
      mail: email.value,
      password: password.value,
    })
    .then((result) => {
      localStorage.setItem("token", result.data.token);
      getJWTInfo();
    })
    .catch((error: string) => {
      const type: string = JSON.parse(JSON.stringify(error)).message;
      if (type.includes("422")) {
        notification("Veuillez remplir les champs");
      } else if (type?.includes("401")) {
        notification("Email ou mot de passe incorrect");
      }
    });
}

async function getJWTInfo() {
  const token: string | null = localStorage.token;
  if (typeof token !== "string") return null;
  const code = jwtDecode<Token>(token);


  await axios
    .get(`${url}/v1/admin/${code.entity_id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
      }
    })
    .then(async (result) => {
     if (
        [9, 14].includes(result.data.admin_type_id) ||
        [37, 66, 26, 29, 124, 128, 79].includes(result.data.admin_id)
      ) {
        localStorage.setItem("admin", result.data);
        Promise.all([changeAdminState()]).then(() => {
          router.push("/");
        });
      } else {
        logoutAndRedirectToV1();
      }
    })
    .catch(({error}) => {
      if (error === "UnauthorizedError") {
        router.push("/login");
      }
    });
}

function logoutAndRedirectToV1() {
  localStorage.removeItem("token");

  // ? à quoi ça sert ?
  // setTimeout(() => {
  //   window.location.assign("https://uman.cmg.ovh/");
  // }, 2000);
}

function changeAdminState(): Promise<boolean> {
  adminStore.logIn();
  return Promise.resolve(true);
}

onMounted(() => {
  localStorage.setItem('logStatus', "false");
  adminStore.logOut();
})
</script>

<style lang="scss" src="./style.scss" scoped></style>
