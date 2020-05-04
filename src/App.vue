<template>
  <div id="app">
    <keep-alive exclude="Detail,Profile">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
    <icon></icon>
    <svg-icon></svg-icon>
  </div>
</template>
<script>
  import MainTabBar from "./components/content/maintabbar/MainTabBar";
  import Icon from "./components/content/Icon/Icon";
  import svgIcon from "./components/content/Icon/svg";
  import Swiper from 'components/common/swiper/Swiper.vue'
  export default {
    components: {MainTabBar,Icon,svgIcon,Swiper}
  }
</script>
<style>
 @import "assets/css/base.css";
 @import "assets/css/normalize.css";
</style>
