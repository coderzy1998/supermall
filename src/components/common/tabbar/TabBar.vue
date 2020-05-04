<template>
  <div id="tab-bar" v-if="isShowTabbar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar",
    data(){
      return{
        isShowTabbar:true
      }
    },
  }
</script>

<style scoped>
  #tab-bar{
    display: flex;
    background-color: #f6f6f6;
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0px;
    box-shadow: 0 -1px 1px rgba(100,100,100,0.3);
    /*z-index: 9;*/
  }
</style>
