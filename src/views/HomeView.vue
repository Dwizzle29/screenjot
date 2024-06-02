<template>
  <div class="container mb-3">
    <div class="container-md bg-gray-100">
      <div class="d-flex justify-content-center align-items-center">
        <div class="image-container opacity-50">
          <img src="../assets/friends.jpg" alt="New York" class="img-fluid" />
        </div>
      </div>
    </div>
    <section id="popular" class="container mb-5">
      <h2 class="text-center">Popular this week!</h2>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-5">
        <div
          class="col d-flex justify-content-center mb-3"
          v-for="show in tvshow"
          :key="show.title"
        >
          <tvcard
            :image-url="show.imageUrl"
            :title="show.title"
            :showId="show.id"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, where, query } from "firebase/firestore";
import tvcard from "../components/TvCard.vue";
const tvshow = ref([]);
const q = query(collection(db, "tv_show"), where("popular", "==", true));
//gets and displays tv shows which are popular
onMounted(async () => {
  const querySnapshot = await getDocs(q);
  let fbTvShow = [];
  querySnapshot.forEach((shows) => {
    const show = {
      id: shows.id,
      title: shows.data().show_title,
      imageUrl: shows.data().show_img,
    };
    fbTvShow.push(show);
  });
  tvshow.value = fbTvShow;
});
</script>

<style>
.image-container {
  max-width: 100%;
  height: auto;
}
</style>
