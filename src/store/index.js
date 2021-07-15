import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count:1000
  },
  mutations: {
    intcrement(state){
      state.count ++
    }
  },
  actions: {
  },
  getters: {
    getcountdouble(state){
      return state.count*2
    },
    getcountdoubleadd(state,getters){
      return getters.getcountdouble +1
    },
    //如果需要外部传递参数去改变getters里面的值就得在里面定义一个函数去接受这个参数
    getcountadd(state){
      return num => {
        return state.count + num
      }
    }
  },
  modules: {
  }
})
