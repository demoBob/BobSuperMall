import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import less from 'less'

import FastClick from 'fastclick'
//解决移动端300ms延迟
FastClick.attach(document.body)

import VueLazyLoad from 'vue-lazyload'
//图片懒加载
Vue.use(VueLazyLoad)

import toast from 'common/toast'
//安装toast插件
Vue.use(toast)


Vue.prototype.$bus = new Vue(); //事件总线(传递事件方法，实现跨多个组件之间的通信)
Vue.config.productionTip = false
Vue.use(less)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
