<template>
  <div class="card shadow" style="width: 10rem">
    <img
      :src="imageUrl"
      class="card-img-top"
      style="height: 15rem"
      alt="Card
    Image"
    />
    <div class="card-body" v-if="isLoggedIn">
      <Icon icon="ic:baseline-plus" class="iconPlus" />

      <Icon
        @click="toggleLike"
        :icon="hasLiked ? 'mdi:heart' : 'mdi:heart-outline'"
        class="iconHeart"
      />

      <p
        class="card-text text-center"
        style="width: 80%; margin-inline: auto; font-size: 13px"
      >
        {{ title }}
      </p>
    </div>
    <div class="card-body" v-else>
      <Icon icon="pepicons-pencil:plus-off" class="iconPlus" />
      <Icon icon="tabler:heart-off" class="iconHeart" />
      <p
        class="card-text text-center"
        style="width: 80%; margin-inline: auto; font-size: 13px"
      >
        {{ title }}
      </p>
    </div>
  </div>
</template>
<script setup>
import {
  getDoc,
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig.js";
</script>
<script>
import { Icon } from "@iconify/vue";
//TV Card - controls user liking a tv show and removing it and adding it to their database
export default {
  components: {
    Icon,
  },
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    showId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isLoggedIn: true,
      hasLiked: false,
    };
  },
  async mounted() {
    this.isLoggedIn = !!auth.currentUser;
    if (this.isLoggedIn) {
      this.userId = auth.currentUser.uid;
      await this.checkIfLiked();
    }
  },
  methods: {
    async checkIfLiked() {
      const userLike = await getDoc(doc(db, "tv_show", this.showId));
      const tvshowLike = await getDoc(doc(db, "users", this.userId));
      if (userLike.exists()) {
        const like_count = userLike.data().like_count || [];
        const show_like = tvshowLike.data().show_like || [];
        this.hasLiked =
          like_count.includes(this.userId) && show_like.includes(this.showId);
      }
    },
    async toggleLike() {
      if (!this.isLoggedIn) {
        alert("You must be logged in to like/unlike an image");
        return;
      }
      const userLike = doc(db, "tv_show", this.showId);
      const tvshowLike = doc(db, "users", this.userId);
      //Removes the user tv show from liked array  and users tv show likes
      if (this.hasLiked) {
        updateDoc(userLike, {
          like_count: arrayRemove(this.userId),
        });
        updateDoc(tvshowLike, {
          show_like: arrayRemove(this.showId),
        })
          .then(() => {
            this.hasLiked = false;
          })
          .catch((error) => {
            console.error("Error unliking the image:", error);
          });
      } else {
        //Adds the user tv show from liked array  and users tv show likes
        updateDoc(userLike, {
          like_count: arrayUnion(this.userId),
        });
        updateDoc(tvshowLike, {
          show_like: arrayUnion(this.showId),
        })
          .then(() => {
            this.hasLiked = true;
          })
          .catch((error) => {
            console.error("Error liking the image:", error);
          });
      }
    },
  },
};
</script>
