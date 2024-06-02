import { createRouter, createWebHistory } from "vue-router";
import home from "../views/HomeView.vue";
import tvfilter from "../views/TvFilter.vue";
import signin from "../views/SignIn.vue";
import register from "../views/Register.vue";
import account from "../views/Account.vue";
import search from "../views/SearchTvShow.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
    },

    {
      path: "/tvfilter",
      name: "tvfilter",
      component: () => import("../views/TvFilter.vue"),
    },
    {
      path: "/search",
      name: "search",
      component: () => import("../views/SearchTvShow.vue"),
    },
    {
      path: "/signin",
      name: "signin",
      component: () => import("../views/SignIn.vue"),
    },
    {
      path: "/register",
      name: "register",

      component: () => import("../views/Register.vue"),
    },

    {
      path: "/account",
      component: () => import("../views/Account.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser) {
      next();
    } else {
      alert("you don't have access");
      next("/");
    }
  } else {
    next();
  }
});
export default router;
