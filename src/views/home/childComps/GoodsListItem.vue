<template>
  <div class="goods" @click="goToDetail">
    <!-- <img v-lazy="getImg" :key="getImg" alt /> -->
    <img  :src="goods.show.img" alt @load="itemImgLoad" />
    <div class="goods-info">
      <p>{{goods.title}}</p>
      <span class="price">¥{{goods.price}}</span>
      <span class="collect">{{goods.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goods: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  mounted: function() {
    // console.log(this.goods);
  },
  methods: {
    goToDetail: function() {
      // 1.获取iid
      let iid = this.goods.iid;

      // 2.跳转到详情页面
      this.$router.push({ path: "/detail", query: { iid } });
    },
    itemImgLoad(){ //图片加载完成
      this.$bus.$emit('imageLoad')
    }
  },
  computed: {
    getImg() {
      return this.goods.img || this.goods.image || this.goods.show.img;
    }
  }
};
</script>

<style lang='less' scoped>
.goods {
  padding-bottom: 40px;
  position: relative;

  img {
    width: 100%;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 3px;
    }

    .price {
      color: @colorHighText;
      margin-right: 20px;
    }

    .collect {
      position: relative;
    }

    .collect::before {
      content: "";
      position: absolute;
      left: -15px;
      top: 0;
      width: 14px;
      height: 14px;
      background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
    }
  }
}
</style>
