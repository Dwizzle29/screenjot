<template>
  <div class="container my-5 py-5">
    <form @submit.prevent="register" class="loginBox">
      <h2>Create Account</h2>
      <div class="form_group field">
        <input
          type="text"
          class="form_field"
          placeholder="Name"
          v-model="email"
          name="email"
          id="email"
          required
        />
        <label for="email" class="form_label">
          <Icon
            icon="gg:profile"
            width="30"
            height="30"
            style="padding-bottom: 5px; padding-right: 5px"
          />
          Email</label
        >
      </div>
      <div class="form_group field">
        <input
          type="password"
          class="form_field"
          placeholder="Name"
          v-model="password"
          name="password"
          id="password"
          required
        />
        <label for="password" class="form_label"
          ><Icon
            icon="material-symbols:key"
            width="30"
            height="30"
            style="padding-bottom: 5px; padding-right: 5px"
          />
          Password</label
        >
      </div>
      <div class="form_group field">
        <input
          type="password"
          class="form_field"
          placeholder="Name"
          v-model="confPassword"
          name="confPassword"
          id="confPassword"
          required
        />
        <label for="confPassword" class="form_label"
          ><Icon
            icon="material-symbols:key"
            width="30"
            height="30"
            style="padding-bottom: 5px; padding-right: 5px"
          />
          Confirm Password</label
        >
        <span v-if="errMsg == true">Passwords do not match!</span>
      </div>
      <button class="btn-login" type="submit">Submit</button>

      <p>
        Already are registered?
        <router-link to="/signin">Sign in here</router-link>
      </p>
    </form>
  </div>
</template>
<script setup>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig.js";
import { useRouter } from "vue-router";
import { errorMessages } from "vue/compiler-sfc";
</script>
<script>
import { Icon } from "@iconify/vue";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      email: "",
      password: "",
      confPassword: "",
      errMsg: "",
    };
  },
  methods: {
    register() {
      if (this.password === this.confPassword) {
        // register new user and logs them in
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then(async (credential) => {
            const user = credential.user;
            const userUid = user.uid;

            const findUserDoc = doc(db, "users", userUid);

            const userDoc = await getDoc(findUserDoc);
            if (userDoc.exists()) {
              await setDoc(
                findUserDoc,
                {
                  email: user.email,
                },
                { merge: true }
              );
            } else {
              await setDoc(findUserDoc, { email: user.email });
              console.log(credential.user);
              this.$emit("isLoggedIn");
              this.$router.push("/account");
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        this.errMsg = true;
      }
    },
  },
};
</script>
