<template>
  <div>
    <nav-bar>
      <template #left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template #center>
        <div class="title">
          <div v-for="(item,index) in title"
          :key="index"
          class="item"
          :class="{active:index === currentIndex}"
          @click="titleClick(index)">
          {{item}}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    components:{
      NavBar
    },
    data(){
      return{
        title:['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },
    methods:{
      titleClick(index){
        this.currentIndex = index;
      },
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style lang='less' scoped>
  .title{
    display: flex;
    

    .item{
      flex: 1;
    }

    .active{
      color: @colorHighText;
    }
  }

  .back{
    
    img{
      vertical-align: middle;
    }
  }

  
</style>
