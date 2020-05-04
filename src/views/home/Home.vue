<template>
  <div id="home">
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl2" class="tabControl" v-show="isShowTab">
    </tab-control>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl1">
      </tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>
<!--    .native修饰符，在需要监听组件原生事件时使用-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodList from "../../components/content/goods/GoodList";
  import Scroll from "../../components/common/scroll/Scroll";

  import {getHomeMultidata,getHomeGoods} from "../../network/home";
  import {debounce} from "../../common/utils";
  import {itemLoadMixin,backTopMixin} from "../../common/mixin";

  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodList,
      Scroll,
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        tabOffsetTop:0,
        isShowTab:false,
        saveY:0,
      }
    },
    mixins:[itemLoadMixin,backTopMixin],
    created() {
      this.getHomeMultidata();

      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    mounted(){

    },
    deactivated(){
      this.$bus.$off('ItemImageLoad',this.itemLoadMixin)
    },
    computed:{
      showGoods()
      {
        return this.goods[this.currentType].list
      }
    },
    activated()
    {
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0,this.saveY,0);
    },
    beforeRouteLeave(to,from,next)
    {
      this.saveY=this.$refs.scroll.scroll.y;
      next()
    },
    methods:{
      /**
       *事件监听相关方法
       */

      tabClick(index)
      {
        switch (index)
        {
          case 0:this.currentType='pop';
            break;
          case 1:this.currentType='new';
            break;
          case 2:this.currentType='sell';
            break
        }
        this.$refs.tabControl1.currentIndex=index;
        this.$refs.tabControl2.currentIndex=index;
        if (this.$refs.scroll.scroll.y < -this.tabOffsetTop)
        {
          this.$refs.scroll.refresh()
          this.$refs.scroll.scrollTo(0,-this.tabOffsetTop,500)
        }
      },
      contentScroll(position)
      {
        // 判断backtop是否显示
        this.isShowBackTop=(-position.y)>700
        // 判断tabcontrol是否显示
        this.isShowTab=(-position.y)>this.tabOffsetTop
      },
      loadMore()
      {
        // this.$refs.scroll.refresh()
        this.getHomeGoods(this.currentType)

      },
      swiperImgLoad()
      {
        // 获取tabControl的offsetTop
        // 所有组件都有一个属性$el：用于获取组件中的元素
        this.tabOffsetTop=this.$refs.tabControl1.$el.offsetTop
      },
      /**
       * 网络请求
       */
      getHomeMultidata()
      {
        getHomeMultidata().then(res =>
        {
          this.banners=res.data.banner.list;
          this.recommends=res.data.recommend.list;
        })
      },
      getHomeGoods(type)
      {
        const page=this.goods[type].page+1;
        getHomeGoods(type,page).then(res =>
        {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1
          this.$refs.scroll.finishPullUp()
        })
      },
    }
  }
</script>

<style scoped>
  .home-bar{
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  #home{
    /*padding-top: 44px;*/
    position: relative;
    height: 100vh;
  }
  .content{
    /*overflow: hidden;*/
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
  .tabControl{
    position: relative;
    z-index: 10;
  }
  .aaa{
    color:#ccc;
    font-size: 14px;
  }
</style>
