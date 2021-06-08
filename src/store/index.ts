import { createStore } from 'vuex'
import { findEnumList } from '@/api/commom'
export default createStore({
  state: {
    token:localStorage.getItem('token') || '',
    enumList:{},
    periodName:{
      '1':{
        '1001': 'Full Time',
        '1002': 'First Half',
        '1003': 'Second Half',
        '1004': 'ET First Half',
        '1005': 'ET Second Half',
        '1006': 'Penalty',
        '1007': '0-15Min',
        '1008': '15-30Min',
        '1009': '30-45Min',
        '1010': '45-60Min',
        '1011': '60-75Min',
        '1012': '75-90Min',
        '1013': 'ET Full Time'
      }
    }
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
