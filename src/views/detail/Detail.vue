<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navbar"></detail-nav-bar>

    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="cotentScroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgsLoad="imgsLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <good-list ref="recommend" :goods="recommend"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar class="bottom-bar" @addCart="addCart"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodList from "../../components/content/goods/GoodList";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import Toast from "../../components/common/toast/Toast";

  import Scroll from "../../components/common/scroll/Scroll";

  import {detail,Goods,shop,GoodsParam,recommend} from "../../network/detail";
  import {debounce} from "../../common/utils";
  import {itemLoadMixin,backTopMixin} from "../../common/mixin";

  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodList,
      DetailBottomBar,
      Scroll
    },
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo: {},
        paramInfo: {},
        commentInfo:{},
        recommend:[],
        topYs:[],
        getTopYs:null,
      }
    },
    mixins:[itemLoadMixin,backTopMixin],
    created() {
      this.iid=this.$route.params.iid;

      detail(this.iid).then(res =>{
        const data=res.result;
        // 请求轮播图数据
        this.topImages=data.itemInfo.topImages;
        // 请求基础信息数据
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services);
        // 请求店铺信息
        this.shop=new shop(data.shopInfo);
        // 获取商品详情信息
        this.detailInfo=data.detailInfo;
        // 获取参数信息
        this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule);
        // 获取评论信息
        if (data.rate.list)
        {
          this.commentInfo=data.rate.list[0]
        }
      });
      // 获取推荐信息
      recommend().then(res =>
      {
        this.recommend=res.data.list
      });
      // 给参数，评论，推荐的offsetTop赋值
      this.getTopYs=()=>{
        this.topYs.push(0);
        this.topYs.push(this.$refs.params.$el.offsetTop);
        this.topYs.push(this.$refs.comment.$el.offsetTop);
        this.topYs.push(this.$refs.recommend.$el.offsetTop);
      }
    },
    mounted(){

    },
    destroyed()
    {
      this.$bus.$off('ItemImageLoad',this.itemLoadMixin)
    },
    methods:{
      imgsLoad()
      {
        this.$refs.scroll.refresh();
        // 获取每个主题的offsetTop
        this.getTopYs()
      },
      titleClick(index)
      {
        this.$refs.scroll.scrollTo(0,-this.topYs[index],300)
      },
      cotentScroll(position)
      {
        if (-position.y>=0&&-position.y<this.topYs[1])
        {
          this.$refs.navbar.currentIndex=0
        }else if(-position.y>=this.topYs[1]&&-position.y<this.topYs[2])
        {
          this.$refs.navbar.currentIndex=1
        }else if(-position.y>=this.topYs[2]&&-position.y<this.topYs[3])
        {
          this.$refs.navbar.currentIndex=2
        }else if(-position.y>=this.topYs[3])
        {
          this.$refs.navbar.currentIndex=3
        }

        this.isShowBackTop=(-position.y)>700
      },
      addCart()
      {
        // 获取购物车需要展示得信息
        const product={}
        product.image=this.topImages[0];
        product.title=this.goods.title;
        product.desc=this.goods.desc;
        product.price=this.goods.realPrice;
        product.iid=this.iid
        // 将商品添加到购物车中
        // 以后如果需要判断异步操作是否完成，一律放到Promise里回调
        this.$store.dispatch('addCart',product).then(res =>
        {
          this.$toast.show(res)
        })
      }
    },
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;
    background-color: #fff;
  }
</style>
