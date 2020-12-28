<template>
  <div id="app">
    <router-view/>
    <Tab></Tab>
  </div>
</template>

<script>
import Tab from "@/components/tabs";
export default {
  name: "App",
  components: {
    Tab
  }
};
</script>

<style lang= "less">
@import "@/assets/css/reset.css";
</style>
