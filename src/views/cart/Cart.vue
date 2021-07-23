<template>
  <div id="cart">
    <nav-bar class="nav-bar"><div slot="center">购物车({{cartCount}})</div></nav-bar>
    <cart-list class="cart-list" :cart-list="cartList"></cart-list>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import NavBar from 'common/navbar/NavBar'
import BottomBar from './childComps/BottomBar'
import CartList from './childComps/CartList'
import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      BottomBar
    },
    computed:{
       // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters([
        'cartCount',
        'cartList',
        // ...
      ])
    }
  }
</script>

<style lang='less' scoped>
  #cart {
    /*position: relative;*/
    height: 100vh;

    .nav-bar {
      background-color: @colorTint;
      font-weight: 700;
      color: #fff;
    }

    .cart-list {
      position: absolute;
      top: 44px;
      bottom: 49px;
      width: 100%;
      height: calc(100% - 137px);
    }
  }
</style>
