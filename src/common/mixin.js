import {debounce} from "./utils";
import BackTop from "../components/content/backTop/BackTop";

export const itemLoadMixin={
  data(){
    return{
      itemLoadMixin:null
    }
  },
  mounted()
  {
    let refresh=debounce(this.$refs.scroll.refresh,100)
    this.itemLoadMixin= refresh
    // 监听事件总线中的事件：监听图片刷新
    this.$bus.$on('ItemImageLoad',() =>
    {
      this.itemLoadMixin()
    })
  }
};

export const backTopMixin={
  data() {
    return {
      isShowBackTop:false,
    }
  },
  components:{
    BackTop
  },
  methods:{
    backClick()
    {
      this.$refs.scroll.scrollTo(0,0)
    },
  }
};
