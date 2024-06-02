<template>
  <div class="container my-5 py-5">
    <form @submit.prevent="userLogin" class="loginBox">
      <h2>Login</h2>
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
        <span v-if="errMsg == true">User doesnt exist! Use register below</span>
      </div>
      <button class="btn-login" type="submit">Submit</button>
      <p>
        Dont have a login?
        <router-link to="/register">Register here</router-link>
      </p>
    </form>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig.js";
const router = useRouter();
</script>
<script>
import { Icon } from "@iconify/vue";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  components: {
    Icon,
  },
  data() {
    return {
      email: "",
      password: "",
      errMsg: "",
    };
  },
  methods: {
    userLogin() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(async (credential) => {
          // Checks user is register and signs them in
          const user = credential.user;
          const userUid = user.uid;

          const findUserDoc = doc(db, "users", userUid);

          const userDoc = await getDoc(findUserDoc);
          if (userDoc.exists()) {
            await setDoc(findUserDoc, { email: user.email });
            console.log(credential.user);
            this.$emit("isLoggedIn");
            this.$router.push("/account");
          } else {
          }
        })
        .catch((error) => {
          this.errMsg = true;
          console.log(error.message);
        });
    },
  },
};
</script>
