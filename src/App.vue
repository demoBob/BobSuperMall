<template>
  <div id="app">
    <router-view/>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'content/mainTabBar/MainTabBar'

export default {
  name: 'App',
  components:{
    MainTabBar
  }
}
</script>

<style lang="less">
 @import "@/assets/css/base.less";
#app {
    position: relative;
}

</style>
