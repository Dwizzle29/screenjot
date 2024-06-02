<template>
  <div class="container">
    <h1>User Account</h1>
    <div class="d-flex justify-content-center">
      <p>
        Welcome to ScreenJot!
        <Icon
          icon="icon-park-outline:hi"
          width="24"
          height="24"
          style="color: 5e8D83"
        />
      </p>
    </div>
    <div class="d-flex justify-content-center align-items-center">
      <div class="image-container opacity-50">
        <img src="../assets/bg.jpeg" alt="TvShows" class="img-fluid" />
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
  components: {
    Icon,
  },
};
</script>
