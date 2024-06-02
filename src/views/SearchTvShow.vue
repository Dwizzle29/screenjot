<template>
  <div class="container mb-3">
    <form class="d-flex mx-auto mt-3" @submit.prevent="fetchData">
      <input
        class="form-control me-2"
        type="text"
        placeholder="Search TV Show"
        aria-label="Search"
        v-model="searchResult"
      />

      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>

    <section id="popular" class="container mb-5">
      <h2 class="text-center m-4">TV Shows</h2>

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4">
        <div
          class="col d-flex justify-content-center mb-3"
          v-for="show in searchTVShow"
          :key="show.id"
        >
          <tvcard
            :image-url="show.imageUrl"
            :title="show.title"
            :show-id="show.id"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { db, auth } from "../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  orderBy,
} from "firebase/firestore";
import tvcard from "../components/TvCard.vue";

export default {
  components: {
    tvcard,
  },
  data() {
    return {
      searchResult: "",
      showsByOrder: false,
      tvshow: [],
      likedShow: [],
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    //deals with what a user is searching
    searchTVShow() {
      let filterTvShow = this.tvshow;
      return filterTvShow.filter((tv) => {
        return (
          tv.title.toLowerCase().indexOf(this.searchResult.toLowerCase()) != -1
        );
      });
    },
  },
  methods: {
    //calls data from database
    async fetchData() {
      if (this.searchTVShow) {
        const q = query(collection(db, "tv_show"));
        const querySnapshot = await getDocs(q);
        let fbTvShow = [];
        querySnapshot.forEach((doc) => {
          fbTvShow.push({
            id: doc.id,
            title: doc.data().show_title,
            imageUrl: doc.data().show_img,
            user: doc.data().like_count,
          });
        });
        this.tvshow = fbTvShow;
      }
    },
  },
};
</script>
