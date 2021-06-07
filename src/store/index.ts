import { createStore } from 'vuex'
import { findEnumList } from '@/api/commom'
export default createStore({
  state: {
    token:localStorage.getItem('token') || '',
    enumList:{}
  },
  mutations: {
    // 一般是同步操作
    findEnumList(state,rawData){
      state.enumList = rawData
    }
  },
  getters:{
    
  },
  actions: {
    // 一般是异步操作
    FINDENUMLIST(context){
      const params = {
        rcEnum:["sportType", "region", "matchStatus"]
      }
      findEnumList(params).then(res=>{
        if(res.code === 0){
          context.commit('findEnumList',res.data)
        }
      })
    }
  },
  modules: {
    
  }
})
