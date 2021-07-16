import request from '@/utils/request'

export default {
  BANNER : 'banner',
  RECOMMEND : 'recommend',
  getHomeMultidata(){
    return request({
      url: '/home/multidata',
    })
  },
  getHomeData(type, page){
    return request({
      url: '/home/data',
      params: {
        type,
        page
      }
    })
  }
}