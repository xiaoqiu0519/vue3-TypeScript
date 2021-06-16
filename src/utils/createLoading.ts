import { createApp } from 'vue';
import Loading from '@/components/loading/loading.vue'

export const createLoading = (flag:boolean):void=>{
  const createLoadingApp = createApp(Loading,{flag})
  if(flag){
    const loadingNode = document.createElement('div')
    loadingNode.className='loadingNode'
    document.body.appendChild(loadingNode)
    createLoadingApp.mount(loadingNode)
  }else{
    const loadingNode = document.getElementsByClassName('loadingNode')?.[0]
    // createLoadingApp.unmount()
    loadingNode && document.body.removeChild(loadingNode)
  }
} 
