export const backTopMixin = {
  data(){
    return{
      showBackTop:false
    }
  },
  methods: {
    backTop(){
      //console.log('scroll')
      this.$refs.scroll.scrollTo(0,0,300);
    }
  }
}