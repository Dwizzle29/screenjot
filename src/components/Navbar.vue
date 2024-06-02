<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top shadow">
    <div class="container">
      <div
        class="logo rounded-circle d-flex justify-content-center align-items-center"
      >
        <Icon
          icon="game-icons:tv"
          width="32"
          height="32"
          style="color: white"
        />
      </div>
      <router-link class="navbarbrand" to="/">ScreenJot</router-link>
      <!-- Handles smaller navbar-->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="true"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse d-md-flex flex-row-reverse"
        id="navbarSupportedContent"
      >
        <!-- Handles what user sees if logged in-->
        <span v-if="isLoggedIn">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link col" to="/search"
                >Search</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link col" to="/tvfilter"
                >TV Shows</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link col" to="/account"
                >Account</router-link
              >
            </li>
            <li class="nav-item">
              <span @click="handleSignOut" class="nav-link">Signout</span>
            </li>
          </ul>
        </span>
        <span v-else>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link col" to="/search"
                >Search</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link col" to="/tvfilter"
                >TV Shows</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/signin">Sign In</router-link>
            </li>
          </ul>
        </span>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { useRouter } from "vue-router";

import { ref } from "vue";
import { auth } from "../firebase/firebaseConfig.js";
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";

const router = useRouter();
const isLoggedIn = ref(true);

auth.onAuthStateChanged(function (user) {
  if (user) {
    isLoggedIn.value = true;
  } else {
    isLoggedIn.value = false;
  }
});

const handleSignOut = () => {
  auth.signOut();
  router.push("/");
};
</script>
