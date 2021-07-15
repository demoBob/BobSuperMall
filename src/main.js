import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import less from 'less' 


Vue.config.productionTip = false
Vue.use(less)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
