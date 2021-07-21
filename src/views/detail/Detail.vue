<template>
  <div id="detail">
    <detail-nav-bar @itemClick="titleClick" class="detail-nav" ref="nav" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper ref="base" :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="param" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <detail-recommend-info ref="recommend" :recommend-list="recommendList"></detail-recommend-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailRecommendInfo from "./childComps/DetailRecommendInfo";

import Scroll from "components/common/scroll/Scroll";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "service/detailService";
import debounce from "utils/utils";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    Scroll
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      recommendList: [],
      themeTops: [],
      commentInfo:{},
      currentIndex:0
    };
  },
  created() {
    this._getRecommend();
    this._getDetailData();
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    const getOffsetTops = debounce(this._getOffsetTops, 50);
    this.$bus.$on("detailImageLoad", () => {
      refresh();
      getOffsetTops();
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    },
    titleClick(index) {
      console.log(this.themeTops[index]);
      this.$refs.scroll.scrollTo(0, -this.themeTops[index], 100);
    },
    _getOffsetTops() {
      this.themeTops = [];
      this.themeTops.push(this.$refs.base.$el.offsetTop);
      this.themeTops.push(this.$refs.param.$el.offsetTop);
      this.themeTops.push(this.$refs.comment.$el.offsetTop);
      this.themeTops.push(this.$refs.recommend.$el.offsetTop);
      this.themeTops.push(Number.MAX_VALUE);
      console.log(this.themeTops);
    },
    contentScroll(position){
      const positionY = -position.y;
      //console.log(positionY)
      
      let length = this.themeTops.length;
      for(let i = 0;i<length-1;i++){
        if(this.currentIndex !== i && (positionY >= this.themeTops[i] && positionY < this.themeTops[i+1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
            console.log('currentIndex',this.currentIndex)
        }
      }
    },
    _getRecommend() {
      getRecommend().then((res, error) => {
        if (error) return;
        this.recommendList = res.data.list;
      });
    },
    _getDetailData() {
      this.iid = this.$route.params.iid;

      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 1.获取顶部的图片轮播数据
        //console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages;

        // 2.获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        //console.log(this.goods);

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo);

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );

        // 6.保存评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
    overflow: hidden;
  }
}
</style>
