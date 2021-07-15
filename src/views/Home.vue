<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    -------------Home页面------------
    <h1>{{$store.state.count}}</h1>
    <h1>{{$store.getters.getcountdouble}}</h1>
    <h1>{{$store.getters.getcountdoubleadd}}</h1>
    <h1>{{$store.getters.getcountadd(3)}}</h1>
    <button @click="addCount">加一</button>
    -------------helloWord页面-----------
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods:{
    addCount(){
      this.$store.commit('intcrement')
    }
  }
}
</script>
