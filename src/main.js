import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";


Vue.config.productionTip = false

// 在Vue实例中加入事件总线
Vue.prototype.$bus=new Vue()

// 安装一个自己创建的插件
Vue.use(toast)

// 解决移动端300ms的延迟
FastClick.attach(document.body)

// 使用图片懒加载:在需要懒加载的img里把:src改为v-lazy
Vue.use(VueLazyload,{
  loading:require('./assets/img/common/lazyload.gif')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
