<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
        message: '哈哈哈'
      }
    },

    mounted() {
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        scrollY:true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      console.log(this.probeType,this.pullUpLoad)


      // 2.监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position)
        })
      }

      // 3.监听scroll滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          console.log(123)
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      scrollTo(x, y, time=300) {
        console.log('test2')
        this.scroll && this.scroll.scrollTo(x, y, time,undefined)
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    },
    updated () {
        //重新计算高度
        this.scroll.refresh();
        //当数据加载完毕以后通知better-scroll
        this.scroll.finishPullUp();
    }
  }
</script>

<style scoped>

</style>
