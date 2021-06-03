
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { ElMessage } from 'element-plus'
import router from "@/router/index"
//创建axsio 赋给常量service
const service:AxiosInstance = axios.create({
  baseURL:'http://prlegw.test-newsports.com/',
  timeout:100000
});
// 添加请求拦截器
service.interceptors.request.use(async (config:AxiosRequestConfig):Promise<AxiosRequestConfig>=> {
  // 在发送请求之前做些什么
  // 设置请求头 携带token
  const token:string | null = localStorage.getItem('token')
  if(token){
    config.headers = config.headers || {}
    config.headers['token'] = token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
// 添加响应拦截器
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