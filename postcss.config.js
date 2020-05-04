// 移动端适配css的转换插件px2vw
module.exports={
  plugins:{
    "postcss-px-to-viewport":{
      viewportWidth: 375,//视窗宽度，对应的是设计稿的宽度
      viewportHeight: 667,//视窗高度，对应的是设计稿的高度
      unitPrecision: 4,//指定‘px’转化为视窗单位时，保留的小数数位
      viewportUnit: 'vw',//指定需要转化的视窗单位
      selectorBlackList: ['ignore'],//指定不需要转化的类
      minPixelValue: 1,//小于或等于1px不转化
      mediaQuery: false,//允许在媒体查询中转换px
      exclude:[]//不包括的文件，这里要用正则表达式
    }
  }
}
