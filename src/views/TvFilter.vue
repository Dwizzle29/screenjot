<template>
  <div class="container mb-3">
    <section id="popular" class="container mb-5">
      <h2 class="text-center m-4">TV Shows</h2>

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4">
        <div
          class="col d-flex justify-content-center mb-3"
          v-for="show in paginatedData"
          :key="show.id"
        >
          <tvcard
            :image-url="show.imageUrl"
            :title="show.title"
            :show-id="show.id"
          />
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <paginate
          v-if="pageCount > 1"
          :page-count="pageCount"
          :click-handler="paginate"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
        ></paginate>
      </div>
    </section>
  </div>
</template>

<script>
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import tvcard from "../components/TvCard.vue";
import Paginate from "vuejs-paginate-next";

export default {
  components: {
    tvcard,
    Paginate,
  },
  data() {
    return {
      page: 1,
      perPage: 8,
      search: "",
      tvshow: [],
    };
  },
  async mounted() {
    await this.fetchData();
  },
  computed: {
    paginatedData() {
      const start = (this.page - 1) * this.perPage;
      const end = start + this.perPage;
      return this.tvshow.slice(start, end);
    },
    pageCount() {
      return Math.ceil(this.tvshow.length / this.perPage);
    },
  },
  methods: {
    //gets docs in database and displays through pagination
    async fetchData() {
      const q = query(collection(db, "tv_show"));
      const querySnapshot = await getDocs(q);
      let fbTvShow = [];
      querySnapshot.forEach((doc) => {
        fbTvShow.push({
          id: doc.id,
          title: doc.data().show_title,
          imageUrl: doc.data().show_img,
        });
      });
      this.tvshow = fbTvShow;
    },
    paginate(pageNum) {
      this.page = pageNum;
    },
  },
};
</script>
