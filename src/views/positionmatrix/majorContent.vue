<template>
  <div class="majorContent">
    <majorCard v-for="(item,index) in majorList" :majorCard='item' :key="index" @updateMatch="init(2, $event)"/>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'
import majorCard from './majorCard.vue'
import { findMatchRiskMatrixInfoList } from '@/api/commom'
import { createLoading } from '@/utils/createLoading'
import store from '@/store/index'
interface ImajorPeriod {
  period:number,
  value:string
}
interface ImajorItem{
  majorPeriod:any,
  majorScore:any[]
}
interface ImajorScore{
  title:string,
  Periodlist:any[]
}
interface IPeriodlist{
  period: string,
  preScore: string,
  score:any[]
}
export default defineComponent({
  name: "",
  components:{
    majorCard
  },
  setup(){ 
    let majorList = ref<any>([])
    const marketTypeName = {
      '1':{
        '1000': 'scoreinvestasian',
        '1007': 'scoreinvestover',
        '1005': 'scoreinvest1x2'
      },
      '3':{

      }
    }
    const formatData = (matchRiskMatrixList:any,matchParamList:any)=>{
      majorList.value = []
      matchParamList.map((item:any) => {
        const obj = {
          majorInfo: {
            sportId: '',
            home: '',
            away: '',
            sportName: '',
            runningTime: '',
            matchId: '',
            lastCalculateTime: '',
            marketType: ''
          },
          majorItem: [] as ImajorItem[]
        }
        const matchRiskMatrix = matchRiskMatrixList.filter((list:any) => list.matchId === item.matchId)[0]
        obj.majorInfo.sportId = item.sportId
        obj.majorInfo.home = item.home
        obj.majorInfo.away = item.away
        obj.majorInfo.sportName = item.sportName
        obj.majorInfo.runningTime = item.runningTime
        obj.majorInfo.matchId = item.matchId
        obj.majorInfo.lastCalculateTime = matchRiskMatrix.lastCalculateTime
        obj.majorInfo.marketType = matchRiskMatrix.marketRiskVectors && matchRiskMatrix.marketRiskVectors[0].marketType
        let majorPeriod: ImajorPeriod[] = []
        let majorScore:any = []
        let Periodlist:IPeriodlist = {
          period: '1001',
          preScore: '123',
          score: [
            {
              key: 10,
              value: '12323'
            },
            {
              key: 10,
              value: '123'
            },
            {
              key: 10,
              value: '12323'
            }
          ]
        }
        if(+item.sportId === 1){
          majorScore = [
            [
              {title:'scoreinvestasian',Periodlist:[Periodlist]},
              {title:'scoreinvestover',Periodlist:[Periodlist]},
              {title:'scoreinvest1x2',Periodlist:[Periodlist]}
            ]
          ]
        }else if(+item.sportId === 3){
          majorScore = [
            [
              {title:'Handicap',Periodlist:[]},
              {title:'Over/Under',Periodlist:[]},
            ],
            [
              {title:'Over/Under Home',Periodlist:[]},
              {title:'Over/Under Away',Periodlist:[]},
            ],
          ]
        }
        item.periodList.map((list:number)=>{
          majorPeriod.push( {
            period:list,
            value:(store.state.periodName as any)[item.sportId.toString()][list.toString()]
          })
        })
        obj.majorItem.push({
          majorPeriod:majorPeriod,
          majorScore:majorScore
        })
        majorList.value.push(obj)
        //监听全局websokcet消息推送
      })
    }
    
    const init = ()=>{
      const params = {
        sportId:1
      }
      createLoading(true)
      findMatchRiskMatrixInfoList(params).then(res=>{
        createLoading(false)
        if (res.code === 0) {
          const data = res.data.records[0]
          if (data && data.matchRiskMatrixList) {
            formatData(data.matchRiskMatrixList, data.matchParamList)
          }
        }
      })
    }
    init()
    return {
      majorList,
      init
    }
  }
})
</script>

<style lang='less' scoped>
.majorContent{
  width: 98%;
  margin: 0 auto;
}
</style>
