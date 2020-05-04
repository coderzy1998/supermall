<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    data(){
      return{
        scroll:null
      }
    },
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type: Boolean,
        default: false
      }
    },
    methods:{
      scrollTo(x,y,time=300)
      {
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp()
      {
        this.scroll.finishPullUp()
      },
      refresh()
      {
        this.scroll && this.scroll.refresh()
      }
    },
    mounted() {
      this.scroll=new BScroll(this.$refs.wrapper,{
        // probeType默认为0当probeType设置为0或1时，不会实时侦测位置，设置为2时会侦测位置
        // 但不能侦测滚动惯性产生的位置，设置为3时，会实时侦测滚动的所有位置
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad,
        click:true
      });
      // 侦测滚动的位置
      this.scroll.on('scroll',(position) =>
      {
        this.$emit('scroll',position)
      });
      // 侦测上拉加载
      this.scroll.on('pullingUp',() =>
      {
        this.$emit('pullingUp')
      })
    }
  }
</script>

<style scoped>

</style>
