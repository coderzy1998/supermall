<template>
  <div class="">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="titles">
        <div v-for="(i,index) in titles"
             class="title-item"
             :class="{active:index==currentIndex}"
             @click="titleClick(index)">{{i}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components:{
      NavBar
    },
    data(){
      return{
        titles:['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },
    methods:{
      titleClick(index)
      {
        this.currentIndex=index
        this.$emit('titleClick',index)
      },
      backClick()
      {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .titles{
    display: flex;
    font-size: 14px;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .back img{
    vertical-align: middle;
  }
</style>
