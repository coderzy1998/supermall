<template>
  <swiper>
    <swiper-item v-for="(i,index) in banners" :key="index">
      <a :href="i.link">
        <img :src="i.image" alt="" @load="swiperImgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    name: "HomeSwiper",
    components:{
      SwiperItem,
      Swiper
    },
    data(){
      return{
        isSwiperLoad:true
      }
    },
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      swiperImgLoad()
      {
        if (this.isSwiperLoad)
        {
          this.$emit('swiperImgLoad')
          this.isSwiperLoad=false
        }
      }
    }
  }
</script>

<style scoped>

</style>
