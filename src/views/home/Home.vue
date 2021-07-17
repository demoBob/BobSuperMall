<template>
  <div id="home">
    <nav-bar class="nav-bar" #center>购物街</nav-bar>
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      @pullingUp="loadMore"
      :data="showGoodsList"
      :pull-up-load="true"
      :probe-type="3"
    >
      <home-swiper :banners="banners" ref="hSwiper"></home-swiper>
      <feature-view :features="recommends"></feature-view>
      <recommend-view></recommend-view>
      <tab-control class="tab-controls" @itemClick="tabClick" :titles="['流行', '新款', '精选']"></tab-control>
      <goods-list :goods-list="showGoodsList"></goods-list>
    </scroll>
  </div>
</template>

<script>
import NavBar from "common/navbar/NavBar";
import tabControl from "content/tabControl/TabControl";
import Scroll from "common/scroll/Scroll";

import FeatureView from "./childComps/FeatureView";
import RecommendView from "./childComps/RecommendView";
import HomeSwiper from "./childComps/HomeSwiper";
import GoodsList from "./childComps/GoodsList";

import home from "service/homeService";
export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    HomeSwiper,
    RecommendView,
    FeatureView,
    tabControl,
    GoodsList
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goodsList: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] }
      },
      currentType: "pop",
      isTabFixed: false,
      tabOffsetTop: 0,
      showBackTop: false
    };
  },
  computed: {
    showGoodsList() {
      return this.goodsList[this.currentType].list;
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    contentScroll(position) {
      // 1.决定tabFixed是否显示
      this.isTabFixed = position.y < -this.tabOffsetTop;

      // 2.决定backTop是否显示
      this.showBackTop = position.y < -1000;
    },
    loadMore() {
      this.getHomeProducts(this.currentType);
    },
    /**
     * 网络请求相关方法
     */
    getMultiData() {
      home.getHomeMultidata().then(res => {
        this.banners = res.data[home.BANNER].list;
        this.recommends = res.data[home.RECOMMEND].list;
        // 下次更新DOM时,获取新的tabOffsetTop值(不保险,可以在updated钩子中获取)
        // this.$nextTick(() => {
        //   this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
        // })
      });
    },
    getHomeProducts(type) {
      home.getHomeData(type, this.goodsList[type].page).then(res => {
        const goodsList = res.data.list;
        this.goodsList[type].list.push(...goodsList);
        this.goodsList[type].page += 1;
        // this.$refs.scroll.finishPullUp()
      });
    }
  },
  created() {
    console.log("创建Home");
    // 1.请求多个数据
    this.getMultiData();

    // 2.请求商品数据

    this.getHomeProducts("pop");
    this.getHomeProducts("pop");
    this.getHomeProducts("new");
    this.getHomeProducts("sell");
  }
};
</script>

<style lang='less' scoped>
#home {
  position: relative;
  height: 100vh;
  padding-top: 44px;

  // .tab-controls {
  //   position: sticky;
  //   top: 44px;
  // }

  .nav-bar {
    background-color: @colorTint;
    font-weight: 700;
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    
  }
}
</style>
