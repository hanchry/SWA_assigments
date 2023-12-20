<template>
  <RouterView />
</template>
<script>
import { RouterView } from 'vue-router';
import Layout from "@/components/Layout.vue";
export default {
  components: {
    RouterView,
    Layout,
  },
}
</script>


<style>
/* Apply background color to the body and HTML elements */
body,
html {
  background-color: #2c3e50;
  /* Replace with your desired background color */
  margin: 0;
  padding: 0;
  height: 100%;
}

/* Ensure the app container fills the entire height */
#app {
  height: 100%;
}
</style>