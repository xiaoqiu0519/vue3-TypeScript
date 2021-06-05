
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { ElMessage } from 'element-plus'
import router from "@/router/index"
const setDefaultBaseURL = ():string=>{
  const NODE_ENV = process.env.NODE_ENV
  let baseURL = ''
  switch(NODE_ENV){
    case 'development':
      baseURL = 'http://prlegw.test-newsports.com/'
      break;
    case 'production':
      baseURL = 'http://prlegw.test-newsports.com/'
      break;
    default:
      baseURL = 'http://prlegw.test-newsports.com/'
      break;
  }
  return baseURL
}
const service:AxiosInstance = axios.create({
  baseURL:setDefaultBaseURL(),
  timeout:100000
});
service.interceptors.request.use(async (config:AxiosRequestConfig):Promise<AxiosRequestConfig>=> {
  const token:string | null = localStorage.getItem('token')
  if(token){
    config.headers = config.headers || {}
    config.headers['token'] = token
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});
service.interceptors.response.use( (response:AxiosResponse):AxiosResponse =>{
  if(response.data.code === 8888){
    ElMessage.error(response.data.message);
    setTimeout(()=>{
      router.push('/login')
    },1500) 
  }else if(response.status !== 200 || response.data.code !== 0){
    ElMessage.error(response.data.message);
  }
  return response.data;
}, function (error) {
  ElMessage.error('服务器繁忙，请稍后再试');
  return Promise.reject(error);
});
export default service