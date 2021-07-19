import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import less from 'less' 


Vue.prototype.$bus = new Vue(); //事件总线(传递事件方法，实现跨多个组件之间的通信)
Vue.config.productionTip = false
Vue.use(less)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
