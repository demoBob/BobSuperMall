import axios from 'axios'


const service = axios.create({
  baseURL:"http://152.136.185.210:7878/api/hy66",
  timeout: 15000
})

//请求拦截器(如果要在接口请求时引入加载动画就是在这里加)
service.interceptors.request.use(config => {
  // 从localStorage中获取token
  //let access_token = localStorage.getItem('access_token');
  // 如果有token, 就把token设置到请求头中Authorization字段中
  //access_token && (config.headers.TOKEN = access_token);
  return config;
}, error => {
  console.log(error)
  return Promise.reject(error);
})

//响应拦截器
service.interceptors.response.use(response => {
  const res = response.data;
  return res;
  // if(res.code !== "E_0000_0000"){
  //   Message({
  //     message: res.msg,
  //     type: 'error',
  //     duration: 3 * 1000
  //   })

  //   if(res.code === "E_0000_0402"){
  //     Message({
  //       message: "登录过期，请重新登录！",
  //       type: 'error',
  //       duration: 3 * 1000
  //     })
  //     localStorage.removeItem('access_token')
  //     localStorage.removeItem('userId')
  //     router.push("/login")
  //   }
  //   return Promise.reject('erro')
  // }else{
  //   return res;
  // }
},
error => {
  console.log('err' + error)// for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 3 * 1000
    // })
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权的访问'
          break
      }
    }
    return Promise.reject(error)
})

export default service
